"use client";
import api from "@/utils/axios";
import { formatDate } from "./utils";
import PurchasedModalReview from "../PurchasedModalReview/PurchasedModalReview";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Image,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const PurchasedProducts = ({ orders }) => {
  return <div></div>;
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get("/order");
        const findOrder = data.find((order) => order.payer.clerkId !== clerkId);

        if (findOrder) {
          setOrder(findOrder);

          const fetchProductDetails = async () => {
            const productPromises = findOrder.items.map(async (itemId) => {
              try {
                const { data: productData } = await api.get(`/product/${itemId}`);
                return {
                  id: productData._id,
                  name: productData.name,
                  price: productData.price,
                  image: productData.imag.secure_url,
                  date: formatDate(order.createdAt),
                };
              } catch (error) {
                console.error(`Error fetching product data for ID ${itemId}:`, error);
                return null;
              }
            });

            const products = await Promise.all(productPromises);
            setItems(products);
          };

          fetchProductDetails();
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrder();
  }, [clerkId]);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };
  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item.price, item.quantity),
      0
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Purchased Items</h1>
      <Table
        aria-label="Cart items"
        bottomContent={
          <div className="flex justify-between items-center p-4 bg-primary-200 rounded-lg">
            <span className="text-lg font-bold">Total: ${calculateTotal(items)}</span>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Order Date</TableColumn>
          <TableColumn>Review</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="flex items-center">
                <Image width={50} height={50} src={item.image} alt={item.name} />
                <div className="ml-2">{item.name}</div>
              </TableCell>
              <TableCell>
                <Chip className="capitalize" color="success" size="sm" variant="flat">
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <PurchasedModalReview />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchasedProducts;
