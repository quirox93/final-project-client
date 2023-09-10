import { User } from "@nextui-org/react";

function NameOrders({ order, cellValue }) {
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
}
export default NameOrders;
