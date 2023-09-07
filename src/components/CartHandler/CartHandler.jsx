"use client";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "@/store/slice";
import CartTable from "@/components/CartTable/CartTable";

const CartHandler = ({ userId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shopCart.cartItems);

  function handleRemoveFromCart(id) {
    const items = cartItems.filter((item) => item.id !== id);
    dispatch(updateCart(userId ? { userId, items } : items));
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (isNaN(quantity) || quantity < 0) {
      return;
    }
    const items = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    dispatch(updateCart(userId ? { userId, items } : items));
  };
  return (
    <CartTable
      userId={userId}
      cartItems={cartItems}
      removeFromCartFn={handleRemoveFromCart}
      updateQuantityFn={handleUpdateQuantity}
    />
  );
};

export default CartHandler;
