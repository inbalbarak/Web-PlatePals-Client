import { colors } from "constants/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundColor: colors.white,
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    flexGrow: 1,
    overflowY: "auto",
    scrollbarWidth: "thin",
  },
  messageRow: {
    display: "flex",
    width: "100%",
    gap: "8px",
    flexDirection: "column",
  },
  messageBubble: {
    display: "flex",
    maxWidth: "100%",
    padding: "12px 16px",
    borderRadius: "16px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    wordWrap: "break-word",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-line",
  },
  userMessage: {
    backgroundColor: colors.mainOrange,
    color: "white",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: colors.chineseWhite,
    color: "black",
    alignSelf: "flex-start",
  },
  loadingDots: {
    display: "flex",
    gap: "4px",
    fontSize: "24px",
    fontWeight: "bold",
    alignSelf: "flex-start",

    "& span": {
      animation: "dotFlashing 1.5s infinite linear",
      animationDelay: "0s",
      opacity: 0,
    },

    "& span:nth-child(2)": {
      animationDelay: "0.2s",
    },

    "& span:nth-child(3)": {
      animationDelay: "0.4s",
    },

    "@keyframes dotFlashing": {
      "0%": { opacity: 0 },
      "50%": { opacity: 1 },
      "100%": { opacity: 0 },
    },
  },
  inputContainer: {
    display: "flex",
    padding: "16px",
    borderTop: `1px solid ${colors.chineseWhite}`,
    backgroundColor: colors.phantomWhite,
    paddingBottom: "calc(8vh + 10px)",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
    border: "none",
    padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: colors.phantomWhite,
  },
  sendButton: {
    color: colors.mainOrange,
    width: "40px",
    height: "40px",
    marginLeft: "8px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "transparent",
      outline: "none",
      border: "none",
    },
  },
};

export default styles;
