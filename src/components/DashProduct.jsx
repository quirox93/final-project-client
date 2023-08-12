/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button, ButtonGroup } from "@nextui-org/react";
import DashText from "./DashProduct/DashText";


export default function DashProduct(props) {

  return (
    <>
      <div className="w-15 px-2.5  justify-center items-center inline-flex">
        <img className="w-14 rounded-3xl" src={props.image} />
        <div className="w-36 text-center font-bold">{props.name}</div>
      </div>
      <div className="gap-1 grid grid-flow-col grid-cols-2">
        <DashText info={props.price} />
        <DashText info={props.stock} />
      </div>

      <DashText info={props.date} />
      <ButtonGroup>
        <Button className=" text-1xs font-bold border-2 border-primary" color="success">
          EDIT
        </Button>
        <Button className=" text-1xs font-bold  border-2 border-primary" color="warning">
          DISABLE
        </Button>
        <Button className=" text-1xs font-bold border-2 border-primary" color="danger" onClick={()=>props.handleDelete(props.id)}>
          DELETE
        </Button>
      </ButtonGroup>
    </>
  );
}
