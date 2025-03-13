import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100dvh",
    position: "relative",
  },

  headerBox: {
    backgroundColor: colors.mainOrange,
    padding: "10px 0",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
  },

  whiteColor: {
    color: colors.white,
  },

  profileDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyConent: "center",
    gap: "20px",
  },

  username: {
    fontSize: 20,
  },

  avatar: {
    width: "100px",
    height: "100px",
  },

  profileText: {
    textAlign: "center",
    fontSize: 25,
    color: colors.white,
  },

  filledButton: {
    backgroundColor: colors.mainOrange,
    color: colors.white,
  },

  outlinedButton: {
    border: `1px solid ${colors.mainOrange}`,
    color: colors.mainOrange,
  },

  bottomCenter: {
    display: "flex",
    marginTop: "20vh",
    justifySelf: "center",
    width: "75%",
  },

  content: {
    marginTop: 5,
    padding: 3,
  },
};

export default styles;
