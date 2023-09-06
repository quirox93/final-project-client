import { Accordion, AccordionItem } from "@nextui-org/react";
import { rate } from "../PurchasedModalReview/utils";
import StarRatings from "react-star-ratings";

const ReviewsDetail = ({ reviews }) => {
  

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Reviews:</h1>
    <Accordion variant="shadow">
      {reviews.map((review, index) => (
        <AccordionItem
          key={index}
          aria-label={`Reviews ${index}`}
          title={
            <span
              className={
                rate[review.score] ? rate[review.score][1] : "text-primary-500"
              }
            >
              {rate[review.score] ? rate[review.score][0] : ""}
            </span>
          }
          subtitle={<StarRatings
            starRatedColor="#ffb829"
            rating={review.score}
            numberOfStars={5}
            starDimension="15px"
            starSpacing="2px"
            name="rating"
          />}
        >
          <p>{review.message}</p>
        </AccordionItem>
      ))}
    </Accordion>
    </div>
  );
};

export default ReviewsDetail;
