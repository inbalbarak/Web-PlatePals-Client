import { chunk } from "lodash";
import { useEffect, useState } from "react";
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

enum Sort {
  TOP = "TOP",
  NEW = "NEW",
}

const HomePage = () => {
  const [activeTags, setActiveTags] = useState<String[]>([]);
  const [sort, setSort] = useState(Sort.TOP);

  useEffect(() => {
    console.log("activeTags", activeTags);
  }, [activeTags]);

  useEffect(() => {
    console.log("activeTags", activeTags);
  }, [sort]);

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

  const { data: tags } = useQuery(QUERY_KEYS.TAGS, tagsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: posts } = useQuery(QUERY_KEYS.POSTS, postsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const name = "Michal";

  const sortButtons = Object.values(Sort).map((key) => {
    return (
      <ToggleButton sx={styles.sortButton} value={key} key={key}>
        {key}
      </ToggleButton>
    );
  });

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography sx={styles.title}>Hello, {name}</Typography>
      </Box>
      <Box sx={{ width: "100%" }} key={name}>
        <Box sx={styles.tagsBox}>
          {tags?.length &&
            chunk(tags, 4).map((tagsArray: TagAttributes[], index) => (
              <Box sx={styles.tagsRow} key={index}>
                {tagsArray.map((tag) => {
                  const isSelected = activeTags?.includes(tag._id);

                  return (
                    <Button
                      key={`${tag._id}-${isSelected}`}
                      onClick={(_event) => {
                        setActiveTags((currentTags) =>
                          isSelected
                            ? currentTags?.filter(
                                (existingTag) => existingTag !== tag._id
                              )
                            : [...currentTags, tag._id]
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
      {posts?.length && <PostsList posts={posts} />}
    </Box>
  );
};

export default HomePage;
