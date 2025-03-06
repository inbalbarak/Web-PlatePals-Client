import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { PostAttributes } from "src/interfaces/post.interface";
import styles from "./PostsList.style";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "constants/routes";

interface PostsListProps {
  posts: PostAttributes[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  const navigate = useNavigate();

  const createPost = (post: PostAttributes) => {
    const { title, ratingCount, averageRating, author, imageUrl } = post;

    // TODO get recipe image from post
    return (
      <Box
        key={post._id}
        sx={styles.post}
        onClick={() => {
          navigate(`${PATHS.RECIPE}/${post._id}`);
        }}
      >
        <CardMedia
          component="img"
          sx={styles.postImage}
          image={imageUrl ?? "/recipe-default.png"}
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
            sx={styles.postAuthorText}
            variant="subtitle1"
            component="div"
          >
            {author.username}
          </Typography>
        </CardContent>
      </Box>
    );
  };

  return <Box sx={styles.root}>{posts?.map((post) => createPost(post))}</Box>;
};

export default PostsList;
