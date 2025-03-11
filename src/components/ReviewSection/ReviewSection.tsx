import { FC, useState } from "react";
import styles from "./ReviewSection.style";
import {
  Box,
  Button,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Create as CreateIcon } from "@mui/icons-material";
import commentsService from "services/comments.service";
import { USER_ID } from "constants/localStorage";

interface ReviewSectionProps {
  postId: string;
}

const ReviewSection: FC<ReviewSectionProps> = ({ postId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = () => {
    const id = localStorage.getItem(USER_ID);
    if (id && (review || rating)) {
      commentsService
        .create({
          postId,
          content: review,
          rating: rating,
          author: id,
        })
        .then(() => {
          setReview("");
          setRating(0);
        });
    }
  };

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        What do you think about the recipe?
      </Typography>
      <Rating
        value={rating}
        onChange={(_, newValue) => {
          newValue && setRating(newValue);
        }}
      />
      <TextField
        sx={styles.reviewInput}
        variant="outlined"
        multiline
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CreateIcon sx={styles.reviewInputIcon} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={styles.submitButton}
        variant="contained"
        onClick={submitReview}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ReviewSection;
