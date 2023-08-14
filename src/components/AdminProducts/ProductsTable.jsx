"use client";
import AdminProducts from "@/components/AdminProducts/AdminProducts";
import api from "@/utils/axios";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ProductsTable() {
  const [users, setUsers] = useState([]);
  const updateData = () => {
    const getData = async () => {
      const { data } = await api.get("product");
      setUsers(data.results);
    };

    getData();
  };
  useEffect(updateData, []);

  return (
    <>
      <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small max-w-ld ">
        {users.length ? (
          <AdminProducts users={users} updateData={updateData} />
        ) : (
          <CircularProgress className="mt-20" aria-label="Loading..." />
        )}
      </div>
    </>
  );
}
