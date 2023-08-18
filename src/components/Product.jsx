/* eslint-disable @next/next/no-img-element */
"use client";
import { findIndex } from "lodash"
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectedProducts } from "@/store/slice";
export default function Product(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectionProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const productToAdd = {
      ...props,
    };
    const productsToAdd = Array.from({ length: quantity }, () => ({
      ...productToAdd,
    })); 

    const existingIndex = findIndex(
      selectionProducts,
      (product) => product.id === productToAdd.id
    );
  
    if (existingIndex !== -1) {
      const existingProduct = selectionProducts[existingIndex];
      const totalQuantity = existingProduct.quantity + productsToAdd.length;
  
      if (totalQuantity <= props.stock) {
        existingProduct.quantity = totalQuantity;
      } else {
        alert("Maximum stock reached")
        return;
      }
    } else {
      dispatch(selectedProducts([...selectionProducts, ...productsToAdd]));
    }

    setQuantity(1); 
  };

  return (
    <div className="bg-white m-10 lg:w-3/12 md:w-1/3 flex items-center  p-2 rounded-2xl shadow-2xl">
      <div className="flex-1">
        <img
          className=" cursor-pointer"
          src={props.image}
          alt={props.name}
          width={200}
          height={200}
          onClick={() => router.push(`/product/${props.id}`)}
        />
      </div>
      <div className="text-black ml-5 flex-1 space-y-3">
        <h2
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push(`/product/${props.id}`)}
        >
          {props.name}{" "}
        </h2>
        <p>{props.description}</p>
        <p>
          Price: <span className="font-bold">${props.price}</span>
        </p>
        {props.stock === 0 ? (
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
          {props.stock === 0 ? (
            <span className="text-red">0</span>
          ) : (
            <span className="text-green">{props.stock}</span>
          )}
        </p>
        <div className="flex items-center">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= props.stock) {
                setQuantity(inputValue);
              }  else if (e.target.value === '') {
                setQuantity(1);
              }
            }}
            className="border p-1 mr-2"
            min={1}
            max={props.stock}
          />
          <Button
            className="w-12 flex  justify-center bg-primary rounded text-white py-2 px-4"
            onClick={handleAddToCart}
            disabled={props.stock === 0}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
