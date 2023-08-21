/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
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
import { deletedProducts } from "@/store/slice";
import { CartIcon } from "../assets/svg/CartIcon";
import { DeleteDocumentIcon } from "@/assets/svg/DeleteDocumentIcon";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const ShopCartIcon = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const selectedProducts = useSelector((state) => state.shopCart.selectionProducts);

  /* Crea un mapa de cantidad por producto */
  const productCountMap = selectedProducts.reduce((map, product) => {
    map[product.id] = (map[product.id] || 0) + product.quantity;
    return map;
  }, {});

  /* Crea una instancia por productos con su respectiva cantidad */
  const uniqueProducts = selectedProducts.map((product) => ({
    ...product,
    quantity: productCountMap[product.id],
  }));

  const totalQuantity = selectedProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  const totalPrice = selectedProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="mr-6">
      <Dropdown shouldBlockScroll={false} className="mr-6 w-max max-h-unit-72">
        <Badge color="danger" content={totalQuantity} shape="circle">
          <DropdownTrigger>
            <Button radius="full" isIconOnly aria-label="more than 99 notifications" variant="dark">
              <CartIcon size={30} />
            </Button>
          </DropdownTrigger>
        </Badge>
        <DropdownMenu
          className="overflow-auto"
          variant="faded"
          aria-label="Dropdown menu with description"
          color="primary"
        >
          <DropdownSection title="Products" showDivider>
            {uniqueProducts.map((product) => (
              <DropdownItem
                key={product.id}
                description={`${product.name} - $${product.price}`}
                closeOnSelect={false}
                startContent={
                  <>
                    <img src={product.image} alt={product.name} className="w-12 h-12" />
                    {product.quantity > 0 && (
                      <span className="ml-2 text-sm text-gray-500">×{product.quantity}</span>
                    )}
                  </>
                }
                shortcut={
                  <button onClick={() => dispatch(deletedProducts(product.id))}>
                    <DeleteDocumentIcon className={cn(iconClasses)} />
                  </button>
                }
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
              onClick={() => router.push("/cart")}
              shortcut={
                <button >
                  Buy
                </button>
              }
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
