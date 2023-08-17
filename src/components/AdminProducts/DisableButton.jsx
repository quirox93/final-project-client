"use_client";

import api from "@/utils/axios";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function DisableButton({ id, enabled, setData, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDisable = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("enabled", !enabled);
      const { data: product } = await api.put(`product/${id}`, formData);
      setData(data.map((e) => (e._id === id ? product : e)));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Button
      size="sm"
      variant="flat"
      className=" text-1xs font-bold"
      color="warning"
      isLoading={isLoading}
      onClick={() => handleDisable()}
    >
      {enabled ? "Disable" : "Enable"}
    </Button>
  );
}
