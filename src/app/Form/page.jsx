"use client"
import React, { useState } from 'react';
import Image from "next/image"
import axios from 'axios';

const inputStateInitial = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
}

function Form() {
  const [input, setInput] = useState(inputStateInitial);
  const [image, setImage] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  }

  function handleOnChange(event) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('price', input.price);
    formData.append('stock', input.stock);
    formData.append('imag', input.image);
    
    try {
      const response = await axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); 
      
      setInput(inputStateInitial);
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form autoComplete='off' className="max-w-md mx-auto p-4 border rounded-md shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-bold mb-1">Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={input.name}
          name="name"
          onChange={handleInputChange}
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
          onChange={handleOnChange}
        />
      </div>
      <div className="flex justify-center">
        {image && <Image width={150} height={150} src={image} />}
      </div>
      <div className="flex justify-center">
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-6 rounded-full border-2 border-blue-500 hover:border-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
