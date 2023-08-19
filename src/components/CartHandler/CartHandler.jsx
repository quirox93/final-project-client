"use client"

import CartTable from "@/components/CartTable/CartTable";
import {
    calculateSubtotal,
    calculateTotal
} from "@/components/CartHandler/utils";
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";

const CartHandler = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state) => state.shopCart.selectionProducts);
  
    const handleRemoveFromCart = (id) => {
      dispatch(deletedProducts(id));
    };
  
    const handleUpdateQuantity = (id, quantity) => {
      if (isNaN(quantity) || quantity < 0) {
        return;
      }
      dispatch(selectedProducts(
        selectedProduct.map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) } : item
        )
      ));
    };
  
    const handleCheckout = () => {
      const checkoutData = {
        purchasedItems: selectedProduct.map((item) => ({
          id: item.id,
          description: item.description,
          image: item.image,
          name: item.name,
          quantity: item.quantity,
          subtotal: calculateSubtotal(item.price, item.quantity),
        })),
        total: calculateTotal(selectedProduct),
      };
      console.log(checkoutData);
    };
  
    return (
      <CartTable
        cartItems={selectedProduct}
        removeFromCartFn={handleRemoveFromCart}
        updateQuantityFn={handleUpdateQuantity}
        handleCheckoutFn={handleCheckout}
      />
    );
  };
  
  export default CartHandler;