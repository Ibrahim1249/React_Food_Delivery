import Rating from "@mui/material/Rating";
export default function SingleReview({review}) {
  return (
    <>
      <div className="single-review-container">
        <div className="review">
          <div className="userDetails">
            <img src={review.userProfileImage} alt="" />
            <p>{review.userName}</p>
          </div>
          <div className="rating">
            <Rating value={review.rating} />
          </div>
        </div>
        <div className="date">
        <p>{review.date}</p>
        </div>
        <div className="userReview">
            <p>
              {review.reviewText}
            </p>
          </div>
      </div>
    </>
  );
}
