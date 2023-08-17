import AdminProducts from "@/components/AdminProducts/AdminProducts";
import api from "@/utils/axios";

export default async function ProductsTable() {
  const { data } = await api.get("product");
  const users = [];
  return (
    <>
      <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
        <AdminProducts defUsers={users} />
      </div>
    </>
  );
}
