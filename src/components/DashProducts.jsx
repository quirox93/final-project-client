"use client";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DashProduct from "./DashProduct";
import axios from "axios";
import DashText from "./DashProduct/DashText";
import { useRouter } from "next/router";
import api from "@/utils/axios";

export default function DashProducts() {
  const items = 5;
  const [dashProducts, setDashProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await api.delete(`product/${id}`);
    const newTotal = Math.ceil(data.total/ items);
    if (newTotal !== total) {
      setPage(newTotal);
    } else {
      updateData();
    }
  };

  const handleDisable = async (id, enabled) => {
    console.log(id);
    const formData = new FormData();
    formData.append("enabled", !enabled);
    console.log(formData)
    await api.put(`product/${id}`, formData);
    updateData();
  }
  const updateData = () => {
    //setDashProducts([]);
    api
      .get(`product?page=${page}&limit=${items}`)
      .then((response) => {
        setDashProducts(response.data.results);
        setTotal(Math.ceil(response.data.total / items));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const map = dashProducts.map((product) => (
    <li key={product._id} className="gap-1 grid grid-flow-col grid-cols-4 h-20">
      <DashProduct
        id={product._id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        imag={product.imag.secure_url}
        date={product.createdAt}
        enabled={product.enabled}
        handleDelete={handleDelete}
        handleDisable={handleDisable}
        updateData = {updateData}
        />
    </li>
  ));
  
  useEffect(updateData, [page]);

  return (
    <ul role="list" className="w-[50vw] text-xs">
      <div className="flex justify-center mb-5" >
        {total ? (
          <Pagination
            onChange={setPage}
            total={total}
            page={page}
            initialPage={1}
          />
        ) : (
          ""
        )}
      </div>
      <li className="gap-1 grid grid-flow-col grid-cols-4">
        <DashText info="Name" />
        <div className="gap-1 grid grid-flow-col grid-cols-2">
          <DashText info="Price" />
          <DashText info="Stock" />
        </div>
        <DashText info="Date" />
        <DashText info="Actions" />
      </li>
      {map}
    </ul>
  );
}
