"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";

const FilterModal = ({ cb }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [stock, setStock] = useState("1");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <>
      <Button className=" font-bold" onPress={onOpen} color="primary">
        Filter
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => {
            const handleApply = () => {
              cb({ stock, min, max });
              onClose();
            };
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
                <ModalBody>
                  <RadioGroup
                    value={stock}
                    onValueChange={setStock}
                    label="Stock"
                    orientation="horizontal"
                  >
                    <Radio value="1">With stock</Radio>
                    <Radio value="0">Without stock</Radio>
                    <Radio value="">All</Radio>
                  </RadioGroup>
                  <Divider orientation="horizontal" />
                  <h3 className="text-default-500 text-medium">Price</h3>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="number"
                      size="sm"
                      placeholder="0.00"
                      value={min}
                      onValueChange={setMin}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      label="Mininum"
                    />
                    _
                    <Input
                      type="number"
                      size="sm"
                      placeholder="0.00"
                      value={max}
                      onValueChange={setMax}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      label="Maximum"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleApply}>
                    Apply
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;
