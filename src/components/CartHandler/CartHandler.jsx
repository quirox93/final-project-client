"use client"
import { useState } from "react";
import CartTable from "@/components/CartTable/CartTable";
import {
    removeFromCart,
    updateQuantity,
    calculateSubtotal,
    calculateTotal
} from "@/components/CartHandler/utils";

const CartHandler = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Item 1', price: 10, quantity: 1 },
        { id: 2, name: 'Item 2', price: 20, quantity: 1 },
        { id: 3, name: 'Item 3', price: 30, quantity: 1 },
        { id: 4, name: 'Item 4', price: 40, quantity: 1 },
        { id: 5, name: 'Item 5', price: 50, quantity: 1 },
        { id: 6, name: 'Item 6', price: 60, quantity: 1 },
    ]);

    const handleRemoveFromCart = (id) => {
        const updatedCart = removeFromCart(cartItems, id);
        setCartItems(updatedCart);
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (isNaN(quantity) || quantity < 1) {
            return; 
        }
        const updatedCart = updateQuantity(cartItems, id, quantity);
        setCartItems(updatedCart);
    };

    const handleCheckout = () => {
        const checkoutData = {
            purchasedItems: cartItems.map(item => (
                { 
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                subtotal: calculateSubtotal(item.price, item.quantity)
            })),
            total: calculateTotal(cartItems)
        };
        console.log(checkoutData);
    };

    return (
        <CartTable
            cartItems={cartItems}
            removeFromCartFn={handleRemoveFromCart}
            updateQuantityFn={handleUpdateQuantity}
            handleCheckoutFn={handleCheckout}
        />
    );
};

export default CartHandler;
