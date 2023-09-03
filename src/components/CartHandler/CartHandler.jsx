"use client"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";
import { useRouter, useSearchParams } from "next/navigation";
import CartTable from "@/components/CartTable/CartTable";

const CartHandler = ({ userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProduct = useSelector((state) => state.shopCart.selectionProducts);
  

  useEffect(() => {
    const status = searchParams.get("status");
    
    if (!status) return;
    if (status === "approved") {
      dispatch(selectedProducts([]));
      alert("Payment Successful");
      router.push("/")
    } else {
      alert("Payment error.");
    }
  }, []);

  function handleRemoveFromCart(id) {
    dispatch(deletedProducts(id));
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (isNaN(quantity) || quantity < 0) {
      return;
    }
    dispatch(
      selectedProducts(
        selectedProduct.map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) } : item
        )
      )
    );
  };
  return (
    <CartTable
      userId={userId}
      cartItems={selectedProduct}
      removeFromCartFn={handleRemoveFromCart}
      updateQuantityFn={handleUpdateQuantity}
    />
  );
};

export default CartHandler;
