import { chunk } from "lodash";
import { useMemo, useState } from "react";
import styles from "./homePage.style";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import tagsService, { TagAttributes } from "services/tags.service";
import postsService from "services/posts.service";
import {
  Avatar,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PostsList from "components/PostsList/PostsList";
import { USERNAME } from "constants/localStorage";
import { PATHS } from "constants/routes";
import BottomNavbar from "components/BottomNavbar";

enum Sort {
  TOP = "TOP",
  NEW = "NEW",
}

const HomePage = () => {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState(Sort.TOP);

  const { data: tags } = useQuery(QUERY_KEYS.TAGS, tagsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: fetchedPosts } = useQuery(
    QUERY_KEYS.POSTS,
    postsService.getAll,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const computedPosts = useMemo(() => {
    if (fetchedPosts) {
      let filteredPosts = fetchedPosts;

      if (activeTags.size) {
        filteredPosts = fetchedPosts?.filter((post) =>
          post.tags.some((tag) => activeTags.has(tag.name))
        );
      }

      return filteredPosts?.sort((a, b) => {
        if (sort === Sort.TOP && a.averageRating && b.averageRating) {
          if (b.averageRating == a.averageRating) {
            return (b.ratingCount ?? 0) - (a.ratingCount ?? 0);
          }

          return b.averageRating - a.averageRating;
        }

        if (sort === Sort.NEW && a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        return 0;
      });
    }
  }, [fetchedPosts, activeTags, sort]);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newSort: Sort) => {
    if (newSort !== null) {
      setSort(newSort);
    }
  };

  const control = {
    value: sort,
    onChange: handleChange,
    exclusive: true,
  };

  const username = localStorage.getItem(USERNAME) ?? "";

  const sortButtons = Object.values(Sort).map((key) => {
    return (
      <ToggleButton sx={styles.sortButton} value={key} key={key}>
        {key}
      </ToggleButton>
    );
  });

  // TODO get avatar image from user

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Avatar src="" />
        <Typography sx={styles.title}>Hello, {username}</Typography>
      </Box>
      <Box sx={{ width: "100%" }} key={username}>
        <Box sx={styles.tagsBox}>
          {tags?.length &&
            chunk(tags, 4).map((tagsArray: TagAttributes[], index) => (
              <Box sx={styles.tagsRow} key={index}>
                {tagsArray.map((tag) => {
                  const isSelected = activeTags?.has(tag.name);

                  return (
                    <Button
                      key={`${tag.name}-${isSelected}`}
                      onClick={(_event) => {
                        setActiveTags(
                          (currentTags) =>
                            new Set(
                              isSelected
                                ? Array.from(currentTags).filter(
                                    (existingTag) => existingTag !== tag.name
                                  )
                                : [...currentTags, tag.name]
                            )
                        );
                      }}
                      sx={styles.tag(isSelected)}
                    >
                      {tag.name}
                    </Button>
                  );
                })}
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={styles.sortButtonsGroupContainer}>
        <ToggleButtonGroup
          sx={styles.sortButtonsGroup}
          size="large"
          {...control}
          aria-label="Large sizes"
        >
          {sortButtons}
        </ToggleButtonGroup>
      </Box>
      {!!computedPosts?.length && <PostsList posts={computedPosts} />}
      <BottomNavbar selectedPath={PATHS.HOME} />
    </Box>
  );
};

export default HomePage;
