import { chunk } from "lodash";
import { useEffect, useMemo, useState } from "react";
import styles from "./recipePage.style";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import postsService from "services/posts.service";
import { Box, CardMedia } from "@mui/material";
import {
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { convertISODateToString } from "utils/dates";
import RecipeSection from "components/RecipeSection";
import BottomNavbar from "components/BottomNavbar";

const RecipePage = () => {
  const { data: posts } = useQuery(QUERY_KEYS.POSTS, postsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { id: postId } = useParams();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // TODO: update isSaved by fetching from user
  }, []);

  const post = useMemo(() => {
    return posts?.find((post) => post._id === postId);
  }, [posts, postId]);

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
  } = post ?? {};

  return post ? (
    <Box sx={styles.root}>
      <CardMedia
        component="img"
        sx={styles.recipeImage}
        image={imageUrl ?? "/recipe-default.png"}
      />
      <Box sx={styles.content}>
        <Box sx={styles.header}>
          <Box sx={styles.headerDetails}>
            <Box sx={styles.title}>{title}</Box>
            <Box sx={styles.rating}>
              <StarIcon sx={styles.ratingIcon} />
              {averageRating}
            </Box>
          </Box>
          <Box
            sx={styles.headerDetails}
            onClick={() => {
              //TODO update user saved
              setIsSaved(!isSaved);
            }}
          >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Box>
        </Box>
        <Box sx={styles.subHeader}>
          <Box sx={{ fontWeight: "600" }}>{author}</Box>
          {createdAt && <Box>{convertISODateToString(createdAt)}</Box>}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={styles.tagsBox}>
            {tags?.length &&
              chunk(tags, 4).map((tagsArray, index) => (
                <Box sx={styles.tagsRow} key={index}>
                  {tagsArray.map((tag) => (
                    <Box key={tag._id} sx={styles.tag}>
                      {tag.name}
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
        </Box>
        <Box sx={styles.contentSections}>
          <RecipeSection title="Ingredients" content={ingredients} />
          <RecipeSection title="How-To" content={instructions} />
        </Box>
      </Box>
      <BottomNavbar />
    </Box>
  ) : (
    <></>
  );
};

export default RecipePage;
