import Home from "icons/Home";
import Post from "icons/Post";
import Chatbot from "icons/Chatbot";
import MyRecipes from "icons/MyRecipes";
import { PATHS } from "constants/routes";
import styles from "./BottomNavbar.style";
import { useMemo, useState } from "react";
import PersonalInfo from "icons/PersonalInfo";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

const BottomNavbar = () => {
  const [activeItem, setActiveItem] = useState(
    window.location.pathname ?? PATHS.HOME
  );
  const navigate = useNavigate();

  const routes = useMemo(
    () => [
      {
        value: PATHS.CHATBOT,
        icon: <Chatbot sx={styles.icon} />,
        iconFill: <Chatbot selected sx={styles.icon} />,
      },
      {
        value: PATHS.MY_RECIPES,
        icon: <MyRecipes sx={styles.icon} />,
        iconFill: <MyRecipes selected sx={styles.icon} />,
      },
      {
        value: PATHS.POST,
        icon: <Post sx={styles.icon} />,
        iconFill: <Post sx={styles.icon} />,
      },
      {
        value: PATHS.HOME,
        icon: <Home sx={styles.icon} />,
        iconFill: <Home selected sx={styles.icon} />,
      },
      {
        value: PATHS.PERSONAL_INFO,
        icon: <PersonalInfo sx={styles.icon} />,
        iconFill: <PersonalInfo selected sx={styles.icon} />,
      },
    ],
    []
  );

  const handleItemChange = (_event: React.SyntheticEvent, newVal: string) => {
    setActiveItem(newVal);
    navigate(`${newVal}`);
  };

  return (
    <BottomNavigation
      showLabels
      value={activeItem}
      onChange={handleItemChange}
      sx={styles.bottomNavigation}
    >
      {routes.map((route) => (
        <BottomNavigationAction
          key={route.value}
          value={route.value}
          icon={activeItem.includes(route.value) ? route.iconFill : route.icon}
          sx={styles.navbarIcon}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNavbar;
