/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use_client";
import DashButton from "./DashProduct/DashButton";
import DashText from "./DashProduct/DashText";

export default function DashProduct(props) {
  return (
    <>
      <div className="w-15 px-2.5  justify-start items-center inline-flex">
        <img className="w-14 rounded-3xl" src="https://via.placeholder.com/60x60" />
        <div className="w-36 text-center text-1xl font-bold">{props.name}</div>
      </div>
      <DashText info={props.price} />
      <DashText info={props.stock} />
      <DashText info={props.date} />
      <div className="flex gap-1">
        <DashButton type="UPDATE" color="success" />
        <DashButton type="DISABLE" color="warning" />
        <DashButton type="DELETE" color="danger" />
      </div>
    </>
  );
}
