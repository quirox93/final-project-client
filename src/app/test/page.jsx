"use client";
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";


export default function Edit(props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [input, setInput] = useState({
    name:props.name,
    description:props.description,
    price:props.price,
    stock:props.stock,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [property]: value });
  };

  const handleSubmit = async () => {
    console.log(props.id)
    //await axios.put(`api/product/${props.id}`, formData,)
    onClose()
  }
  return (
    <>
      <Button onPress={onOpen} color="primary">EDIT</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  value={input.name}
                  variant="bordered"
                  name="name"
                  onChange={handleChange}
                />
                <Input
                  label="Description"
                  value={input.description}
                  variant="bordered"
                  name="description"
                  onChange={handleChange}
                />
                <Input
                  label="Price"
                  type="number"
                  value={input.price}
                  variant="bordered"
                  name="price"
                  onChange={handleChange}
                />
                <Input
                label="Stock"
                type="number"
                value={input.stock}
                variant="bordered"
                name="stock"
                onChange={handleChange}
              />
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
