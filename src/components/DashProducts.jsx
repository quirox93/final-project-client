"use client";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DashProduct from "./DashProduct";
import DetailDashProduct from "./DetailDashProduct";
import axios from "axios";
import DashText from "./DashProduct/DashText";

export default function DashProducts() {
  const items = 2;
  const [dashProducts, setDashProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const map = dashProducts.map((product) => (
    <li key={product._id} className="gap-1 grid grid-flow-col grid-cols-5">
      <DashProduct
        id={product._id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        image={product.imag.secure_url}
        date={product.createdAt}
      />
    </li>
  ));
  useEffect(() => {
    //setDashProducts([]);
    axios
      .get(`https://restapicrud.ericksegura5.repl.co/products?page=${page}&count=${items}`)
      .then((response) => {
        setDashProducts(response.data.results);
        setTotal(Math.ceil(response.data.total / items));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [page]);

  return (
    <div>
      <ul role="list" className="divide-y divide-default">
        <div className="flex justify-center">
          <Pagination onChange={setPage} total={total} page={page} initialPage={1} />
          </div>
        <li className="gap-1 grid grid-flow-col grid-cols-5">
          <DashText info="Name" />
          <DashText info="Price" />
          <DashText info="Stock" />
          <DashText info="Date" />
          <DashText info="Actions" />
        </li>
        {map}
        <li></li>
      </ul>
      <DetailDashProduct />
    </div>
  );
}
