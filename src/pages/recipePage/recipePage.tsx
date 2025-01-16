import { chunk } from "lodash";
import { useMemo } from "react";
import styles from "./recipePage.style";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import postsService from "services/posts.service";
import { Box, CardMedia } from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { convertISODateToString } from "utils/dates";
import RecipeSection from "components/RecipeSection";

const RecipePage = () => {
  const { data: posts } = useQuery(QUERY_KEYS.POSTS, postsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { id: postId } = useParams();

  const post = useMemo(() => {
    return posts?.find((post) => post._id === postId);
  }, [posts, postId]);

  if (!post) {
    return <></>;
  }

  const {
    title,
    tags,
    imageUrl,
    author,
    ingredients,
    instructions,
    averageRating,
    ratingCount,
    createdAt,
  } = post;

  return (
    <Box sx={styles.root}>
      <CardMedia
        component="img"
        sx={styles.recipeImage}
        image="/recipe-default.png"
      />
      <Box sx={styles.content}>
        <Box sx={styles.header}>
          <Box sx={styles.title}>{title}</Box>
          <Box sx={styles.rating}>
            <StarIcon sx={styles.ratingIcon} />
            {averageRating}
          </Box>
        </Box>
        <Box sx={styles.subHeader}>
          <Box sx={{ fontWeight: "600" }}>{author}</Box>
          {createdAt && <Box>{convertISODateToString(createdAt)}</Box>}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={styles.tagsBox}>
            {post?.tags?.length &&
              chunk(tags, 4).map((tagsArray, index) => (
                <Box sx={styles.tagsRow} key={index}>
                  {tagsArray.map((tag) => (
                    <Box key={tag} sx={styles.tag}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
        </Box>
        <Box sx={styles.contentSections}>
          <RecipeSection title="Ingredients" content={ingredients} />
          <RecipeSection title="Instructions" content={instructions} />
        </Box>
      </Box>
    </Box>
  );
};

export default RecipePage;
