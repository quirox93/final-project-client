"use_client";

import api from "@/utils/axios";
import { Button } from "@nextui-org/react";

export default function DeleteButton({ id, updateData, cb }) {
  const handleDelete = async (id) => {
    const { data } = await api.delete(`product/${id}`);
    updateData();
    cb();
  };

  return (
    <Button
      size="sm"
      variant="flat"
      className=" text-1xs font-bold "
      color="danger"
      onClick={() => handleDelete(id)}
    >
      Delete
    </Button>
  );
}
