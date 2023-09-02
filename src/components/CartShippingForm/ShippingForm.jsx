"use client"
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, useDisclosure, Button, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { newOrder } from "@/utils/api";
import { useRouter } from "next/navigation";
import { getUserById } from "@/utils/api";


const userInitailLoad =  async(userId)  =>{
  const {clerkData} = await getUserById(userId)
  const userData = {
    firstName: clerkData.firstName,
    lastName: clerkData.lastName,
    email: clerkData.emailAddresses[0].emailAddress
    
  } 
  return userData
}


const validateField = (fieldName, value) => {
  const validators = {
    firstName: {
      validate: (value) => /^[A-Za-z\s]{1,25}$/.test(value),
      message: "Only characters are accepted.",
    },
    lastName: {
      validate: (value) => /^[A-Za-z\s]{1,25}$/.test(value),
      message: "Only characters are accepted.",
    },
    email: {
      validate: (value) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
      message: "Email not valid.",
    },
    postalCode: {
      validate: (value) => /^\d{1,10}$/.test(value),
      message: "Postal code value execed limite max(10).",
    },
    phoneNumber: {
      validate: (value) => /(\(?\d{3}\)?[- .]?\d{4}[- .]?\d\d\d\d)|(\(?\d{4}\)?[- .]?\d{3}[- .]?\d\d\d\d)|(\(?\d{5}\)?[- .]?\d{2}[- .]?\d\d\d\d)/.test(value), 
      message: "Phone number not valid.",
    },
  };

  if (fieldName in validators) {
    const { validate, message } = validators[fieldName];
    return validate(value) ? "" : message;
  }

  return "";
};



const ShippingForm =  ({ userId, cartItems }) => {
  
  
  const [loading, setLoading] = useState()
  
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
  
   

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    street:"",
    number:"",
    phoneNumber: "",
    postalCode: "",
    email: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    street:"",
    number:"",
    phoneNumber: "",
    postalCode: "",
    email: ""
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    const errorMessage = validateField(name, value);
  
    setShippingData({ ...shippingData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };
  
  useEffect(() => {
    
    const loadInitialData = async () => {
      try {
        const initialData = await userInitailLoad(userId);
        setShippingData((prevData) => ({
          ...prevData,
          ...initialData,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen, userId]);
  
  return (
    <>
      <Button className="font-bold" color="primary" onPress={onOpen}>
        Finalizar Compra
      </Button>
      <Modal isOpen={isOpen} placement="mid-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            const handleSubmit = async () => {
              setLoading(true)
              try {
                const items = cartItems.map(item => ({
                  id: item.id,
                  quantity: item.quantity,
                  unit_price: item.price                
                }))
                const payer = {
                  clerkId: userId,
                  name: shippingData.firstName.trim() + " " + shippingData.lastName.trim(),
                  email: shippingData.email,
                  address: shippingData.street.trim() + " " + shippingData.number.trim(),
                  cp: shippingData.postalCode,
                  phone: shippingData.phoneNumber
                }
                
                const response = await newOrder(items,payer)          
                router.push(response.paymentURL)
                setLoading(false) 
                onClose()
              } catch (error) {
                console.log(error)
                setLoading(false)
                onClose()
              }  
            };
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">Shipping Information</ModalHeader>
                <ModalBody> 
                  <Input
                    autoFocus
                    label="First Name"
                    value={shippingData.firstName}
                    variant="bordered"
                    name="firstName"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                  <Input
                    label="Last Name"
                    value={shippingData.lastName}
                    variant="bordered"
                    name="lastName"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                  <Input
                    label="E-Mail"
                    value={shippingData.email}
                    variant="bordered"
                    name="email"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                  <Input
                    label="Address (Street)"
                    value={shippingData.street}
                    variant="bordered"
                    name="street"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.street && <p className="text-danger">{errors.street}</p>}
                  <Input
                    label="Address (Number)"
                    value={shippingData.number}
                    variant="bordered"
                    name="number"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.number && <p className="text-danger">{errors.number}</p>}
                  <Input
                    label="Phone Number"
                    value={shippingData.phoneNumber}
                    variant="bordered"
                    name="phoneNumber"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                  <Input
                    label="Postal Code"
                    value={shippingData.postalCode}
                    variant="bordered"
                    name="postalCode"
                    onChange={handleInputChange}
                    isRequired
                  />
                  {errors.postalCode && <p className="text-danger">{errors.postalCode}</p>}
                
                </ModalBody>
                <ModalFooter className="flex justify-center">
                  <Button
                    color="primary"
                    radius="full"
                    size="lg"
                    isLoading={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShippingForm;
