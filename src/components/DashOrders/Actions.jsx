import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { LuEdit } from "react-icons/lu";

import { AiOutlineDelete } from "react-icons/ai";
import { VerticalDotsIcon } from "@/components/AdminProducts/VerticalDotsIcon";
import { BiDetail } from "react-icons/bi";
import DetailOrder from "./DetailOrder";

function Actions() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown className="bg-background border-1 border-default-200">
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm" variant="flat">
          <VerticalDotsIcon className="text-default-400" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
      variant="faded" 
      aria-label="Dropdown menu with description"
      closeOnSelect={false}
      >
        <DropdownSection title="Actions" showDivider>
          
          <DropdownItem
            key="detail"
            shortcut="⌘⇧D"
            description="Allows you to view the order."
            startContent={<BiDetail className={iconClasses} />}
            
          >
            View Order
          </DropdownItem>
          <DropdownItem
            key="edit"
            shortcut="⌘⇧E"
            description="Allows you to edit the order."
            startContent={<LuEdit className={iconClasses} />}
          >
            Edit Order
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            shortcut="⌘⇧S"
            description="Permanently delete the order"
            startContent={
              <AiOutlineDelete className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete Order
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
export default Actions;
