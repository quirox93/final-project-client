"use client";
import DeleteButton from "./DeleteButton";
import DisableButton from "./DisableButton";

export default function MultiProdButtonGroup({ selected, cb, allItems, setAllItems }) {
  return (
    <>
      <DisableButton id={selected} enabled={true} data={allItems} setData={setAllItems} />
      <DisableButton id={selected} enabled={false} data={allItems} setData={setAllItems} />
      <DeleteButton cb={cb} id={selected} data={allItems} setData={setAllItems} />
    </>
  );
}
