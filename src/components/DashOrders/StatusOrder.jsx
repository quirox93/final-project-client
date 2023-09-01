import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const StatusOrder = ({ status}) => {
    const statusColorMap = {
        Pending: "warning",
        Success: "success",
        Failure: "danger",
      };
  const [selectedKeys, setSelectedKeys] = React.useState(status);

  const selectedValue = React.useMemo(
    
    () => Array.from(selectedKeys),
    [selectedKeys],
    
  );
    console.log({selectedKeys})
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
        className="capitalize"
        color={statusColorMap[selectedValue]}
        size="sm"
        >
          {selectedValue}        
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Pending">Pending</DropdownItem>
        <DropdownItem key="Success">Success</DropdownItem>
        <DropdownItem key="Failure">Failure</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
export default StatusOrder;