import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { PostAttributes } from "src/interfaces/post.interface";
import styles from "./PostsList.style";

const PostsList = () =>
  // posts: PostAttributes[]
  {
    const title = "Pasta Alio Olio";
    const reviews = "2.5k";
    const avgRating = "4.5";
    const user = "Mac Miller";

    const createPost = () =>
      // post: PostAttributes
      {
        return (
          <Box sx={styles.post}>
            <CardMedia
              component="img"
              sx={styles.postImage}
              image="/public/recipe-default.png"
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
                  {`${avgRating} | ${reviews} Reviews`}
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {user}
              </Typography>
            </CardContent>
          </Box>
        );
      };
    return (
      <Box sx={styles.root}>
        {/* {posts?.map((post) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))} */}
        {createPost()}
        {createPost()}
      </Box>
    );
  };

export default PostsList;
