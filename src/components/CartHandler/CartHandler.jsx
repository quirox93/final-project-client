"use client";
import CartTable from "@/components/CartTable/CartTable";
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";
import { payment } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CartHandler = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const selectedProduct = useSelector((state) => state.shopCart.selectionProducts);
  useEffect(() => {
    const status = searchParams.get("status");
    if (!status) return;
    if (status === "approved") {
      dispatch(selectedProducts([]));
      alert("Payment approved.");
    } else alert("Payment error.");
  }, []);

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

      const { paymentURL } = await payment(items, userId);

      router.push(paymentURL);
    } catch (error) {
      console.log(error);
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
