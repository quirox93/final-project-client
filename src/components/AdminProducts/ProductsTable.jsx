import api from "@/utils/api";
import AdminProducts from "./AdminProducts";

async function loadProducts() {
  const data = await fetch("http://localhost:3000/api/product");
  return await data.json();
}

export default async function ProductsTable() {
  const products = await loadProducts();
  return (
    <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
      {<AdminProducts defUsers={products.results} />}
    </div>
  );
}
