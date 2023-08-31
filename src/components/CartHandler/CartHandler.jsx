"use client"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";
import { payment } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
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

  const handleCheckout = async () => {
    try {
      const items = selectedProduct.map((item) => ({
        id: item.id,
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "ARS",
      }));

      const response = await payment(items, userId);

   const orderData = [
        {
          clerkId: userId,
          payer: {
            name: shippingData.firstName + " " + shippingData.lastName,
            phone: shippingData.phoneNumber,
            city: shippingData.city,
            street: shippingData.street,
            postalCode: shippingData.postalCode,
          },
          items: selectedProduct.map((item) => ({
            quantity: item.quantity,
            unit_price: item.price,
            _id: item.id,
          })),
        },
      ];

     /*  axios
        .post("http://localhost:3000/api/order", orderData)
        .then((response) => {
          const order = response.data;
          console.log("Order created:", order);
        })
        .catch((error) => {
          console.error("Error creating order:", error);
        });
  */
      return response.paymentURL;
    } catch (error) {
      console.log(error);
      alert("Error processing payment.");
    }
  };

  return (
    <CartTable
      userId={userId}
      cartItems={selectedProduct}
      removeFromCartFn={handleRemoveFromCart}
      updateQuantityFn={handleUpdateQuantity}
      handleCheckoutFn={handleCheckout}
     
    />
  );
};

export default CartHandler;
