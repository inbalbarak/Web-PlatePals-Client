import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: colors.white,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "top",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
    width: "100%",
    padding: "15px 10px",
    boxShadow: 3,
    backgroundColor: colors.white,
    boxSizing: "border-box",
  },

  title: {
    fontWeight: "600",
  },

  tagsBox: {
    padding: "10px 0",
    gap: "10px",
    flexWrap: "wrap",
  },

  tagsRow: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0px",
  },

  sortButtonsGroup: {
    border: `1px solid ${colors.graniteGray}`,
    borderRadius: "20px",
    overflow: "hidden",
  },

  sortButton: {
    padding: "5px 30px",

    "&:focus": {
      outline: "none",
    },

    "&.MuiToggleButton-root:hover": {
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },

    "&.Mui-selected": {
      border: "1px solid transparent",
      backgroundColor: colors.mainOrange,
      color: colors.white,
    },

    "&.Mui-selected:hover": {
      border: "1px solid transparent",
      backgroundColor: colors.mainOrange,
    },
  },

  tag: (isSelected: boolean) => ({
    color: isSelected ? colors.white : colors.mainOrange,
    backgroundColor: isSelected ? colors.mainOrange : colors.white,
    borderRadius: "20px",
    border: `1px solid ${colors.mainOrange}`,
    flex: "1 1 auto",
    margin: "0 8px",
    maxWidth: "50vw",
  }),
};

export default styles;
