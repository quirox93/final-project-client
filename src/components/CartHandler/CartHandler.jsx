"use client"
import { useSelector, useDispatch } from "react-redux";
import { selectedProducts, deletedProducts } from "@/store/slice";
import CartTable from "@/components/CartTable/CartTable";

const CartHandler = ({ userId }) => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.shopCart.selectionProducts);
  
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
