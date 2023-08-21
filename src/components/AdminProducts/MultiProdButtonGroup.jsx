"use client";
import DeleteButton from "./DeleteButton";
import DisableButton from "./DisableButton";
import EditButton from "./EditButton";

export default function MultiProdButtonGroup({ product, allItems, setAllItems }) {
  return (
    <>
       <DisableButton id={selected} enabled={true} data={allItems} setData={setAllItems} />
          <DisableButton id={selected} enabled={false} data={allItems} setData={setAllItems} />
          <DeleteButton
            cb={() => setSelectedKeys(new Set([]))}
            id={selected}
            data={allItems}
            setData={setAllItems}
          />
    </>
  );
}
