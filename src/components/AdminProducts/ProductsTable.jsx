"use client";
import LoadingPage from "@/app/loading";
import AdminProducts from "@/components/AdminProducts/AdminProducts";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

export default function ProductsTable() {
  const [users, setUsers] = useState([]);
  const getData = () => {
    const fetchData = async () => {
      const { data } = await api.get("product");
      setUsers(data.results);
    };
    fetchData();
  };
  useEffect(getData, []);

  return (
    <>
      <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
        {users.length ? <AdminProducts defUsers={users} /> : <LoadingPage />}
      </div>
    </>
  );
}
