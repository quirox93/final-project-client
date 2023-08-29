"use client";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

const PurchasedModalReview = () => {
  const [rating, setRating] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const rate = {
    1: ["Poor", "text-danger-500"],
    2: ["Average", "text-orange-500"],
    3: ["Good", "text-green-500"],
    4: ["Very good", "text-success"],
    5: ["Excellent", "text-yellow-500"],
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <Button
        className="border-3 rounded-2xl bg-primary text-white"
        size="small"
        variant="text"
        onPress={onOpen}
      >
        Review
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="mid-center"
        size="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your Review
              </ModalHeader>
              <ModalBody>
                <p>How would you rate this product?</p>
                <div className="flex flex-wrap items-center space-x-2 mb-2">
                  <StarRatings
                    starRatedColor="#ffb829"
                    starHoverColor="#ffb829"
                    isSelectable={true}
                    rating={rating}
                    changeRating={handleRatingChange}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                  <span
                    className={
                      rate[rating] ? rate[rating][1] : "text-primary-500"
                    }
                  >
                    {rate[rating] ? rate[rating][0] : ""}
                  </span>
                </div>

                <Textarea
                  label="Description (optional)"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="max-w-lg"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PurchasedModalReview;
