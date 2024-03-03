import React, { createContext, useContext, useState } from 'react';
import { createBillTicket } from '../API';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [ cartItems, setCartItems ] = useState([]);
    const [ tableNumber, setTableNumber ] = useState('');

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

        const order = {
            table: tableNumber,
            date: new Date().toISOString(),
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
