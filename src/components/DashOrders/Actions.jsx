import React from "react";
import { useDisclosure, Button } from "@nextui-org/react";
import DetailOrder from "./DetailOrder";
import { MdPageview } from "react-icons/md";

function Actions({ order }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Button
        isIconOnly
        className="bg-transparent text-lg text-primary-500 cursor-pointer active:opacity-50"
        aria-label="Like"
        onPress={() => onOpen(isOpen)}
      >
        <DetailOrder
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          order={order}
        />
        <MdPageview size={25} />
      </Button>
    </div>
  );
}
export default Actions;
