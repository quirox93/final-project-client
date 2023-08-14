import api from "@/utils/axios";

const columns = [
  { name: "ID", uid: "_id", sortable: false },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DATE", uid: "createdAt", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
];

const statusOptions = [
  { name: "Active", uid: true },
  { name: "Paused", uid: false },
];

export { columns, statusOptions };
