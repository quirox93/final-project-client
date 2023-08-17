"use client";
import { CartIcon } from "../assets/svg/CartIcon";
import Link from "next/link";
import { useSelector } from "react-redux";

import React from "react";

const ShopCartIcon = () => {
  const selectedProducts = useSelector(
    (state) => state.shopCart.selectionProducts
  );
  return (  
    <div className=" mr-8    relative">
      <Link href="/cart">
        <CartIcon />
      </Link>
      <span className="rounded-full w-3/4 text-center bg-danger absolute top-5 left-5 ">
        {selectedProducts.length}
      </span>
    </div>
  );
};

export default ShopCartIcon;
