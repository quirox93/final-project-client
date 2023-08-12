import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const SortNameButton = ({ onSortChange }) => {
  const handleSortChange = (sortType) => {
    onSortChange(sortType);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="solid">
          Ordenar por Nombre
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="az" onClick={() => handleSortChange("nameAsc")}>
          A-Z
        </DropdownItem>
        <DropdownItem key="za" onClick={() => handleSortChange("nameDesc")}>
          Z-A
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortNameButton;