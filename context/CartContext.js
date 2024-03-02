import React, { createContext, useContext, useState } from 'react';
import { createBillTicket } from '../API';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [ cartItems, setCartItems ] = useState([]);
    const [ tableNumber, setTableNumber ] = useState([]);

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
            setCartItems(cartItems.map((cartItem) => {
                if (cartItem.name === item.name) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    };
                }
                return cartItem;
            }));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        console.log(cartItems);
    }

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
            cart,
            date: new Date().toISOString(),
            price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) + "€",
            name: currentUser.displayName,
            email: currentUser.email,
        };
        createBillTicket(order);
        clearCart();
    }

    const contextValue = {  cartItems, addToCart, clearCart, removeFromCart, addFromCart, confirmOrder, 
                            tableNumber, setTableNumber};

    return (
        <CartContext.Provider value={{ ...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};
