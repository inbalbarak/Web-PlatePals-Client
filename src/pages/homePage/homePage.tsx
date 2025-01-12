import { chunk } from "lodash";
import { useState } from "react";
import styles from "./homePage.style";
import { useQuery } from "react-query";
import InputField from "components/InputField";
import { QUERY_KEYS } from "constants/queryKeys";
import { useForm, Controller } from "react-hook-form";
import { PostAttributes } from "src/interfaces/post.interface";
import tagsService, { TagAttributes } from "services/tags.service";
import {
  Avatar,
  Box,
  Button,
  Snackbar,
  SxProps,
  Typography,
} from "@mui/material";
import { upsert } from "services/posts.service";
import { USERNAME } from "constants/localStorage";

const HomePage = () => {
  const [activeTags, setActiveTags] = useState<String[]>([]);
  const [sort, setSort] = useState("top");

  const { data: tags } = useQuery(QUERY_KEYS.TAGS, tagsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const name = "Michal";

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography sx={styles.title}>Hello, {name}</Typography>
      </Box>
      <Box key={name}>
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
    </Box>
  );
};

export default HomePage;
