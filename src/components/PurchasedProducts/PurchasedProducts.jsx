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
                <div className="flex-column  items-center p-4 bg-primary-200 rounded-lg md:flex">
                  <h1 className="pr-2 text-lg font-bold">Order ID:</h1>
                  <Snippet>{order._id}</Snippet>
                  <h1 className="ml-auto mt-3 text-lg font-bold md:mt-0">
                    Total: ${calculateTotal(order.items).toFixed(2)}
                  </h1>
                </div>
              }
            >
              <TableHeader>
                <TableColumn>Image</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Mercado Pago</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Review</TableColumn>
              </TableHeader>
              <TableBody>
                {order?.items?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                    <Image
                          width={60}
                          height={60}
                          src={item._id.imag.secure_url}
                          alt={item._id.name}
                        />
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Link as={NextLink} href={`/product/${item._id._id}`}>
                        
                        <div className="ml-2">{item._id.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color="success"
                        size="sm"
                        variant="flat"
                      >
                        {order.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>${item.unit_price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <PurchasedModalReview
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
