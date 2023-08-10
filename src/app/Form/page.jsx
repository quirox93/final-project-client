"use client"
import React, { useState } from 'react';
import Image from "next/image"
import axios from 'axios';

function Form() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  

  
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
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('imag', image);
    
    try {
      const response = await axios.post('https://restapicrud.ericksegura5.repl.co/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); 
      
      setName('');
      setDescription('');
      setPrice(0);
      setStock(0);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 border rounded-md shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block font-bold mb-1">Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Description:</label>
        <textarea
          className="w-full p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Price:</label>
        <input
          type="number"
          className="w-20 p-2 border rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Stock:</label>
        <input
          type="number"
          className="w-20 p-2 border rounded-md"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
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
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 px-6 rounded-full border-2 border-blue-500 hover:border-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
      {image && <Image width={150} height={150}  src={image} />}
    </form>
  );
}

export default Form;
