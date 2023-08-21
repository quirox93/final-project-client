"use_client";

import api from "@/utils/api";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function DisableButton({ id, enabled, setData, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDisable = async () => {
    try {
      setIsLoading(true);
      if (typeof id === "object") {
        enabled = !enabled;
        await api.product.bulkUpdate(id, { enabled });
        setData(data.map((e) => (id.includes(e._id) ? { ...e, enabled } : e)));
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("enabled", !enabled);
      const product = await api.product.update(id, formData);
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
