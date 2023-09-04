export const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

 export const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.unit_price * item.quantity, 0);
  };