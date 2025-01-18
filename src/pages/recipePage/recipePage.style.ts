import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "top",
    paddingBottom: "calc(8vh)",
  },

  recipeImage: {
    width: "100%",
    height: "30vh",
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
    justifyContent: "space-between",
  },

  headerDetails: {
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
    gap: "6px",
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

  contentSections: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

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
