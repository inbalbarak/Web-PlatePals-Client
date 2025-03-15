import { colors } from "constants/styles";

const styles = {
  root: {
    margin: "20px 0",
    display: "flex",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    border: `1px solid ${colors.graniteGray}`,
    borderRadius: "10px",
  },

  reviewInput: {
    width: "95%",

    "& .MuiInputBase-root": {
      fontSize: "0.875rem",
      padding: "12px 14px",
    },
  },

  reviewInputIcon: {
    width: "16px",
    height: "16px",
  },

  title: {
    fontWeight: "600",
    fontSize: "0.875rem",
  },

  submitButton: {
    color: colors.mainOrange,
    backgroundColor: `${colors.white} !important`,
    borderRadius: "20px",
    fontSize: "0.875rem",
    border: `1px solid ${colors.mainOrange} !important`,
    boxShadow: "none !important",
    outline: "none !important",
  },
};

export default styles;
