"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import api from "@/utils/axios";

export default function EditButton(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: props.name,
    description: props.description,
    price: props.price,
    stock: props.stock,
    image: props.imag,
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [property]: value });
  };
  function handleImage(event) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
      setInput({ ...input, image: onLoadEvent.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  return (
    <>
      <Button
        className=" text-1xs font-bold"
        color="success"
        onPress={onOpen}
        size="sm"
        variant="flat"
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => {
            const handleSubmit = async () => {
              console.log(props.id);

              const formData = new FormData();
              formData.append("name", input.name);
              formData.append("description", input.description);
              formData.append("price", input.price);
              formData.append("stock", input.stock);
              formData.append("imag", image);

              await api.put(`product/${props.id}`, formData);
              props.updateData();
              onClose();
            };
            return (
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

                  <input
                    //label="Image"
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    name="image"
                    onChange={handleImage}
                  />
                  <div className="flex justify-center">
                    <img width={150} height={150} alt={input?.name} src={input.image} />
                  </div>
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
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
