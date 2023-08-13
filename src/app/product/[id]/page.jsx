/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react';
import { CircularProgress } from "@nextui-org/react";

import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/product/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <CircularProgress className="absolute top-1/2 left-1/2" aria-label="Loading..." />
    );
  }

  return (
    <div className='flex items-center justify-center mt-20'>
      <div className='flex justify-center flex-1 '>
      <img src={product.imag.secure_url} alt={product.name} />

      </div>
      <div className='flex-1 '>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        Price: <span className="text-green font-bold">${product.price}</span>
      </p>
      {product.stock === 0 ? (
        <span className="bg-black rounded-2xl text-white p-1">Out of Stock</span>
      ) : (
        <span className="bg-success-500 rounded-2xl text-white p-1">Available</span>
      )}
      <p>
        Stock:{" "}
        {product.stock === 0 ? (
          <span className="text-red">0</span>
        ) : (
          <span className="text-green">{product.stock}</span>
        )}
      </p>
      <button >Add to Cart</button>

      </div>
    </div>
  );
}