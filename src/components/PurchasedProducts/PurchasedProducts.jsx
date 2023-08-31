"use client";
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
  Link
} from "@nextui-org/react";

const PurchasedProducts = ({ orders, clerkId }) => {


  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Purchased Items</h1>
      {orders.map((order) => (
        <div key={order._id} className="mb-4">
          <h2 className="text-lg font-bold">Order Date: {formatDate(order.createdAt)}</h2>
          <Table
            aria-label={`Items for Order ${order._id}`}
            bottomContent={
              <div className="flex items-center p-4 bg-primary-200 rounded-lg">
                <h1 className="pr-2 text-lg font-bold">Order ID:</h1>
                <Snippet>{order._id}</Snippet>
                <h1 className="ml-auto text-lg font-bold">Total: ${calculateTotal(order.items)}</h1>
              </div>
            }
          >
          
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Review</TableColumn>
            </TableHeader>
            <TableBody>
              {order?.items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center">
                  <Link as={NextLink} href={`/product/${item._id._id}`}>
                    <Image width={50} height={50} src={item._id.imag.secure_url} alt={item._id.name} />
                    <div className="ml-2">{item._id.name}</div>
                  </Link>  
                  </TableCell>
                  <TableCell>
                    <Chip className="capitalize" color="success" size="sm" variant="flat">
                      {order.mpStatus} 
                    </Chip>
                  </TableCell>
                  <TableCell>${item.unit_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <PurchasedModalReview clerkId={clerkId} itemId={item._id._id} itemReviews={item._id.reviews}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};



export default PurchasedProducts;
