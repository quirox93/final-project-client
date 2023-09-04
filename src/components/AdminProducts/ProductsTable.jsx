import AdminProducts from "./AdminProducts";
import { getAllProducts } from "@/utils/api";

const loadProducts = async () => await getAllProducts();

const columns = [
  { name: "ID", uid: "_id", sortable: false },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DATE", uid: "createdAt", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "createdAt", "stock", "price"];

export default async function ProductsTable() {
  const statusOptions = [
    { name: "Active", uid: true, prop: "enabled" },
    { name: "Paused", uid: false, prop: "enabled" },
  ];
  const products = await loadProducts();

  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
      {
        <AdminProducts
          mode={"product"}
          defItems={products.results}
          columns={columns}
          statusOptions={statusOptions}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        />
      }
    </div>
  );
}
