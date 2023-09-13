"use client";
import { useState } from "react";
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
import api from "@/utils/axios";
import { useRouter } from "next/navigation";

const inputStateInitial = {
  name: "",
  description: "",
  price: "1",
  stock: "1",
};

const errorsStateInitial = {
  name: "Name required",
  description: "Description required",
  price: "",
  stock: "",
};

export default function FormNewProduct({ data, setData }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [input, setInput] = useState(inputStateInitial);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(errorsStateInitial);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

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
  }

  function handleImage(event) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };

    try {
      reader.readAsDataURL(event.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button className="font-bold" color="primary" onPress={onOpen}>
        Add Product
      </Button>
      <Modal
        className=" max-h-[95vh] h-fit w-90 max-w-[100%] overflow-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="mid-center"
      >
        <ModalContent>
          {(onClose) => {
            const handleSubmit = async () => {
              try {
                if (!Object.values(errors).some((error) => error !== "")) {
                  setLoading(true);
                  const formData = new FormData();
                  formData.append("name", input.name);
                  formData.append("description", input.description);
                  formData.append("price", input.price);
                  formData.append("stock", input.stock);
                  formData.append("imag", image);
                  const { data: product } = await api.post(
                    "/product",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  alert("Producto Creado!");
                  setData([...data, product]);
                  setInput(inputStateInitial);
                  setErrors(errorsStateInitial);
                  setImage(null);
                  setLoading(false);
                  router.refresh();
                  onClose();
                }
              } catch (error) {
                if (error.response.status === 409) {
                  alert("Error: product name exist.");
                } else alert("Error adding product.");
                setInput(inputStateInitial);
                setErrors(errorsStateInitial);
                setLoading(false);
              }
            };
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Product
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    value={input.name}
                    variant="bordered"
                    name="name"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                  <Textarea
                    label="Description"
                    minRows={0}
                    value={input.description}
                    variant="bordered"
                    name="description"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    isRequired
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
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.stock && (
                    <p className="text-danger">{errors.stock}</p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImage}
                  />
                  <div className="flex justify-center">
                    {image && (
                      <Image
                        width={150}
                        height={150}
                        alt={input?.name}
                        src={image}
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    radius="full"
                    size="lg"
                    onClick={onClose} // Cerrar el modal
                  >
                    Close
                  </Button>
                  <Button
                    isLoading={loading}
                    isDisabled={buttonDisabled}
                    color="primary"
                    radius="full"
                    size="lg"
                    type="submit"
                    className="font-bold"
                    onPress={handleSubmit}
                  >
                    Submit
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
