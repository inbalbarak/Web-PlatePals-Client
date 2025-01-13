import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { PostAttributes } from "src/interfaces/post.interface";

const PostsList = () =>
  // posts: PostAttributes[]
  {
    const createPost = () =>
      // post: PostAttributes
      {
        return (
          <Box sx={{ display: "flex", width: "90%" }}>
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image="/static/images/cards/live-from-space.jpg"
            />
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <CardContent>
                <Typography component="div" variant="h6">
                  Pasta Alio Olio
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  2.5k reviews
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Mac Miller
                </Typography>
              </CardContent>
            </Box>
          </Box>
        );
      };
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
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
