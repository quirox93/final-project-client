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
  Textarea,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/utils/api";

export default function EditButton(props) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
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
    console.log({name, value})
    let newErrors = { ...errors };
    newErrors[name] = "";

    if (!Object.values(newErrors).some((error) => error !== "")) {
      setButtonDisabled(false);
    }

    switch (name) {
      case "name":
        if (value.length === 0) {
          newErrors.name = "Name required";
          setButtonDisabled(true);
        } else if (value.length > 60) {
          newErrors.name = "Name must be less than 60 chararcters";
          setButtonDisabled(true);
        } else {
          newErrors.name = "";
        }
        break;
      case "description":
        if (value.length === 0) {
          newErrors.description = "Description required";
          setButtonDisabled(true);
        } else {
          newErrors.description = "";
        }
        break;
      case "price":
        if (value.length === 0) {
          newErrors.price = "Price required";
          setButtonDisabled(true);
        } else if (value <= 0) {
          newErrors.price = "Price must be more than 0";
          setButtonDisabled(true);
        } else {
          newErrors.price = "";
        }
        break;
      case "stock":
        if (value.length === 0) {
          newErrors.stock = "Stock required";
          setButtonDisabled(true);
        } else if (value <= 0) {
          newErrors.stock = "Stock must be more than 0";
          setButtonDisabled(true);
        } else if (value.includes(".")) {
          newErrors.stock = "Stock must be whole number";
          setButtonDisabled(true);
        } else {
          newErrors.stock = "";
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
    if (!Object.values(errors).some((error) => error !== "")) {
      setButtonDisabled(false);
    }
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
      <Modal
        className=" max-h-[95vh] h-fit w-90 max-w-[100%] overflow-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => {
            const handleSubmit = async () => {
              const formData = new FormData();
              formData.append("name", input.name);
              formData.append("description", input.description);
              formData.append("price", input.price);
              formData.append("stock", input.stock);
              formData.append("imag", image);

              try {
                const data = await updateProduct(props.id, formData);
                console.log({data, props})

                const newData = props.data.map((e) =>
                  e._id === props.id ? data : e
                );
                props.setData(newData);
                router.refresh();
                onClose();
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
                  <Textarea
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
                  {errors.price && (
                    <p className="text-danger">{errors.price}</p>
                  )}
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
                  <div className="flex justify-center ">
                    <Image
                      showSkeleton={true}
                      disableSkeleton={false}
                      isZoomed
                      as={NextImage}
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
