"use client";

import CartTable from "@/components/CartTable/CartTable";
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const CartHandler = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.shopCart.selectionProducts);

  const handleRemoveFromCart = (id) => {
    dispatch(deletedProducts(id));
  };

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

      const { paymentURL } = await api.payment.checkout(items, userId);

      router.push(paymentURL);
    } catch (error) {
      console.log(error.message);
      alert("error in processing payment.");
    }
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
