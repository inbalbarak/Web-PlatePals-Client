import { useState } from "react";
import { PATHS } from "constants/routes";
import BottomNavbar from "components/BottomNavbar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import styles from "./myRecipes.style";
import { QUERY_KEYS } from "constants/queryKeys";
import postsService from "services/posts.service";
import { useQuery } from "react-query";
import PostsList from "components/PostsList/PostsList";

const TABS = {
  UPLOADED: "uploaded",
  SAVED: "saved",
};

const MyRecipes = () => {
  const [selectedTab, setSelectedTabs] = useState(TABS.UPLOADED);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTabs(newValue);
  };

  const { data: userPosts, refetch: refetchPosts } = useQuery(
    QUERY_KEYS.USER_POSTS,
    () =>
      postsService.getByAuthor(
        // localStorage.getItem(USER_ID) TODO inbal fix when uploading personal-info-page pr
        "67c80aef7dd293d361bc9af3"
      ),
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.header}>My recipes</Typography>
      <Box sx={styles.pageContainer}>
        <Box sx={styles.tabsContainer}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            TabIndicatorProps={{ style: styles.tabs }}
          >
            <Tab value={TABS.UPLOADED} sx={styles.tab} label={TABS.UPLOADED} />
            <Tab value={TABS.SAVED} sx={styles.tab} label={TABS.SAVED} />
          </Tabs>
        </Box>
        <Box sx={styles.content}>
          {selectedTab == TABS.UPLOADED ? (
            <Box>
              {userPosts?.length ? (
                <PostsList
                  posts={userPosts}
                  editable={true}
                  refetch={refetchPosts}
                />
              ) : (
                <Box>
                  <Typography>no posts available</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>

      <BottomNavbar selectedPath={PATHS.MY_RECIPES} />
    </Box>
  );
};

export default MyRecipes;
