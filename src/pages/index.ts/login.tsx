import { useState } from "react";
import styles from "./login.style";
import InputField from "components/InputField";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { googleLogin, login, register } from "services/auth.service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/localStorage";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

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
          disabled={!formState.isValid}
          onClick={() => {
            void (async () => {
              try {
                if (isLogin) {
                  const token = await login(getValues());

                  localStorage.setItem(ACCESS_TOKEN, token.accessToken);
                  localStorage.setItem(REFRESH_TOKEN, token.refreshToken);

                  //TODO move to home
                } else {
                  const token = await register(getValues());

                  localStorage.setItem(ACCESS_TOKEN, token.accessToken);
                  localStorage.setItem(REFRESH_TOKEN, token.refreshToken);

                  //TODO move to home
                }
              } catch (_err) {
                setBanner(true);
                setIsLogin(true);
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
                    const token = await googleLogin(
                      credentialsRes.credential ?? ""
                    );

                    localStorage.setItem(ACCESS_TOKEN, token.accessToken);
                    localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
                    //TODO  move to home
                  } catch (_err) {
                    setBanner(true);
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
        autoHideDuration={5000}
        onClose={() => setBanner(false)}
        message="An error accrued while saving a user, try again later"
      />
    </Box>
  );
};

export default Login;
