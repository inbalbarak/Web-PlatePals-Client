import { useState } from "react";
import styles from "./login.style";
import { createUser } from "../../services/usersService";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [banner, setBanner] = useState(false);

  const handleUserInfo = (value: string, field: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await createUser(userInfo);
    } catch (_err) {
      console.log(_err);

      setBanner(true);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <img src="/Logo.png" style={styles.image} />
      </Box>
      <Box sx={styles.detailsBox}>
        <Box sx={styles.details}>
          <Typography>Username</Typography>
          <TextField
            type="text"
            placeholder="Enter your username"
            onChange={({ target }) => handleUserInfo(target.value, "username")}
            sx={styles.textField}
          ></TextField>
          <Typography>Password</Typography>
          <TextField
            type="password"
            placeholder="Enter your password"
            onChange={({ target }) => handleUserInfo(target.value, "password")}
            sx={styles.textField}
          ></TextField>
        </Box>
      </Box>
      <Box sx={styles.buttonsSection}>
        <Button
          sx={styles.actionButton}
          disabled={userInfo.password == "" || userInfo.username == ""}
          onClick={() => {
            void (async () => {
              if (isLogin) {
                return; // TODO authenticate and move to home
              } else {
                return await handleSave();
              }
            })();
          }}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        {isLogin && (
          <Box sx={styles.registerTextBox}>
            <Typography>Don't have an account ? </Typography>
            <Typography
              sx={styles.registerText}
              onClick={() => setIsLogin(false)}
            >
              Register
            </Typography>
          </Box>
        )}
      </Box>
      <Snackbar
        open={banner}
        autoHideDuration={5000}
        onClose={() => setBanner(false)}
        message="An error accrued while saving a user, try again later"
      />
    </Box>
  );
};

export default Login;
