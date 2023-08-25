import AdminProducts from "./AdminProducts";
import { prodGetAll } from "@/utils/api";

const loadProducts = async () => await prodGetAll();

const columns = [
  { name: "ID", uid: "_id", sortable: false },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DATE", uid: "createdAt", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "createdAt", "stock", "price"];
export const revalidate = 0;
export default async function UsersTable() {
  const statusOptions = [
    { name: "Active", uid: true, prop: "status" },
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
