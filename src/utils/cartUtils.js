export const handleAddToCart = (
  productData,
  selectionProducts,
  dispatch,
  setShowModal,
  setPopoverOpen,
  selectedProducts,
  setQuantity
) => {
  const { id, name, stock, price, quantity, image, description, userId } = productData;
  if (quantity > stock) {
    setShowModal(true);
    return;
  }

  const existingProduct = selectionProducts.find((product) => product.id === id);

  if (existingProduct) {
    // Checkear si la cantidad total excede el stock disponible
    if (existingProduct.quantity + quantity > stock) {
      setShowModal(true);
      return;
    }

    const updatedSelectionProducts = selectionProducts.map((product) =>
      product.id === id ? { ...product, quantity: product.quantity + quantity } : product
    );
    if (userId) dispatch(selectedProducts({ userId, items: updatedSelectionProducts }));
    else dispatch(selectedProducts(updatedSelectionProducts));
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
    const updatedSelectionProducts = [...selectionProducts, newProduct];
    if (userId) dispatch(selectedProducts({ userId, items: updatedSelectionProducts }));
    else dispatch(selectedProducts(updatedSelectionProducts));
  }

  setQuantity(quantity);
  setPopoverOpen(true);
};
