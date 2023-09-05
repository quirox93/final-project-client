/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import api from "../../../utils/axios";
import AlertModalStock from "@/components/AlertModalStock";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import ProductPopOver from "@/components/ProductPopOver/ProductPopOver";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Image,
  Input,
} from "@nextui-org/react";
import { selectedProducts } from "@/store/slice";
import { useParams } from "next/navigation";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import StarRatings from "react-star-ratings";
import ReviewsDetail from "@/components/ReviewsDetail/ReviewsDetail";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const selectionProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { id } = params;
  

  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: `${product?.name}`,
      url: `/product/${product?.id}`,
    },
  ];

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
        date: new Date(data.createdAt),
        reviews: data.reviews,
      };
      const rawDate = alignedProduct.date;
      const formattedDate = `${rawDate.getDate()}/${
        rawDate.getMonth() + 1
      }/${rawDate.getFullYear()}`;

      alignedProduct.date = formattedDate;

      setProduct(alignedProduct);
      const totalScores = alignedProduct.reviews.reduce(
        (sum, review) => sum + review.score,
        0
      );
      const avgRating =
        alignedProduct.reviews.length > 0
          ? totalScores / alignedProduct.reviews.length
          : 0;
      setAverageRating(avgRating);
    };
    fetchProduct();
  }, [id]);

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
        setPopoverOpen(true);
      } else {
        setShowModal(true);
      }
    } else {
      const newProduct = {
        ...product,
        quantity: quantity,
      };

      dispatch(selectedProducts([...selectionProducts, newProduct]));
      setPopoverOpen(true);
    }

    setQuantity(1);
  };

  if (!product) {
    return;
  }

  return (
    <PageWrapper>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <div className="flex-column items-center justify-center mt-4 sm:flex">
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
        <div className=" flex-1 mr-1">
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
                <h1 className=" font-bold text-xl  mt-4">{product.name}</h1>
                <p className="text-base font-bold">${product.price}</p>
                <p className="text-sm">Date: {product.date}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <StarRatings
                  rating={averageRating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="text-yellow-500">
                  {averageRating.toFixed(1)}
                </span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>
                {product.reviews.length > 0 && (
                  <span className="text-green-500">Reviewed</span>
                )}
              </div>
            </CardBody>
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
              <p>Category: Magic Deck</p>
              <p>Brand: Bandai</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex-column justify-center items-center m-auto">
                <Input
                  type="number"
                  label="Quantity"
                  onChange={(e) => {
                    let inputValue = parseInt(e.target.value);
                    if (isNaN(inputValue) || inputValue < 1) {
                      inputValue = 1;
                    } else if (inputValue > product.stock) {
                      inputValue = product.stock;
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
                stock={product.stock}
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      {product.reviews.length > 0 && (
        <div className="m-4">
          <ReviewsDetail reviews={product.reviews} />
        </div>
      )}
    </PageWrapper>
  );
}
