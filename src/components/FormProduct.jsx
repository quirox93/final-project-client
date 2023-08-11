"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@nextui-org/react";

const inputStateInitial = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
};

// para validaciones real time
const errrosStateInitial = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
};

function FormProduct() {
  const [input, setInput] = useState(inputStateInitial);
  const [image, setImage] = useState(null);
  const [created, setCreated] = useState(false);
  const [errors, setErrors] = useState(errrosStateInitial);

  // cambio en el input
  function handleInputChange(event) {
    if (created === true) setCreated(false); // linea para reiniciar created
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }
  // carga de archivo a imagen
  function handleOnChange(event) {
    if (created === true) setCreated(false); // linea para reiniciar created
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };
    // para multicarga
    // reader.readAsDataURL(event.target.files);
    reader.readAsDataURL(event.target.files[0]);
  }

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("stock", input.stock);
    formData.append("imag", image);

    try {
      await axios.post("api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCreated(true);
      setInput(inputStateInitial);
      setImage(null);
    } catch (error) {
      console.error("Error Message:", error);
    }
  };

  return (
    <div>
      <div>
        {created && <h1 className="flex justify-center font-bold">Producto Creado</h1>}
        {!created && (
          <h1 className="flex justify-center font-bold">Fomulario de Nuevo Producto :</h1>
        )}
      </div>
      <form
        autoComplete="off"
        className="max-w-md mx-auto p-4 border rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block font-bold mb-1">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={input.name}
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Description:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={input.description}
            name="description"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Price:</label>
          <input
            type="number"
            className="w-20 p-2 border rounded-md"
            value={input.price}
            name="price"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">Stock:</label>
          <input
            type="number"
            className="w-20 p-2 border rounded-md"
            value={input.stock}
            name="stock"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-md"
            value={input.image}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex justify-center">
          {image && <Image width={150} height={150} alt={input?.name} src={image} />}
        </div>
        <div className="flex justify-center">
          <div>
            <Button color="primary" radius="full" size="lg" type="submit" className="font-bold">
              Submit
            </Button>
            <div></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;
