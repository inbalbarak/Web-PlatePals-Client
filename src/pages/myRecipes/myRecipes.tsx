import { useState } from "react";
import { PATHS } from "constants/routes";
import BottomNavbar from "components/BottomNavbar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import styles from "./myRecipes.style";

const TABS = {
  UPLOADED: "uploaded",
  SAVED: "saved",
};

const MyRecipes = () => {
  const [selectedTab, setSelectedTabs] = useState(TABS.UPLOADED);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTabs(newValue);
  };

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.header}>My recipes</Typography>
      <Box sx={styles.tabsBox}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          TabIndicatorProps={{ style: styles.tabs }}
        >
          <Tab value={TABS.UPLOADED} sx={styles.tab} label={TABS.UPLOADED} />
          <Tab value={TABS.SAVED} sx={styles.tab} label={TABS.SAVED} />
        </Tabs>
        <Box>{selectedTab == TABS.UPLOADED ? <></> : <></>}</Box>
      </Box>

      <BottomNavbar selectedPath={PATHS.MY_RECIPES} />
    </Box>
  );
};

export default MyRecipes;
