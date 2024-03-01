import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        if(cartItems.find((cartItem) => cartItem.name === item.name)) {
            setCartItems(cartItems.map((cartItem) => {
                if(cartItem.name === item.name) {
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
        if(cartItems.find((cartItem) => cartItem.name === item.name)) {
            setCartItems(cartItems.map((cartItem) => {
                if(cartItem.name === item.name) {
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

    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue = {  cartItems, addToCart, clearCart, removeFromCart};

    return (
        <CartContext.Provider value={{...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};
