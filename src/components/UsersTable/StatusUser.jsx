import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/utils/api";

const StatusUser = ({ status, id, allItems, setAllItems }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState(status);
  const [isLoading, setIsLoading] = React.useState(false);
  const statusColorMap = {
    true: "primary",
    false: "success",
  };

  const handleStatus = async (key) => {
    try {
      setIsLoading(true);
      await updateUser(id, { isAdmin: key });
      setIsLoading(false);
      setSelectedKeys(key);
      const newData = allItems.map((e) => (e.id === id ? { ...e, isAdmin: key } : e));
      setAllItems(newData);
      router.refresh();
    } catch (error) {
      setSelectedKeys(selectedKeys);
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Button
      className="capitalize"
      color={statusColorMap[selectedKeys]}
      size="sm"
      isLoading={isLoading}
      onPress={() => handleStatus(!selectedKeys)}
    >
      {selectedKeys === true ? "Admin" : "User"}
    </Button>
  );
};
export default StatusUser;
