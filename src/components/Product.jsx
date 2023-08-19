/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Input } from "@nextui-org/react";
import AlertModalStock from "./AlertModalStock";
import { useState} from "react";
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
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (quantity > props.stock) {
      setShowModal(true);
      return;
    }

    const existingProduct = selectionProducts.find(
      (product) => product.id === props.id
    );

    if (existingProduct) {
      // Checkear si la cantidad total excede el stock disponible
      if (existingProduct.quantity + quantity > props.stock) {
        setShowModal(true);
        return;
      }

      const updatedSelectionProducts = selectionProducts.map((product) =>
        product.id === props.id
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );

      dispatch(selectedProducts(updatedSelectionProducts));
    } else {
      const newProduct = {
        ...props,
        quantity: quantity,
      };

      dispatch(selectedProducts([...selectionProducts, newProduct]));
    }

    setQuantity(1);
  };

  return (
    <div className="bg-white m-10 lg:w-3/12 md:w-1/3 flex items-center  p-2 rounded-2xl shadow-2xl">
      <AlertModalStock isOpen={showModal} onClose={() => setShowModal(false)} name={props.name}/>
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
        <div className="flex justify-center items-center">
          
          <Input
          type="number"
          label="Quantity"
          onChange={(e) => {
            let inputValue = parseInt(e.target.value);
            if (isNaN(inputValue) || inputValue < 1) {
              inputValue = 1;
            } else if (inputValue > props.stock) {
              inputValue = props.stock;
            }
            setQuantity(inputValue);
          }}
          value={quantity}
          color="primary"
          placeholder="0"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              
            </div>
          }
        />
          <Button
            className=" flex mt-8  justify-center bg-primary rounded text-white  "
            onClick={handleAddToCart}
            disabled={props.stock === 0}
            size="sm"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
