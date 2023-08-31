"use client"
import React, { useState } from "react";
import AlertModalStock from "@/components/AlertModalStock";
import CartRedirect from "../CartViews/CartRedirect";
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
import { initMercadoPago } from "@mercadopago/sdk-react";
import ShippingForm from "../CartShippingForm/ShippingForm";

const CartTable = ({
  cartItems,
  removeFromCartFn,
  updateQuantityFn,
  handleCheckoutFn,

}) => {
  const [showStockModal, setShowStockModal] = useState(false);
  const [showMercadoPagoModal, setShowMercadoPagoModal] = useState(false);
  const [modalItemName, setModalItemName] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);

  initMercadoPago("TEST-b6901044-4403-469b-8ec6-9272736926b6");

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item.price, item.quantity),
      0
    );
  };

  const handleCheckout = async () => {
    try {
      setButtonLoader(true);
      const paymentcheck = await handleCheckoutFn(handleupdate);
      setButtonLoader(false);
      setPreferenceId(paymentcheck.id);
      setShowMercadoPagoModal(true);
    } catch (error) {
      console.log(error);
      alert("Error processing payment.");
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex">
        {cartItems.length === 0 ? null : (
          <div className="w-1/2 pr-4">
            <ShippingForm/>
          </div>
        )}
        <div className="w-1/2 pl-4">
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
                    <Button
                      className="border-3 rounded-2xl bg-danger text-white"
                      size="medium"
                      isLoading={buttonLoader}
                      variant="secondary"
                      onPress={handleCheckout}
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
                          X
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
      {showMercadoPagoModal && (
        <CartRedirect
          isOpen={showMercadoPagoModal}
          onClose={() => setShowMercadoPagoModal(false)}
          preferenceId={preferenceId}
        />
      )}
    </div>
  );
};

export default CartTable;
