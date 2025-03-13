import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    overflowY: "hidden",
  },

  header: {
    fontSize: 20,
    fontWeight: 600,
    margin: "15px 2px 5px 15px",
  },

  pageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  tabsContainer: {
    display: "flex",
    justifyContent: "center", // Center only the tabs
    width: "100%",
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.mainOrange,
  },

  tab: {
    width: "40vw",
    "&.Mui-selected": {
      color: colors.mainOrange,
    },

    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },

  content: {
    overflowY: "scroll",
    height: "80vh",
  },
};

export default styles;
