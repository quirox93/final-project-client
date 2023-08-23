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
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Date", "Recent"]));

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
      Recent: "dateAsc",
      Old: "dateDesc"
    }
  };
  const isDateSelected = selectedKeys.has("Date");
  const isPriceSelected = selectedKeys.has("Price");
  const isNameSelected = selectedKeys.has("Name");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(" ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleChange = ({ currentKey }) => {
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
            <DropdownItem key="High" color="success">
              High
            </DropdownItem>
            <DropdownItem key="Low" color="danger">
              Low
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
          <DropdownSection title="Date:">
            <DropdownItem key="Recent" color="success">
              Recent
            </DropdownItem>
            <DropdownItem key="Old" color="danger">
              Old
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
