"use_client";

import { prodBulkDelete, prodDelete } from "@/utils/api";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id, data, setData, cb }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      if (typeof id === "object") {
        await prodBulkDelete(id);
        setData(data.filter((e) => !id.includes(e._id)));
        setIsLoading(false);
        cb(new Set([]));
        router.refresh();
        return;
      }
      await prodDelete(id);
      setData(data.filter((e) => e._id !== id));
      cb(new Set([]));
      setIsLoading(false);
      router.refresh();
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
