import { ChangeEvent } from "react";
import styles from "./InputField.style";
import { FieldError } from "react-hook-form";
import { SxProps, TextField, Typography } from "@mui/material";

const InputField = ({
  sx,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  sx?: SxProps;
  error?: FieldError;
  value?: string | number | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "number" | "text";
  showAdornment?: boolean;
}) => (
  <TextField
    error={!!error}
    sx={{ ...styles.textField, ...sx }}
    value={value}
    disabled={disabled}
    onChange={onChange}
    placeholder={placeholder}
    helperText={
      error?.message && (
        <Typography component="span" sx={styles.error}>
          {error.message}
        </Typography>
      )
    }
    type={type}
  />
);

export default InputField;
