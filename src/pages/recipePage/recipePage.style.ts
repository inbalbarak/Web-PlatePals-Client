import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: colors.white,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "top",
  },

  recipeImage: {
    width: "100%",
    height: "40vh",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "3vh 3vw",
    boxSizing: "border-box",
    alignItems: "left",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
  },

  title: {
    fontSize: "1.125rem",
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    color: colors.black,
    borderRadius: "12px",
    border: `1px solid ${colors.graniteGray}`,
    margin: "0 3px",
    padding: "3px 6px",
    fontSize: "0.875rem",
  },

  ratingIcon: {
    color: colors.mainOrange,
    width: "16px",
    height: "16px",
  },

  subHeader: {
    marginTop: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    color: colors.graniteGray,
    fontSize: "0.875rem",
  },

  tagsBox: {
    gap: "10px",
    flexWrap: "wrap",
  },

  tagsRow: {
    display: "flex",
    margin: "10px 0px",
    gap: "5px",
  },

  // sortButtonsGroupContainer: {
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "center",
  // },

  // sortButtonsGroup: {
  //   border: `1px solid ${colors.graniteGray}`,
  //   borderRadius: "20px",
  //   overflowX: "hidden",
  // },

  // sortButton: {
  //   padding: "5px 30px",

  //   "&:focus": {
  //     outline: "none",
  //   },

  //   "&.MuiToggleButton-root:hover": {
  //     border: "1px solid rgba(0, 0, 0, 0.12)",
  //   },

  //   "&.Mui-selected": {
  //     border: "1px solid transparent",
  //     backgroundColor: colors.mainOrange,
  //     color: colors.white,
  //   },

  //   "&.Mui-selected:hover": {
  //     border: "1px solid transparent",
  //     backgroundColor: colors.mainOrange,
  //   },
  // },

  tag: {
    color: colors.mainOrange,
    backgroundColor: colors.white,
    borderRadius: "20px",
    border: `1px solid ${colors.mainOrange}`,
    padding: "3px 6px",
    fontSize: "0.75rem",
  },
};

export default styles;
