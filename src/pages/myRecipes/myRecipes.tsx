import { useEffect, useState } from "react";
import BottomNavbar from "components/BottomNavbar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import styles from "./myRecipes.style";
import { QUERY_KEYS } from "constants/queryKeys";
import postsService from "services/posts.service";
import { useQuery } from "react-query";
import PostsList from "components/PostsList/PostsList";
import { USER_ID } from "constants/localStorage";
import usersService from "services/users.service";
import { PostAttributes } from "src/interfaces/post.interface";

const TABS = {
  UPLOADED: "uploaded",
  SAVED: "saved",
};

const MyRecipes = () => {
  const [selectedTab, setSelectedTabs] = useState(TABS.UPLOADED);
  const [savedPosts, setSavedPosts] = useState<PostAttributes[]>([]);

  const { data: userPosts, refetch: refetchPosts } = useQuery(
    QUERY_KEYS.USER_POSTS,
    () => postsService.getByAuthor(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: user } = useQuery(
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

  const fetchPostsByIds = async () => {
    if (user?.savedPosts) {
      try {
        const posts = await postsService.getByIds(user.savedPosts);
        setSavedPosts(posts);
      } catch (error) {
        setSavedPosts([]);
      }
    }
  };

  useEffect(() => {
    fetchPostsByIds();
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (newValue === TABS.SAVED) {
      fetchPostsByIds();
    }
    setSelectedTabs(newValue);
  };

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
                  <Typography>You haven't uploaded any posts yet</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              {savedPosts?.length ? (
                <PostsList posts={savedPosts} />
              ) : (
                <Box>
                  <Typography>You haven't saved any posts yet</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <BottomNavbar />
    </Box>
  );
};

export default MyRecipes;
