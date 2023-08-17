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

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: props.name,
    description: props.description,
    price: props.price,
    stock: props.stock,
    image: props.imag,
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    let newErrors = { ...errors };
    newErrors[name] = "";

    if (!Object.values(newErrors).some((error) => error !== "")) {
      setButtonDisabled(false);
    }

    switch (name) {
      case "name":
        if (value.length === 0) {
          newErrors.name = "Nombre requerido";
          setButtonDisabled(true);
        } else if (value.length > 40) {
          newErrors.name = "Nombre no puede tener más de 50 caracteres";
          setButtonDisabled(true);
        } else {
          newErrors.name = "";
          setButtonDisabled(false);
        }
        break;
      case "description":
        if (value.length === 0) {
          newErrors.description = "Descripción requerida";
          setButtonDisabled(true);
        } else {
          newErrors.description = "";
          setButtonDisabled(false);
        }
        break;
      case "stock":
        if (value.includes(".")) {
          newErrors.stock = "El stock debe ser un número entero";
          setButtonDisabled(true);
        } else {
          newErrors.stock = "";
          setButtonDisabled(false);
        }
        break;
      default:
        break;
    }

    setInput({ ...input, [name]: value });
    setErrors(newErrors);
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

              try {
                await api.put(`product/${props.id}`, formData);
                props.updateData();
                onClose();

                // Mostrar una alerta de éxito
                alert("Product edited successfully!");
              } catch (error) {
                console.error("Error editing product:", error);
                // Mostrar una alerta de error si ocurrió algún problema
                alert("An error occurred while editing the product.");
              }
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
                    isRequired
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                  <Input
                    label="Description"
                    value={input.description}
                    variant="bordered"
                    name="description"
                    onChange={handleChange}
                    isRequired
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description}</p>
                  )}
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
                  {errors.stock && (
                    <p className="text-danger">{errors.stock}</p>
                  )}
                  <input
                    //label="Image"
                    type="file"
                    accept="image/*"
                    variant="bordered"
                    name="image"
                    onChange={handleImage}
                  />
                  <div className="flex justify-center">
                    <img
                      width={150}
                      height={150}
                      alt={input?.name}
                      src={input.image}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmit}
                    isDisabled={buttonDisabled}
                  >
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
