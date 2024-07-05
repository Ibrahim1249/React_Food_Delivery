import React, { useState } from 'react';
import ReviewForm from "../../Components/ReviewForm"
function Reviews() {
    const [reviews, setReviews] = useState([]);

    const handleSubmitReview = (newReview) => {
      setReviews([...reviews, newReview]);
    };
  return (
    <div className="reviews-page">
      <ReviewForm/>
  </div>
  )
}

export default Reviews