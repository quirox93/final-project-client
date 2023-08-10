"use client";

import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/product/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap ">
      {products.map((product) => (
        <Product
          key={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
          image={product.imag.secure_url}
        />
      ))}
    </div>
  );
}
