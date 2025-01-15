import { colors } from "constants/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    marginTop: "20px",
    overflowX: "scroll",
  },
  post: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    gap: "20px",
    alignItems: "center",
  },

  postImage: {
    width: "100px",
    height: "100px",
  },

  postContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 !important",
    flexGrow: 1,
  },

  postRatings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "3px",
  },

  postRatingIcon: {
    color: colors.mainOrange,
    width: "16px",
    height: "16px",
  },

  postRatingText: {
    lineHeight: 1,
    color: "text.secondary",
  },
};

export default styles;
