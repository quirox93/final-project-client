'use server'
import { User } from "@nextui-org/react";
import { getUserById } from "@/utils/api";

function NameOrders ({ order, cellValue })  {

  console.log(cellValue)
  
  return (
    <>
      <User
        avatarProps={{
          color: "secondary",
        }}
        classNames={{
          description: "text-default-500",
        }}
        description={order.email}
        name={cellValue}
      >
        {order.email}
      </User>
    </>
  );
};
export default NameOrders;
