"use server";
import LoadingPage from "@/app/loading";
import AdminProducts from "@/components/AdminProducts/AdminProducts";
import { iApi } from "@/utils/axios";
import { currentUser } from "@clerk/nextjs";
//import { useEffect, useState } from "react";

export default async function ProductsTable() {
  /* const [users, setUsers] = useState([]);
  const getData = () => {
    const fetchData = async () => {
      const { data } = await api.get("product");
      setUsers(data.results);
    };
    fetchData();
  };
  useEffect(getData, []);
*/
  const user = await currentUser();
  const users = await iApi.products.fetch("product");
  return (
    <>
      <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
        {users.length ? <AdminProducts defUsers={users} /> : <LoadingPage />}
      </div>
    </>
  );
}
