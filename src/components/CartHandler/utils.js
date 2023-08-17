export const removeFromCart = (cartItems, id) => {
    return cartItems.filter(item => item.id !== id);
};

export const updateQuantity = (cartItems, id, quantity) => {

    return cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
        );
};

export const calculateSubtotal = (price, quantity) => {
    return price * quantity;
};

export const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);
};
