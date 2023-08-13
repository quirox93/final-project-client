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
          Ordenar por Precio
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="menor" onClick={() => handleSortChange("priceAsc")}>
          Menor Precio
        </DropdownItem>
        <DropdownItem key="mayor" onClick={() => handleSortChange("priceDesc")}>
          Mayor Precio
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortPriceButton;
