import { chunk } from "lodash";
import { useEffect, useMemo, useState } from "react";
import styles from "./recipePage.style";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import postsService from "services/posts.service";
import { Box, CardMedia, Divider } from "@mui/material";
import {
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { convertISODateToString } from "utils/dates";
import RecipeSection from "components/RecipeSection";
import BottomNavbar from "components/BottomNavbar";
import usersService from "services/users.service";
import { USER_ID } from "constants/localStorage";
import ReviewSection from "components/ReviewSection";
import commentsService from "services/comments.service";
import { CommentAttributes } from "src/interfaces/comment.interface";
import Comment from "components/Comment";
import { PostAttributes } from "src/interfaces/post.interface";

const RecipePage = () => {
  const { data: posts } = useQuery(QUERY_KEYS.POSTS, postsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: user, refetch } = useQuery(
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
  const queryClient = useQueryClient();

  const { id: postId } = useParams();

  const [comments, setComments] = useState<CommentAttributes[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchComments = async () => {
        const comments = await commentsService.getByPostId(postId);
        setComments(comments);
      };

      setIsSaved(!!user?.savedPosts?.includes(postId));
      fetchComments();
    }
  }, [postId, user]);

  const post = useMemo(() => {
    const currPost = posts?.find((post) => post._id === postId);

    return currPost;
  }, [posts, postId]);

  const {
    _id,
    title,
    tags,
    imageUrl,
    author,
    ingredients,
    instructions,
    averageRating,
    createdAt,
  } = post ?? {};

  const addComment = (
    comment: CommentAttributes,
    updatedAverageRating: number
  ) => {
    setComments((prevComments) => [comment, ...prevComments]);

    queryClient.setQueryData(
      [QUERY_KEYS.POSTS],
      (oldPosts?: PostAttributes[]) => {
        if (!oldPosts) {
          return [];
        }

        return oldPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                ratingCount: (post?.ratingCount ?? 0) + 1,
                averageRating: updatedAverageRating,
              }
            : post
        );
      }
    );
  };

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
              if (user?._id && postId) {
                usersService
                  .updateSavedPosts(user._id, postId, !isSaved)
                  .then(() => {
                    refetch();
                  });
              }
            }}
          >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Box>
        </Box>
        <Box sx={styles.subHeader}>
          <Box sx={{ fontWeight: "600" }}>{author?.username}</Box>
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
        {_id && <ReviewSection postId={_id} addComment={addComment} />}
        <Box>
          {comments.map((comment, index) => (
            <Box key={comment._id}>
              <Comment comment={comment} />
              {index !== comments.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Box>
      <BottomNavbar />
    </Box>
  ) : (
    <></>
  );
};

export default RecipePage;
