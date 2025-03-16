import { colors } from "../../constants/styles";

const styles = {
  icon: {
    fontSize: "1rem",
    marginLeft: 5,
  },

  error: {
    fontSize: "0.7rem",
    color: colors.vividRed,
  },

  textField: (multiline?: boolean) => ({
    width: "100%",
    background: colors.white,

    "& .MuiFormHelperText-root": {
      height: 0,
      margin: 0,
      textAlign: "right",
    },

    "& .MuiOutlinedInput-root": {
      ...(!multiline && { height: "2.5rem" }),
      padding: "10px 2px",
    },
  }),
};

export default styles;
