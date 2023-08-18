"use client"

import CartTable from "@/components/CartTable/CartTable";
import {
    removeFromCart,
    updateQuantity,
    calculateSubtotal,
    calculateTotal
} from "@/components/CartHandler/utils";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deletedProducts } from "@/store/slice";

const CartHandler = () => {
    const dispatch = useDispatch();
    const selectedProducts = useSelector((state) => state.shopCart.selectionProducts);
   
    const [cartItems, setCartItems] = useState([]);
    console.log(cartItems)
    useEffect(() => {
        const productCountMap = selectedProducts.reduce((acc, product) => {
            acc[product.id] = (acc[product.id] || 0) + 1;
            return acc;
        }, {});

        const uniqueProducts = Object.keys(productCountMap).map((productId) => {
            const product = selectedProducts.find((p) => p.id === productId);
            return { ...product, quantity: productCountMap[productId] };
        });

        setCartItems(uniqueProducts);
    }, [selectedProducts]);

    const handleRemoveFromCart = (id) => {
        const updatedCart = removeFromCart(cartItems, id);
        setCartItems(updatedCart);
        dispatch(deletedProducts(id));
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
