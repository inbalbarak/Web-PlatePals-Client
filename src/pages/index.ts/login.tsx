import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TIMESTAMP,
  USERNAME,
} from "constants/localStorage";
import { useEffect, useState } from "react";
import styles from "./login.style";
import InputField from "components/InputField";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { googleLogin, login, refresh, register } from "services/auth.service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { PATHS } from "constants/routes";
import { isTokenValid } from "services/axiosInstance";

interface UserFormAttributes {
  username: string;
  password: string;
  email: string;
}

const defaultValues: UserFormAttributes = {
  username: "",
  password: "",
  email: "",
};

const FORM_FIELDS: {
  name: keyof UserFormAttributes;
  rules: Record<string, unknown>;
  placeholder: string;
}[] = [
  {
    name: "username",
    rules: { required: true },
    placeholder: "Enter your username",
  },
  {
    name: "password",
    rules: { required: true },
    placeholder: "Enter your password",
  },
  {
    name: "email",
    rules: {
      required: true,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format",
      },
    },
    placeholder: "Enter your username",
  },
];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [banner, setBanner] = useState(false);
  const { control, getValues, formState } = useForm<UserFormAttributes>({
    defaultValues: defaultValues,
    mode: "onChange",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      if (!isTokenValid()) {
        const tokens = await refresh(localStorage.getItem(REFRESH_TOKEN) ?? "");
        localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
        localStorage.setItem(TOKEN_TIMESTAMP, new Date().toString());
      }

      navigate(PATHS.HOME);
    };

    autoLogin()
      .then((_res) => console.log("auto login"))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <img src="/Logo.png" style={styles.image} />
      </Box>
      <Box sx={styles.detailsBox}>
        <Box sx={styles.details}>
          {FORM_FIELDS.map(
            ({ name, rules, placeholder }) =>
              ((isLogin && name !== "email") || !isLogin) && (
                <Box>
                  <Typography sx={styles.title}>{name}</Typography>
                  <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState: { error } }) => (
                      <InputField
                        error={error}
                        sx={styles.textField}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder={placeholder}
                      />
                    )}
                  />
                </Box>
              )
          )}
        </Box>
      </Box>
      <Box sx={styles.buttonsSection}>
        <Button
          sx={styles.actionButton}
          disabled={!formState.isValid || isLoading}
          onClick={() => {
            void (async () => {
              try {
                setIsLoading(true);
                const token = isLogin
                  ? await login(getValues())
                  : await register(getValues());

                localStorage.setItem(ACCESS_TOKEN, token.accessToken);
                localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
                localStorage.setItem(USERNAME, getValues("username"));
                localStorage.setItem(TOKEN_TIMESTAMP, new Date().toString());

                window.dispatchEvent(new Event("storage"));

                navigate(PATHS.HOME);
              } catch (_err) {
                setBanner(true);
                setIsLogin(true);
                setIsLoading(false);
              }
            })();
          }}
        >
          {isLogin ? "Login" : "Register"}
        </Button>

        {isLogin && (
          <>
            <Box sx={styles.googleLogin}>
              <GoogleLogin
                onSuccess={async (credentialsRes: CredentialResponse) => {
                  try {
                    setIsLoading(true);
                    const token = await googleLogin(
                      credentialsRes.credential ?? ""
                    );

                    localStorage.setItem(ACCESS_TOKEN, token.accessToken);
                    localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
                    localStorage.setItem(USERNAME, getValues("username"));
                    localStorage.setItem(
                      TOKEN_TIMESTAMP,
                      new Date().toString()
                    );
                    window.dispatchEvent(new Event("storage"));

                    navigate(PATHS.HOME);
                  } catch (_err) {
                    setBanner(true);
                    setIsLoading(false);
                  }
                }}
                onError={() => {
                  console.log("error in google authentication");
                }}
              />
            </Box>
            <Box sx={styles.registerTextBox}>
              <Typography>Don't have an account ? </Typography>
              <Typography
                sx={styles.registerText}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Snackbar
        open={banner}
        autoHideDuration={4000}
        onClose={() => setBanner(false)}
        message="An error accrued while logging in, try again later"
      />
    </Box>
  );
};

export default Login;
