import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const SortPriceButton = ({ onSortChange }) => {
  const handleSortChange = (sortType) => {
    onSortChange(sortType);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="solid">
          Order by Price
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="menor" onClick={() => handleSortChange("priceAsc")}>
          Low Price
        </DropdownItem>
        <DropdownItem key="mayor" onClick={() => handleSortChange("priceDesc")}>
          High Price
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortPriceButton;
