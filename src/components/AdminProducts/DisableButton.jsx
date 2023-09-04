"use_client";

import { bulkUpdateProduct, updateProduct } from "@/utils/api";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const revalidate = 0;
export default function DisableButton({ id, enabled, setData, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDisable = async () => {
    try {
      setIsLoading(true);
      if (typeof id === "object") {
        enabled = !enabled;
        await bulkUpdateProduct(id, { enabled });
        setData(data.map((e) => (id.includes(e._id) ? { ...e, enabled } : e)));
        setIsLoading(false);
        router.refresh();
        return;
      }

      const formData = new FormData();
      formData.append("enabled", !enabled);
      const product = await updateProduct(id, formData);
      setData(data.map((e) => (e._id === id ? product : e)));
      setIsLoading(false);
      router.refresh();
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
