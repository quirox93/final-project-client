export const filterItems = (items, query) => {
  if (query.sort) sort(items, query.sort);
  if (query.name) items = filterByName(items, query.name);
  if (query.stock) items = getAvailabeStock(items, query.stock);
  if (query.min) items = getMinPrice(items, query.min);
  if (query.max) items = getMaxPrice(items, query.max);
  if (query.enabled) items = getEnabled(items, query.enabled);
  const total = items.length;
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
const getEnabled = (items, value) => {
  return items.filter((producto) => producto.enabled.toString() == value);
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

const filterByName = (items, value) => {
  const searchTerm = value.toLowerCase();
  return items.filter((producto) => producto.name.toLowerCase().includes(searchTerm));
};

const SortFunc = {
  dateAsc: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  dateDesc: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  nameAsc: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  nameDesc: (a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
};

const sort = (items, order = "dateDesc") => items.sort(SortFunc[order]);
