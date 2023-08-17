"use_client";

import api from "@/utils/axios";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function DeleteButton({ id, data, setData, cb }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await api.delete(`product/${id}`);
      setData(data.filter((e) => e._id !== id));
      cb();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <Button
      size="sm"
      variant="flat"
      className=" text-1xs font-bold "
      color="danger"
      onClick={() => handleDelete(id)}
      isLoading={isLoading}
    >
      Delete
    </Button>
  );
}
