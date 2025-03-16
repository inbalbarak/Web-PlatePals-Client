import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "left",
  },
  title: {
    fontWeight: "600",
  },
  content: {
    border: `1px solid ${colors.graniteGray}`,
    borderRadius: "10px",
    padding: "10px",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
  },
};

export default styles;
