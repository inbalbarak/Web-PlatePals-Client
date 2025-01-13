const styles = {
  bottomNavigation: {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "10px 0",
    position: "fixed",
    zIndex: 200,
    bottom: 0,
    left: 0,
    width: "100%",
  },

  icon: {
    scale: "1.5",
  },

  navbarIcon: {
    "&.Mui-selected": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
};

export default styles;
