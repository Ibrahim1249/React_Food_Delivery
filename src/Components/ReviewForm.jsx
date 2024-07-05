import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useState , useEffect} from "react";
import { dummyReviews } from "../assets/assets";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import userprofile from "../assets/userProfile.png";
import SingleReview from "./SingleReview";

function ReviewForm() {
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [userReview, setUserReview] = useState("");
  const { user } = useSelector((state) => {
    return state.authReducer;
  });
  
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('userReviews');
    return savedReviews ? JSON.parse(savedReviews) : dummyReviews;
  });

  useEffect(() => {
    localStorage.setItem('userReviews', JSON.stringify(reviews));
  }, [reviews]);
   
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      toast.error("Please Login to write Review!");
      return;
    } else {
      setReviews([
        {
          userProfileImage: userprofile,
          userName: user?.displayName,
          date: getCurrentDate(),
          rating: value,
          reviewText: userReview,
        },
        ...reviews,
      ]);
      setValue(3);
      setUserReview("");
    }
  }

  return (
    <>
      <div className="review-container">
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>

        <div className="review-form">
          <form onSubmit={handleSubmit}>
            <textarea
              value={userReview}
              placeholder="Write Your Review ....."
              onChange={(e) => {
                setUserReview(e.target.value);
              }}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="review-output-container">
          {reviews &&
            reviews.map((review, index) => {
              return <SingleReview key={index} review={review} />;
            })}
        </div>
      </div>
    </>
  );
}

export default ReviewForm;
