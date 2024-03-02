import React, { createContext, useState } from 'react';
import { auth } from '../config/firebase';
import { createBillTicket } from '../API';

export const CartContext = createContext();

const user = auth.currentUser;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

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
            cart,
            date: new Date().toISOString(),
            price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) + "€",
            name: user.displayName,
        };
        createBillTicket(order);
        clearCart();
    }

    const contextValue = { cartItems, addToCart, clearCart, removeFromCart, addFromCart, confirmOrder };

    return (
        <CartContext.Provider value={{ ...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};
