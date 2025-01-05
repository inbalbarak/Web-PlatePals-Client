import { colors } from "../../constants/styles";

const styles = {
  root: {
    backgroundColor: colors.mainOrange,
    height: "100vh",
    width: "100vw",
    position: "relative",
  },

  imageBox: {
    display: "flex",
  },

  image: {
    margin: "auto",
    marginTop: "12vh",
    marginBottom: 40,
  },

  textField: {
    borderRadius: "10px",
    border: "1px solid",
    backgroundColor: colors.white,
    width: "80vw",
  },

  details: {
    backgroundColor: colors.white,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 2,
  },

  detailsBox: {
    display: "flex",
    justifyContent: "center",
  },

  title: {
    margin: "5px 0px",
  },

  buttonsSection: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    width: "100vw",
    textAlign: "center",
    padding: "15px 0px",
    borderTop: "1px",
    borderRadius: "16px 16px 0 0",
  },

  actionButton: {
    backgroundColor: colors.mainOrange,
    color: colors.white,
    borderRadius: "20px",
    width: "80vw",
    "&.Mui-disabled": {
      backgroundColor: colors.athensGray,
    },
  },

  registerTextBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: 2,
  },

  registerText: {
    color: colors.mainOrange,
    marginLeft: 1,
  },
};

export default styles;
