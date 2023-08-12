"use client";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DashProduct from "./DashProduct";
import DetailDashProduct from "./DetailDashProduct";
import axios from "axios";
import DashText from "./DashProduct/DashText";
import { useRouter } from "next/router";

export default function DashProducts() {
  const items = 5;
  const [dashProducts, setDashProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await axios.delete(`api/product/${id}`);
    const newTotal = Math.ceil(data.total/ items);
    if (newTotal !== total) {
      setPage(newTotal);
    } else {
      updateData();
    }
  };

  const map = dashProducts.map((product) => (
    <li key={product._id} className="gap-1 grid grid-flow-col grid-cols-4">
      <DashProduct
        id={product._id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        image={product.imag.secure_url}
        date={product.createdAt}
        handleDelete={handleDelete}
      />
    </li>
  ));
  const updateData = () => {
    //setDashProducts([]);
    axios
      .get(
        `https://restapicrud.ericksegura5.repl.co/products?page=${page}&count=${items}`
      )
      .then((response) => {
        setDashProducts(response.data.results);
        setTotal(Math.ceil(response.data.total / items));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(updateData, [page]);

  return (
    <ul role="list" className="w-[50vw] text-xs">
      <div className="flex justify-center">
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
      {/*<DetailDashProduct /> */}
    </ul>
  );
}
