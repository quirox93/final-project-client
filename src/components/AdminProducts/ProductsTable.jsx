import AdminProducts from "./AdminProducts";
import api from "@/utils/api";

const loadProducts = async () => await api.products();

export default async function ProductsTable() {
  const products = await loadProducts();
  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
      {<AdminProducts defUsers={products.results} />}
    </div>
  );
}
