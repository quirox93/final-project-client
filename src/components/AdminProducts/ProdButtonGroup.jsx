"use client";
import DeleteButton from "./DeleteButton";
import DisableButton from "./DisableButton";
import EditButton from "./EditButton";

export default function ProdButtonGroup({
  product,
  cb,
  allItems,
  setAllItems,
}) {
  return (
    <>
      <EditButton
        id={product._id}
        name={product.name}
        description={product.description}
        price={product.price}
        stock={product.stock}
        data={allItems}
        setData={setAllItems}
        imag={product.imag.secure_url}
      />
      <DisableButton
        id={product._id}
        enabled={product.enabled}
        data={allItems}
        setData={setAllItems}
      />
      <DeleteButton
        cb={cb}
        id={product._id}
        data={allItems}
        setData={setAllItems}
      />
    </>
  );
}
