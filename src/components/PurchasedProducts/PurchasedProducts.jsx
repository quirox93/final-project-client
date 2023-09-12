"use client";
import { useState } from "react";
import { formatDate, calculateTotal } from "./utils";
import PurchasedModalReview from "../PurchasedModalReview/PurchasedModalReview";
import NextLink from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Image,
  Snippet,
  Link,
} from "@nextui-org/react";

const PurchasedProducts = ({ initOrders, clerkId }) => {
  const [orders, setOrders] = useState(initOrders);

  const updateReview = (itemId, id, score, message) => {
    const newOrders = orders.map((e) => {
      e.items.map((product) => {
        if (product._id._id !== itemId) return product;
        const review = product._id.reviews.find((r) => r.clerkId === id);
        if (review) {
          review.message = message;
          review.score = score;
        } else {
          product._id.reviews.push({
            clerkId: id,
            message,
            score,
          });
        }
        return product;
      });

      return e;
    });
    setOrders(newOrders);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Purchased Items</h1>

      {orders.length === 0 ? (
        <div>
          <h1>No purchased products yet.</h1>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-4">
            <h2 className="text-lg font-bold">
              Order Date: {formatDate(order.createdAt)}
            </h2>
            <Table
              aria-label={`Items for Order ${order._id}`}
              bottomContent={
                <div className="flex-column  items-center p-4 justify-between bg-primary-200 rounded-lg lg:flex">
                  <div className="flex-column p-1 items-center justify-between xm:flex">
                  <h1 className="pr-2 text-sm font-bold sm:text-base">Order ID:</h1>
                  <Snippet>{order._id}</Snippet>

                  </div>
                  <div className="flex p-1 items-center justify-between">
                  <h1 className="font-bold text-sm mr-2 sm:text-base">Order Status:</h1>
                  <Chip
                    className="capitalize"
                    color="success"
                    size="sm"
                    variant="flat"
                  >
                    {order.status}
                  </Chip>

                  </div>
                  <div className="flex p-1 items-center justify-between">
                  <h1 className="font-bold text-sm mr-2 sm:text-base">Mercado Pago Status:</h1>
                  {order.mpStatus !== "approved" ? (
                    <Link
                      href={`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${order.mpId}`}
                    >
                      <Chip
                        className="capitalize"
                        color="primary"
                        size="sm"
                        variant="solid"
                      >
                        {order.mpStatus}
                      </Chip>
                    </Link>
                  ) : (
                    <Chip
                      className="capitalize"
                      color="primary"
                      size="sm"
                      variant="bordered"
                    >
                      {order.mpStatus}
                    </Chip>
                  )}

                  </div>
                  <div className="flex p-1 items-center justify-between">
                    <h1 className="font-bold text-sm mr-2 sm:text-base">Total:</h1>
                    <p className="font-bold text-sm md:mt-0 sm:text-base">${calculateTotal(order.items).toFixed(2)}</p>
                  </div>
                </div>
              }
            >
              <TableHeader>
                <TableColumn className="hidden sm:table-cell">Image</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                
                <TableColumn>Review</TableColumn>
              </TableHeader>
              <TableBody>
                {order?.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        width={60}
                        height={60}
                        src={item._id.imag.secure_url}
                        alt={item._id.name}
                      />
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Link as={NextLink} href={`/product/${item._id._id}`}>
                        <div className="ml-2 text-xs xm:text-sm sm:text-base">{item._id.name}</div>
                      </Link>
                    </TableCell>

                    <TableCell >{`${item.quantity} x $${item.unit_price}`}</TableCell>
                    
                    <TableCell>
                      <PurchasedModalReview
                        className="sm"
                        clerkId={clerkId}
                        itemId={item._id._id}
                        itemReviews={item._id.reviews}
                        updateReview={updateReview}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchasedProducts;
