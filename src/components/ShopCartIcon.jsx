/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  cn,
} from "@nextui-org/react";
import { CartIcon } from "../assets/svg/CartIcon";
import { DeleteDocumentIcon } from "@/assets/svg/DeleteDocumentIcon";
import { useSelector } from "react-redux";

import React from "react";

const ShopCartIcon = () => {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const selectedProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );

  /* Cuenta los productos  */
  const productCountMap = selectedProducts.reduce((map, product) => {
    map[product._id] = (map[product._id] || 0) + 1;
    return map;
  }, {});

  
  /* Crea una instancia por productos repetidos con su respectiva cuenta */
  const uniqueProducts = Object.keys(productCountMap).map((productId) => {
    const product = selectedProducts.find((p) => p._id === productId);
    return { ...product, count: productCountMap[productId] };
  });

  const totalPrice = uniqueProducts.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);


  return (
    <div
      className=" mr-12 "
    >
      <Dropdown>
        <Badge color="danger" content={selectedProducts.length} shape="circle">
          <DropdownTrigger>
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="dark"
            >
              <CartIcon size={30} />
            </Button>
          </DropdownTrigger>
        </Badge>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
          color="primary"
        >
          <DropdownSection title="Products" showDivider>
          {uniqueProducts.map((product) => (
              <DropdownItem
                key={product._id}
                description={`${product.name} - $${product.price}`}
                startContent={
                  <>
                    <img src={product.imag.secure_url} alt={product.name} className="w-12 h-12" />
                    {product.count > 1 && (
                      <span className="ml-2 text-sm text-gray-500">
                        ×{product.count}
                      </span>
                    )}
                  </>
                }
                shortcut={<DeleteDocumentIcon className={cn(iconClasses)} />}
              >
                {product.name}
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection title="Buy Items">
            <DropdownItem
              key="delete"
              className="text-primary"
              color="success"
              shortcut="Buy"
              description={`Subtotal: $${totalPrice}`}
              startContent={
                <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="dark"
            >
              Cart
            </Button>
              }
            >
              Subtotal:
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

    </div>
  );
};

export default ShopCartIcon;
