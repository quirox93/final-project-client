import api from "@/utils/axios";

const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DATE", uid: "createdAt", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "false" },
];

export { columns, statusOptions };
