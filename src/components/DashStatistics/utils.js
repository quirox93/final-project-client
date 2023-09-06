export const formatOrders = (items) => {
  const format = items.map((order) => {
    return {
      id: order._id,
      name: name(order.payer.name),
      email: order.payer.email,
      products: order.items,
      createdAt: order.createdAt,
      total: totalOrder(order.items),
      statusMp: order.mpStatus,
    };
  });

  return format;
};
const totalOrder = (items) => {
  return items.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
};
const name = (nombre) => {
  return nombre ? nombre.split(" ")[0] || "" : "";
};
// this function gives me the total number of orders in that period
const totalItems = (items) =>
  items.reduce((total, orden) => total + orden.total, 0);

export const salesOrders = (orders, day, month, year) => {
  // this function filters the orders of the day
  const ordersDay = (previous) => {
    const ordersFilterDay = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (previous === "previous") {
        const diaAnterior = new Date();
        if (day === 1) {
          const mesAnterior = new Date(year, month - 1, 0).toDateString();
          return (
            orderDate.toDateString() === mesAnterior &&
            orderDate.getFullYear() === year
          );
        } else {
          diaAnterior.setDate(diaAnterior.getDate() - 1);
        }
        return (
          orderDate.toDateString() === diaAnterior.toDateString() &&
          orderDate.getMonth() + 1 === month &&
          orderDate.getFullYear() === year
        );
      }
      return (
        orderDate.getDate() === day &&
        orderDate.getMonth() + 1 === month &&
        orderDate.getFullYear() === year
      );
    });

    return totalItems(ordersFilterDay);
  };
  // this function filters the orders of the month
  const ordersMonth = (previous) => {
    const ordersFilterMonth = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (previous === "previous") {
        const mesAnterior = new Date(year, month - 1, 0).toDateString();
        return (
          orderDate.toDateString() === mesAnterior &&
          orderDate.getFullYear() === year
        );
      }
      return (
        orderDate.getMonth() + 1 === month && orderDate.getFullYear() === year
      );
    });

    return totalItems(ordersFilterMonth);
  };
  // this function filters the orders of the year
  const ordersYear = (previous) => {
    const ordersFilterYear = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (previous === "previous") {
        const previousYear = new Date(year, month - 1, 0).toDateString();
        return orderDate.getFullYear() === previousYear;
      }

      return orderDate.getFullYear() === year;
    });

    return totalItems(ordersFilterYear);
  };
  return {
    TotalDay: {
      date: ordersDay("false"),
      previous: ordersDay("previous"),
    },
    TotalMonth: {
      date: ordersMonth("false"),
      previous: ordersMonth("previous"),
    },
    TotalYear: {
      date: ordersYear("false"),
      previous: ordersYear("previous"),
    },
  };
};
export const dataStatsBar = (orders, date) => {
  const currentDate = getCurrentDate();
  const year = currentDate.year;
  const month = currentDate.month;
  if (date === "day") {
    const totalDay = [];
    const ultimoDiaMes = new Date(year, month, 0).getDate(); 

    for (let day = 1; day <= ultimoDiaMes; day++) {
      const totalDia = orders
        .filter((compra) => {
          const fechaCompra = new Date(compra.createdAt);
          return (
            fechaCompra.getFullYear() === year &&
            fechaCompra.getMonth() === month - 1 && 
            fechaCompra.getDate() === day
          );
        })
        .reduce((total, compra) => total + compra.total, 0);

      totalDay.push({ fecha: new Date(year, month - 1, day), total: totalDia });
    }

    return totalDay;
  }
  if (date === "month") {
    const ventasPorMes = orders.reduce((result, compra) => {
      const fechaCompra = new Date(compra.createdAt);
      if (fechaCompra.getFullYear() === year) {
        const mes = fechaCompra.getMonth();
        result[mes] = (result[mes] || 0) + compra.total;
      }
      return result;
    }, new Array(12).fill(0));

    return ventasPorMes.map((total, mes) => ({ date: mes + 1, total }));
  }

  return Array.from({ length: 5 + 1 }, (_, i) => {
    const date = year - i;
    const ventasAño = orders
      .filter((compra) => new Date(compra.createdAt).getFullYear() === date)
      .reduce((total, compra) => total + compra.total, 0);
    return { date, total: ventasAño };
  });
};
export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return {
    month: month,
    year: year,
    day: day,
  };
};

export const weekDay = ["M", "T", "W", "TH", "F", "S", "SU"];
export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
