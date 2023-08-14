/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import {HeartIcon} from "../../../assets/svg/HeartIcon"
import api from "../../../utils/axios";
import { CircularProgress, Button } from "@nextui-org/react";


import { useParams } from "next/navigation";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/product/${id}`);

      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <CircularProgress
        className="absolute top-1/2 left-1/2"
        aria-label="Loading..."
      />
    );
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex justify-center flex-1 m-2 ">
        <img className="border-4 border-primary rounded-2xl"src={product.imag.secure_url} alt={product.name} />
      </div>
      <div className=" flex-column flex-1 m-4 text-center justify-center space-y-10 bg-content4 rounded-2xl pb-4">
        <h1 className=" font-bold mt-4">{product.name}</h1>
        <p>{product.description}</p>
        <p className="pb-2">
          Price: <span className="text-green font-bold">${product.price}</span>
        </p>
        {product.stock === 0 ? (
          <span className="bg-black rounded-2xl text-white p-1">
            Out of Stock
          </span>
        ) : (
          <span className="bg-success-500 rounded-2xl text-white p-1">
            Available
          </span>
        )}
        <p>
          Stock:{" "}
          {product.stock === 0 ? (
            <span className="text-red">0</span>
          ) : (
            <span >{product.stock}</span>
          )}
        </p>
        <div className="text-center">
        <Button isIconOnly color="primary" aria-label="Like">
            <HeartIcon />
        </Button>

        </div>
      </div>
    </div>
  );
}
