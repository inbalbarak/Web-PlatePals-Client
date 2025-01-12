import { colors } from "constants/styles";

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundColor: colors.white,
    overflow: "hidden",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
    padding: "15px 10px",
    boxShadow: 3,
    backgroundColor: colors.white,
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
