"use client";
import { Pagination, CircularProgress } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import api from "../utils/axios";
import SortPriceButton from "./SortPriceButton";
import SortNameButton from "./SortNameButton";
import FilterModal from "./FilterModal";
import SearchBar from "@/components/SearchBar";

export default function Products() {
  const items = 6;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortType, setSortType] = useState("");
  const [filters, setFilters] = useState({ stock: "1" });
  const [loading, setLoading] = useState(true);

  const map = loading ? (
    <CircularProgress className="mt-20" aria-label="Loading..." />
  ) : products.length === 0 ? (
    <div className="mt-20">
      <h1 className="font-bold text-danger">No products found.</h1>
    </div>
  ) : (
    products.map((product, index) => (
      <Product
        key={product._id}
        id={product._id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        image={product.imag.secure_url}
        delay={index * 0.2}
      />
    ))
  );
  const handleSearch = (searchQuery) => {
    setFilters({ ...filters, name: searchQuery });
    setPage(1);
  };
  const handleSortChange = (sortType) => {
    setSortType(sortType);
  };

  const handleFilter = (values) => {
    setFilters({ ...values });
  };

  const getData = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const queryParams = {
          page: page,
          limit: items,
          sort: sortType,
          ...filters,
        };
        const { data } = await api.get("/product", {
          params: queryParams,
        });
        setProducts(data.results);
        const newTotal = Math.ceil(data.total / items);
        setTotal(newTotal);
        if (page === 0 && newTotal > 0) setPage(1);
        if (page > newTotal) setPage(newTotal);
        else setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  };

  useEffect(getData, [page, sortType, filters]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
        <FilterModal cb={handleFilter} />
      </div>
      <div className="flex flex-wrap justify-center">{map}</div>
    </div>
  );
}
