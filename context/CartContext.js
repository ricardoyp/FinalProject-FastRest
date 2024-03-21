import { createContext, useContext, useEffect, useState } from 'react';
import { createBillTicket, usePromotion } from '../API';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    const [cartItems, setCartItems] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [promotionCart, setPromotion] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [numberOfItems, setNumberOfItems] = useState(0);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (promotionCart) { // Si hay una promoción
            if(promotionCart.type === 'classic') {
                setTotalPrice(parseFloat((cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)- promotionCart.amount).toFixed(2)));
            } else if (promotionCart.type === 'percentage'){
                setTotalPrice(parseFloat((cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) - (+cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * promotionCart.amount / 100)).toFixed(2)));
            }
        } else { // If there is no promotion
            setTotalPrice(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
        }
        // Check if the cart has the minimum amount required for the promotion
        if (promotionCart && (cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)) < promotionCart.minCart) {
            setPromotion('');
            alert('You need to have a minimum of € in your cart to use this promotion');
        }
        console.log("TotalPRICE", totalPrice);
        console.log("PROMOTION", promotionCart);
        console.log("CART", cartItems);
    }
        , [cartItems, promotionCart]);

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
        setNumberOfItems(numberOfItems + 1);
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
        setNumberOfItems(numberOfItems - 1);

    };

    const clearCart = () => {
        setCartItems([]);
        setNumberOfItems(0);
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
            totalPrice: totalPrice,
            promotion: promotionCart ? promotionCart : '',
            uid: currentUser.uid
        };

        if (tableNumber !== '') {
            createBillTicket(order);
            {promotionCart && usePromotion(currentUser.uid, promotionCart.code)};
            setPromotion('');
            setTotalPrice(0);
            clearCart();
        } else {
            alert("Please, scan the QR code to get your table number");
        }
    }

    const contextValue = {
        cartItems, totalPrice, addToCart, clearCart, removeFromCart, confirmOrder,
        tableNumber, setTableNumber,
        promotionCart, setPromotion,
        numberOfItems
    };

    return (
        <CartContext.Provider value={{ ...contextValue }}>
            {children}
        </CartContext.Provider>
    );
};
