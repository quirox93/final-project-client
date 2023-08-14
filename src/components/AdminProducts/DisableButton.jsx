"use_client";

import api from "@/utils/axios";
import { Button } from "@nextui-org/react";

export default function DisableButton({ id, enabled, updateData, cb }) {
  const handleDisable = async () => {
    const formData = new FormData();
    formData.append("enabled", !enabled);
    await api.put(`product/${id}`, formData);
    updateData();
    cb();
  };

  return (
    <Button
      size="sm"
      variant="flat"
      className=" text-1xs font-bold"
      color="warning"
      onClick={() => handleDisable()}
    >
      {enabled ? "Disable" : "Enable"}
    </Button>
  );
}
