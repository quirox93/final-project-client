"use client";
import { useState, useEffect } from "react";
import { addReview } from "@/utils/api";
import StarRatings from "react-star-ratings";
import { rate } from "./utils";
import { useRouter } from "next/navigation";
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

const PurchasedModalReview = ({ clerkId, itemId, itemReviews, updateReview }) => {
  const existingReview = itemReviews.find((review) => review.clerkId === clerkId) ?? {
    score: 0,
    message: "",
  };


  const [rating, setRating] = useState(existingReview.score);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(existingReview.message);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

 useEffect(() => {  
   setRating(existingReview.score)
   setDescription(existingReview.message)
 }, [existingReview.score, existingReview.message])

  const handleSendReview = async () => {
    const reviewData = {
      clerkId,
      score: rating,
      message: description,
    };

    try {
      setIsLoading(true);
      const response = await addReview(itemId, reviewData);
      updateReview(clerkId, rating, description);
      router.refresh();
      setRating(reviewData.score);
      setDescription(reviewData.message);
      console.log("Review sent:", response);

      setIsLoading(false);
      onOpenChange(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending review:", error);
      alert(error.message);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };
  
  return (
    <>
      <Button
        className="border-3 rounded-2xl bg-primary text-white"
        size="small"
        variant="text"
        onPress={onOpen}
      >
        {existingReview.score ? "Update" : "Review"}
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
              <ModalHeader className="flex flex-col gap-1">Your Review</ModalHeader>
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
                  <span className={rate[rating] ? rate[rating][1] : "text-primary-500"}>
                    {rate[rating] ? rate[rating][0] : ""}
                  </span>
                </div>

                <Textarea
                  label="Description (optional)"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="max-w-lg"
                  onValueChange={handleDescriptionChange}
                  value={description}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSendReview} isLoading={isLoading}>
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
