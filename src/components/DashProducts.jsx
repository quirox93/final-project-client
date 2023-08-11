"use client";

import React, { useState, useEffect } from "react";
import DashProduct from "./DashProduct";
import DetailDashProduct from "./DetailDashProduct";
import axios from "axios";
import DashText from "./DashProduct/DashText";

export default function DashProducts() {
  const [dashProducts, setDashProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/product")
      .then((response) => {
        setDashProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <ul role="list" className="divide-y divide-default">
        <li className="gap-1 grid grid-flow-col grid-cols-5">
          <DashText info="Name" />
          <DashText info="Price" />
          <DashText info="Stock" />
          <DashText info="Date" />
          <DashText info="Actions" />
        </li>
        {dashProducts.map((product) => (
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
        ))}
      </ul>
      <DetailDashProduct />
    </div>
  );
}
