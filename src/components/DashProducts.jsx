"use client";

import React, { useState, useEffect } from "react";
import DashProduct from "./DashProduct";
import DetailDashProduct from "./DetailDashProduct";
import axios from "axios";

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
      <ul role="list" className="divide-y divide-gray-100">
        {dashProducts.map((product) => (
          <li key={product._id} className="w-96 h-20 px-3.5 flex-col justify-center items-center gap-2.5 inline-flex">
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
      <DetailDashProduct/>
    </div>
  );
}
