/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import api from "../../../utils/axios";
import AlertModalStock from "@/components/AlertModalStock";
import {
  CircularProgress,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Image,
} from "@nextui-org/react";
import { selectedProducts } from "@/store/slice";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const selectionProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    if (quantity > product.stock) {
      setShowModal(true);
      return;
    }
  
    const existingProduct = selectionProducts.find((p) => p.id === product.id);
  
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
  
      if (newQuantity <= product.stock) {
        const updatedSelectionProducts = selectionProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        );
  
        dispatch(selectedProducts(updatedSelectionProducts));
      } else {
        setShowModal(true);
      }
    } else {
      const newProduct = {
        ...product,
        quantity: quantity,
      };
  
      dispatch(selectedProducts([...selectionProducts, newProduct]));
    }
  
    setQuantity(1);
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
      <AlertModalStock
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        name={product.name}
      />
      <div className="flex justify-center flex-1 m-7 max-w-xl">
        <img
          className="border-4 border-primary rounded-2xl"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className=" flex-1 ">
        <Card className="max-w-[400px] m-auto">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <h1 className=" font-bold mt-4">{product.name}</h1>
              <p className="text-small text-default-500">${product.price}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{product.description}</p>
          </CardBody>
          <Divider />
          <CardBody>
            {product.stock === 0 ? (
              <Chip
              className="capitalize"
              color="danger"
              size="sm"
              variant="flat"
            >
              Out of stock
            </Chip>
            ) : (
               <Chip
               className="capitalize"
               color="success"
               size="sm"
               variant="flat"
             >
               Available
             </Chip>
            )}
            
          </CardBody>
          <Divider />
          <CardBody>
            <p>
              Stock:{" "}
              {product.stock === 0 ? (
                <span className="text-red">0</span>
              ) : (
                <span>{product.stock}</span>
              )}
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              className="m-auto"
              color="primary"
              aria-label="Like"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
