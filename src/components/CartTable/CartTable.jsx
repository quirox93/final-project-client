"use client"
import React, { useState } from "react";
import AlertModalStock from "@/components/AlertModalStock";
import { DeleteDocumentIcon } from "@/assets/svg/DeleteDocumentIcon";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Image,
} from "@nextui-org/react";

import ShippingForm from "../CartShippingForm/ShippingForm";

const CartTable = ({
  cartItems,
  removeFromCartFn,
  updateQuantityFn,
  userId
}) => {
  const [showStockModal, setShowStockModal] = useState(false);
  const [modalItemName, setModalItemName] = useState("");
  const iconClasses = "text-xl text-default-500 flex-shrink-0";
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
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex">
        <div className="w-full ">
          {cartItems.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <div>
              <Table
                aria-label="Cart items"
                bottomContent={
                  <div className="flex justify-between items-center p-4 bg-primary-200 rounded-lg">
                    <span className="text-lg font-bold">
                      Total: ${calculateTotal(cartItems)}
                    </span>
                    {cartItems.length === 0 ? null : (
                      <div>
                        <ShippingForm cartItems={cartItems} userId={userId} />
                      </div>
                    )}
                  </div>
                }
              >
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Quantity</TableColumn>
                  <TableColumn>Subtotal</TableColumn>
                  <TableColumn>Delete</TableColumn>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center">
                        <Image width={50} height={50} src={item.image} alt={item.name} />
                        <div className="ml-2">{item.name}</div>
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>
                        <Input
                          className="w-20"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            if (e.target.value > item.stock) {
                              setShowStockModal(true);
                              setModalItemName(item.name);
                            } else {
                              setShowStockModal(false);
                              updateQuantityFn(item.id, e.target.value);
                            }
                          }}
                          min={1}
                        />
                      </TableCell>
                      <TableCell>${calculateSubtotal(item.price, item.quantity)}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="text"
                          onPress={() => removeFromCartFn(item.id)}
                        >
                          <DeleteDocumentIcon className={iconClasses} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
      {showStockModal && (
        <AlertModalStock
          isOpen={showStockModal}
          onClose={() => setShowStockModal(false)}
          name={modalItemName}
        />
      )}
     
    </div>
  );
};

export default CartTable;
