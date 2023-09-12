export const handleAddToCart = (
  productData,
  cartItems,
  dispatch,
  setShowModal,
  setPopoverOpen,
  updateCart,
  setQuantity
) => {
  const { id, name, stock, price, quantity, image, description, userId } =
    productData;
  if (quantity > stock) {
    setShowModal(true);
    return;
  }

  const existingProduct = cartItems.find((product) => product.id === id);

  if (existingProduct) {
    // Checkear si la cantidad total excede el stock disponible
    if (existingProduct.quantity + quantity > stock) {
      setShowModal(true);
      return;
    }

    const items = cartItems.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + quantity }
        : product
    );
    if (userId) dispatch(updateCart({ userId, items }));
    else dispatch(updateCart(items));
  } else {
    const newProduct = {
      id,
      name,
      price,
      stock,
      image,
      description,
      quantity,
    };
    const items = [...cartItems, newProduct];
    if (userId) dispatch(updateCart({ userId, items }));
    else dispatch(updateCart(items));
  }

  setQuantity(quantity);
  setPopoverOpen(true);
};
