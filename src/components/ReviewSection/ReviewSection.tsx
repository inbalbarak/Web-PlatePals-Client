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
import { CommentAttributes } from "src/interfaces/comment.interface";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import usersService from "services/users.service";

interface ReviewSectionProps {
  postId: string;
  addComment: (
    comment: CommentAttributes,
    updatedAverageRating: number
  ) => void;
}

const ReviewSection: FC<ReviewSectionProps> = ({ postId, addComment }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const { data: user } = useQuery(
    QUERY_KEYS.USER,
    async () => {
      const user = await usersService.getById(
        localStorage.getItem(USER_ID) ?? ""
      );

      return user;
    },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const submitReview = () => {
    if (user?._id && (review || rating)) {
      commentsService
        .create({
          postId,
          content: review,
          author: user._id,
          ...(rating && { rating }),
        })
        .then(({ comment, updatedAverageRating }) => {
          addComment(
            {
              ...comment,
              author: {
                username: user.username,
                ...(user.imageUrl && { imageUrl: user.imageUrl }),
              },
            },
            updatedAverageRating
          );
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
