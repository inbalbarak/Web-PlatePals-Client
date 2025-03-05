import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundColor: colors.concrete,
    overflow: "hidden",
  },

  header: {
    display: "flex",
    alignItems: "center",
    marginTop: 1,
  },

  headerText: {
    marginLeft: 2,
    fontSize: 20,
  },

  backButton: {
    borderRadius: "15px",
    backgroundColor: colors.white,
    padding: "5px",
    marginLeft: 2,
  },

  recipeBox: {
    height: "60%",
    width: "100%",
    overflowY: "auto",
    backgroundColor: colors.white,
    position: "absolute",
    bottom: "10%",
    borderRadius: "16px 16px 0 0",
  },

  innerDisplay: {
    marginLeft: 3,
  },

  title: {
    marginTop: 2,
    marginBottom: 1,
  },

  textField: {
    width: "90%",
  },

  tagsBox: {
    height: "40%",
    width: "90%",
    border: `1px solid rgba(0, 0, 0, 0.23)`,
    borderRadius: "10px",
  },

  tagsRow: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0px",
  },

  actionButton: {
    backgroundColor: colors.mainOrange,
    color: colors.white,
    borderRadius: "20px",
    width: "85vw",
    margin: "30px auto",
    display: "block",
  },

  tag: (isSelected: boolean) => ({
    color: isSelected ? colors.white : colors.mainOrange,
    backgroundColor: isSelected ? colors.mainOrange : colors.white,
    borderRadius: "20px",
    border: `1px solid ${colors.mainOrange}`,
  }),
};

export default styles;
