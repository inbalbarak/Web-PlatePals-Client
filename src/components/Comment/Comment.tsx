import { FC } from "react";
import styles from "./Comment.style";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
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
        avatar={<Avatar src={author.imageUrl ?? "/recipe-default.png"} />}
        action={
          comment.rating !== undefined ? (
            <Rating name="read-only" value={rating} readOnly />
          ) : null
        }
        title={`${author.username}`}
        subheader={convertISODateToString(createdAt)}
      />
      <CardContent>
        <Typography variant="body2" sx={styles.content}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
