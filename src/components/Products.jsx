"use client";
import { Pagination } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import SortPriceButton from "./SortPriceButton";
import SortNameButton from "./SortNameButton";

export default function Products() {
  const items = 3;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSortChange = (sortType) => {
    const queryParams = {
      page: page,
      limit: items,
      sort: sortType,
    };

    axios
      .get("api/product", {
        params: queryParams,
      })
      .then((response) => {
        setProducts(response.data.results);
        setTotal(Math.ceil(response.data.total / items));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`api/product?page=${page}&limit=${items}`)
      .then((response) => {
        setProducts(response.data.results);
        setTotal(Math.ceil(response.data.total / items));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [page]);

  return (
    <div>
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
      <div className="flex mt-10 justify-evenly">
        <SortPriceButton onSortChange={handleSortChange} />
        <SortNameButton onSortChange={handleSortChange} />
      </div>
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
    </div>
  );
}
