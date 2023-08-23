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
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Sort by:"]));
  const [disabledKeys, setDisabledKeys] = useState([]);

  const price = "Price";
  const name = "Name";
  const high = "High";
  const low = "Low";
  const z_a = "Z-A";
  const a_z = "A-Z";

  const isPriceSelected = selectedKeys.has(price);
  const isNameSelected = selectedKeys.has(name);
  const isHighSelected = selectedKeys.has(high);
  const isLowSelected = selectedKeys.has(low);
  const isAzSelected = selectedKeys.has(a_z);
  const isZaSelected = selectedKeys.has(z_a);

  useMemo(() => {
    if (isPriceSelected) {
      setDisabledKeys([name]);
    } else if (isNameSelected) {
      setDisabledKeys([price]);
    } else {
      setDisabledKeys([]);
    }
  }, [isPriceSelected, isNameSelected]);

  useMemo(() => {
    if (isHighSelected) {
      setDisabledKeys((prevDisabledKeys) => [
        ...prevDisabledKeys,
        low,
        name,
        price,
      ]);
    } else if (isLowSelected) {
      setDisabledKeys((prevDisabledKeys) => [
        ...prevDisabledKeys,
        high,
        name,
        price,
      ]);
    } else {
      setDisabledKeys((prevDisabledKeys) =>
        prevDisabledKeys.filter(
          (key) => key !== high && key !== low && key !== price
        )
      );
    }
  }, [isHighSelected, isLowSelected]);

  useMemo(() => {
    if (isAzSelected) {
      setDisabledKeys((prevDisabledKeys) => [
        ...prevDisabledKeys,
        z_a,
        price,
        name,
      ]);
    } else if (isZaSelected) {
      setDisabledKeys((prevDisabledKeys) => [
        ...prevDisabledKeys,
        a_z,
        price,
        name,
      ]);
    } else {
      setDisabledKeys((prevDisabledKeys) =>
        prevDisabledKeys.filter(
          (key) => key !== a_z && key !== z_a && key !== name
        )
      );
    }
  }, [isAzSelected, isZaSelected]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(" ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSortChange = (sortType) => {
    onSortChange(sortType);
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
        disabledKeys={disabledKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
        closeOnSelect={false}
      >
        <DropdownSection title="Sort by:" showDivider>
          <DropdownItem key="Price">Price</DropdownItem>
          <DropdownItem key="Name">Name</DropdownItem>
        </DropdownSection>
        {isPriceSelected && (
          <DropdownSection title="Price Order:">
            <DropdownItem
              key="High"
              color="success"
              onPress={() => handleSortChange("priceDesc")}
            >
              High
            </DropdownItem>
            <DropdownItem
              key="Low"
              color="danger"
              onPress={() => handleSortChange("priceAsc")}
            >
              Low
            </DropdownItem>
          </DropdownSection>
        )}
        {isNameSelected && (
          <DropdownSection title="Name Order:">
            <DropdownItem
              key="A-Z"
              color="success"
              onPress={() => handleSortChange("nameAsc")}
            >
              A-Z
            </DropdownItem>
            <DropdownItem
              key="Z-A"
              color="danger"
              onPress={() => handleSortChange("nameDesc")}
            >
              Z-A
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
