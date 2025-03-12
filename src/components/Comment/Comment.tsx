import { FC, useState } from "react";
import styles from "./Comment.style";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Create as CreateIcon } from "@mui/icons-material";
import commentsService from "services/comments.service";
import { USER_ID } from "constants/localStorage";
import { CommentAttributes } from "src/interfaces/comment.interface";
import { convertISODateToString } from "utils/dates";

interface CommentProps {
  comment: CommentAttributes;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const { author, content, rating, createdAt } = comment;

  return (
    <Card sx={styles.root}>
      <CardHeader
        avatar={<Avatar src={author.imageUrl} />}
        action={<Rating name="read-only" value={rating} readOnly />}
        title={`${author.username}`}
        subheader={convertISODateToString(createdAt)}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
