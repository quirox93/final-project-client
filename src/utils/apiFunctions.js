export const filterItems = (items, query) => {
  const total = items.length;
  if (query.stock) items = getAvailabeStock(items, query.stock);
  if (query.min) items = getMinPrice(items, query.min);
  if (query.max) items = getMaxPrice(items, query.max);
  if (query.page && query.limit) items = getPage(items, query.page, query.limit);
  const results = { total, results: items };
  return results;
};

const getMinPrice = (items, value) => {
  return items.filter((producto) => producto.price >= value);
};

const getMaxPrice = (items, value) => {
  return items.filter((producto) => producto.price <= value);
};

const getAvailabeStock = (items, value) => {
  //value inputs posibles: ["0", "1"]
  const onlyAvailabe = Boolean(Number(value));
  return items.filter((producto) => Boolean(producto.stock) === onlyAvailabe);
};

const getPage = (items, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return items.slice(startIndex, endIndex);
};
