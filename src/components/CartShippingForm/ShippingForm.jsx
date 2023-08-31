import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";

const ShippingForm = ({ userId }) => {
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    postalCode: "",
    email:""
  });

  const handleInputChange = (field, value) => {
    setShippingData({
      ...shippingData, [field]: value
    }

    );
  }

  const handleUpdate = () => {
    const payer = {
      clerkId: userId,
      name: shippingData.firstName.trim() + " " + shippingData.lastName.trim(),
      address: shippingData.address,
      email: shippingData.email,
      phone: shippingData.phoneNumber,
      cp: shippingData.postalCode,

    }
    return payer
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input
          className="input"
          type="text"
          placeholder="First Name"
          value={shippingData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        <Input
          className="input"
          type="text"
          placeholder="Last Name"
          value={shippingData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />

        <Input
          className="input"
          type="text"
          placeholder="E-Mail"
          value={shippingData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />

        <Input
          className="input"
          type="tel"
          placeholder="Phone Number"
          value={shippingData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />


        <Input
          className="input"
          type="text"
          placeholder="Address"
          value={shippingData.street}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />

        <Input
          className="input"
          type="text"
          placeholder="Postal Code"
          value={shippingData.postalCode}
          onChange={(e) => handleInputChange("postalCode", e.target.value)}
        />
      </div>
      <Button onPress={handleUpdate}>Update</Button>

    </div>
  );
};

export default ShippingForm;