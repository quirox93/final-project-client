"use client";
import { useState } from "react";
import AlertModalStock from "@/components/AlertModalStock";
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

const CartTable = ({
  cartItems,
  removeFromCartFn,
  updateQuantityFn,
  handleCheckoutFn,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItemName, setModalItemName] = useState(""); 

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
      <Table
        aria-label="Cart items"
        bottomContent={
          <div className="flex justify-between items-center p-4 bg-primary-200 rounded-lg">
            <span className="text-lg font-bold">
              Total: ${calculateTotal(cartItems)}
            </span>
            <Button
              className="border-3 rounded-2xl bg-danger text-white"
              size="medium"
              variant="secondary"
              onClick={handleCheckoutFn}
            >
              Finalizar Compra
            </Button>
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
                      setShowModal(true);
                      setModalItemName(item.name); 
                    } else {
                      setShowModal(false); 
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
                  onClick={() => removeFromCartFn(item.id)}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showModal && (
        <AlertModalStock
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          name={modalItemName} 
        />
      )}
    </div>
  );
};

export default CartTable;