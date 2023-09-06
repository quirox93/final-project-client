/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Input,
  Divider,
  Chip,
} from "@nextui-org/react";
import AlertModalStock from "./AlertModalStock";
import ProductPopOver from "./ProductPopOver/ProductPopOver";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectedProducts } from "@/store/slice";
import { motion } from "framer-motion";

export default function Product(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectionProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (popoverOpen) {
      timer = setTimeout(() => {
        setPopoverOpen(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [popoverOpen]);

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

    setQuantity(quantity);
    setPopoverOpen(true);
  };

  return (
    <motion.div
      className="bg-white m-3 lg:w-3/12 md:w-1/3 flex items-center  p-2 rounded-2xl shadow-2xl sm:m-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: props.delay }}
    >
      <AlertModalStock
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        name={props.name}
      />
      <div className="flex-1">
        <img
          className=" cursor-pointer min-w-[100px]"
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
        <Divider />
        <p>
          Price: <span className="font-bold">${props.price}</span>
        </p>
        {props.stock === 0 ? (
          <Chip className="capitalize" color="danger" size="sm" variant="flat">
            Out of stock
          </Chip>
        ) : (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            Available
          </Chip>
        )}
        <p>
          Stock:{" "}
          {props.stock === 0 ? (
            <span className="text-red">0</span>
          ) : (
            <span className="text-green">{props.stock}</span>
          )}
        </p>
        <Divider />
        <div className="flex-column justify-center items-center">
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
            labelPlacement="inside"
            className="mb-2"
            startContent={
              <div className="pointer-events-none flex items-center"></div>
            }
          />
          <ProductPopOver 
            popoverOpen={popoverOpen}
            handleAddToCart={handleAddToCart}
            quantity={quantity}
            stock={props.stock}
          />
        </div>
      </div>
    </motion.div>
  );
}
