import React, { createContext, useContext, useState } from 'react';
import { createBillTicket } from '../API';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [tableNumber, setTableNumber] = useState('');

    const { currentUser } = useContext(AuthContext);

    const addToCart = (item) => {
        if (cartItems.find((cartItem) => cartItem.name === item.name)) {
            setCartItems(cartItems.map((cartItem) => {
                if (cartItem.name === item.name) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    };
                }
                return cartItem;
            }));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        console.log(cartItems);
    };

    const removeFromCart = (item) => {
        if (cartItems.find((cartItem) => cartItem.name === item.name)) {
            setCartItems(cartItems.filter((cartItem) => {
                if (cartItem.name === item.name) {
                    cartItem.quantity -= 1;
                    return cartItem.quantity > 0; // Only return items with quantity > 0
                }
                return true; // Return all other items
            }));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const addFromCart = (item) => {
        if (cartItems.find((cartItem) => cartItem.name === item.name)) {
            setCartItems(cartItems.map((cartItem) => {
                if (cartItem.name === item.name) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    };
                }
                return cartItem;
            }));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        console.log(cartItems);
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const confirmOrder = (cart) => {

        function getFormattedDate() {
            const date = new Date();
            const year = date.getFullYear().toString().padStart(4, '0'); // Add leading zeros
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
        }

        const order = {
            table: tableNumber,
            date: getFormattedDate(),
            name: currentUser.displayName,
            email: currentUser.email,
            cart,
            totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) + "€",
        };
        if (tableNumber !== '') {
            createBillTicket(order);
            clearCart();
        } else {
            alert("Please, scan the QR code to get your table number");
        }
    }

    const contextValue = {
        cartItems, addToCart, clearCart, removeFromCart, addFromCart, confirmOrder,
        tableNumber, setTableNumber
    };

    return (
        <CartContext.Provider value={{ ...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};
