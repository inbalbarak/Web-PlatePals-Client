import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
  },

  header: {
    fontSize: 20,
    fontWeight: 600,
    margin: "15px 2px 5px 15px",
  },

  tabsBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  tabs: {
    display: "flex",
    justifyContent: "space-around",
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
};

export default styles;
