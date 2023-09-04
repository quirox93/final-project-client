import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getAllOrders } from "@/utils/api";

const StatusOrder = ({ status, statusColorMap, statusOptions }) => {
  // const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState(status);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStatus = async (key) => {
    try {
      setIsLoading(true);
      await getAllOrders();
      setSelectedKeys(key);
      setIsLoading(false);
    } catch (error) {
      setSelectedKeys("Pending");
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="capitalize"
          color={statusColorMap[selectedKeys]}
          size="sm"
          isLoading={isLoading}
        >
          {selectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Status"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        onAction={(key) => handleStatus(key)}
        items={statusOptions}
      >
        {(item) => {
          if (item.name !== selectedKeys) {
            return (
              <DropdownItem key={item.name} color={statusColorMap[item.name]}>
                {item.name}
              </DropdownItem>
            );
          }
        }}
      </DropdownMenu>
    </Dropdown>
  );
};
export default StatusOrder;
