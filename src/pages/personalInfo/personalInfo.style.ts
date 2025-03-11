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

  profileText: {
    textAlign: "center",
    fontSize: 25,
    color: colors.white,
  },

  textIconComponent: {
    display: "flex",
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
    marginTop: "20vh",
    width: "85vw",
  },

  content: {
    marginTop: 5,
    padding: 3,
  },
};

export default styles;
