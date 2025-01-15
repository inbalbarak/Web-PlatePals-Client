import { Box, CardContent, CardMedia, List, Typography } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { PostAttributes } from "src/interfaces/post.interface";
import styles from "./PostsList.style";
import { FC } from "react";

interface PostsListProps {
  posts: PostAttributes[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  console.log("posts", posts);
  const createPost = (post: PostAttributes) => {
    const { title, ratingCount, averageRating, author } = post;

    return (
      <Box key={post._id} sx={styles.post}>
        <CardMedia
          component="img"
          sx={styles.postImage}
          // TODO query actual image
          image="/recipe-default.png"
        />
        <CardContent sx={styles.postContent}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Box sx={styles.postRatings}>
            <StarIcon sx={styles.postRatingIcon} />
            <Typography
              variant="subtitle2"
              component="div"
              sx={styles.postRatingText}
            >
              {`${averageRating} | ${ratingCount} Reviews`}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {author}
          </Typography>
        </CardContent>
      </Box>
    );
  };

  return <List sx={styles.root}>{posts?.map((post) => createPost(post))}</List>;
};

export default PostsList;
