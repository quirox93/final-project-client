export const filterItems = (items, query) => {
  const total = items.length;
  if (query.stock) items = getAvailabeStock(items, query.stock);
  if (query.min) items = getMinPrice(items, query.min);
  if (query.max) items = getMaxPrice(items, query.max);
  if (query.page && query.limit) items = getPage(items, query.page, query.limit);
  if (query.sort) {
    if (query.sort === 'nameAsc' || query.sort === 'nameDesc') {
      items = sortByName(items, query.sort);
    } else if (query.sort === 'priceAsc' || query.sort === 'priceDesc') {
      items = sortByPrice(items, query.sort);
    }
  };
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

const sortByName = (items, order = 'nameAsc') => {
  const sortedItems = [...items]; // Crear una copia del arreglo para no modificar el original

  sortedItems.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (order === 'nameAsc') {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
    } else if (order === 'nameDesc') {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    }

    return 0;
  });

  return sortedItems;
};

const sortByPrice = (items, order = 'priceAsc') => {
  const sortedItems = [...items]; // Crear una copia del arreglo para no modificar el original

  sortedItems.sort((a, b) => {
    if (order === 'priceAsc') {
      return a.price - b.price;
    } else if (order === 'priceDesc') {
      return b.price - a.price;
    }

    return 0;
  });

  return sortedItems;
};
