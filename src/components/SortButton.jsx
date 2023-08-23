import { useState, useMemo } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@nextui-org/react";

export default function SortButton({ onSortChange }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Date", "Newest"]));

  const SORTS = {
    Price: {
      Low: "priceAsc",
      High: "priceDesc",
    },
    Name: {
      "A-Z": "nameAsc",
      "Z-A": "nameDesc",
    },
    Date: {
      Newest: "dateAsc",
      Oldest: "dateDesc",
    },
  };
  const isDateSelected = selectedKeys.has("Date");
  const isPriceSelected = selectedKeys.has("Price");
  const isNameSelected = selectedKeys.has("Name");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(" ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleChange = ({ currentKey }) => {
    if (!currentKey) return;
    let newSet;
    if (Object.keys(SORTS).includes(currentKey))
      newSet = [currentKey, Object.keys(SORTS[currentKey])[0]];
    else newSet = [[...selectedKeys][0], currentKey];
    setSelectedKeys(new Set(newSet));
    onSortChange(SORTS[newSet[0]][newSet[1]]);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          variant="solid"
          className="font-bold hover:shadow-lg hover:shadow-primary-500/50"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Dropdown menu with description"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={handleChange}
        closeOnSelect={false}
      >
        <DropdownSection title="Sort by:" showDivider>
          <DropdownItem key="Price">Price</DropdownItem>
          <DropdownItem key="Name">Name</DropdownItem>
          <DropdownItem key="Date">Date</DropdownItem>
        </DropdownSection>
        {isPriceSelected && (
          <DropdownSection title="Price on top:">
            <DropdownItem key="Low" color="danger">
              Low
            </DropdownItem>
            <DropdownItem key="High" color="success">
              High
            </DropdownItem>
          </DropdownSection>
        )}
        {isNameSelected && (
          <DropdownSection title="Name Order:">
            <DropdownItem key="A-Z" color="success">
              A-Z
            </DropdownItem>
            <DropdownItem key="Z-A" color="danger">
              Z-A
            </DropdownItem>
          </DropdownSection>
        )}
        {isDateSelected && (
          <DropdownSection title="Date on top:">
            <DropdownItem key="Newest" color="success">
              Newest
            </DropdownItem>
            <DropdownItem key="Oldest" color="danger">
              Oldest
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
