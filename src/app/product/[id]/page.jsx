/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { CircularProgress, Button } from "@nextui-org/react";
import { selectedProducts } from "@/store/slice";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const selectionProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/product/${id}`);

      const alignedProduct = {
        id: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: data.imag.secure_url,
      };

      setProduct(alignedProduct);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
    };

    const totalQuantity = selectionProducts.reduce(
      (total, p) => (p.id === productToAdd.id ? total + p.quantity : total),
      0
    );

    if (totalQuantity + quantity <= product.stock) {
      const productsToAdd = Array.from({ length: quantity }, () => ({
        ...productToAdd,
        quantity: 1,
      }));

      dispatch(selectedProducts([...selectionProducts, ...productsToAdd]));
      setQuantity(1);
    } else {
      alert("Maximum stock reached");
    }
  };

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
        <img
          className="border-4 border-primary rounded-2xl"
          src={product.image}
          alt={product.name}
        />
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
            <span>{product.stock}</span>
          )}
        </p>
        <div className="text-center">
          <Button
            color="primary"
            aria-label="Like"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
