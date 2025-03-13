import { useMutation, useQuery } from "react-query";
import styles from "./personalInfo.style";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Snackbar,
  SvgIconProps,
  TextField,
  Typography,
} from "@mui/material";
import { QUERY_KEYS } from "constants/queryKeys";
import usersService from "services/users.service";
import { USER_ID } from "constants/localStorage";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "constants/routes";
import { useQueryClient } from "react-query";
import { logout } from "services/auth.service";
import BottomNavbar from "components/BottomNavbar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useForm } from "react-hook-form";
import filesService from "services/files.service";

interface formData {
  username: string;
  img: File[];
}

const PersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [banner, setBanner] = useState({
    open: false,
    text: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, watch } = useForm<formData>();
  const inputFileRef: { current: HTMLInputElement | null } = { current: null };
  const [img] = watch(["img"]);

  useEffect(() => {
    if (img) {
      console.log(img);
      setFile(img[0]);
    }
  }, [img]);

  const { ref, ...rest } = register("img");

  const onSubmit = async (data: formData) => {
    console.log("formData:", data);
    const { username, img } = data;

    const imageUrl = await filesService.uploadImg(img[0]);

    updateUser({
      _id: user?._id ?? "",
      username,
      imageUrl,
    });
    refetch();
    setEditMode(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: user, refetch } = useQuery(
    QUERY_KEYS.USER,
    async () => {
      const user = await usersService.getById(
        localStorage.getItem(USER_ID) ?? ""
      );

      return user;
    },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: updateUser } = useMutation(
    QUERY_KEYS.UPDATE_USER,
    async (data: { _id: string; username: string; imageUrl?: string }) =>
      await usersService.upsert(data._id, data.username, data.imageUrl),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.USER);
        setBanner({
          open: true,
          text: "user details have updated successfully",
        });
        setEditMode(false);
      },
      onError: () => {
        setEditMode(false);
        setBanner({
          open: true,
          text: "an error has accrued, please try again later",
        });
      },
    }
  );

  const logoutUser = async () => {
    await logout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headerBox}>
        <Box sx={styles.header}>
          <IconButton
            sx={{ color: "white" }}
            onClick={() =>
              editMode
                ? setEditMode(false)
                : location.key
                ? navigate(-1)
                : navigate(PATHS.HOME)
            }
          >
            <ArrowBack />
          </IconButton>
          <Button onClick={logoutUser} sx={styles.whiteColor}>
            Logout
          </Button>
        </Box>
        <Typography sx={styles.profileText}>Profile</Typography>
      </Box>
      {editMode ? (
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={styles.content}>
            <Box sx={styles.fields}>
              <Box sx={styles.profilePictureField}>
                <Typography>Profile Picture</Typography>
                <Box sx={styles.profilePicture}>
                  <Avatar
                    sx={styles.avatar}
                    src={file ? URL.createObjectURL(file) : user?.imageUrl}
                  />
                  <input
                    {...rest}
                    ref={(e) => {
                      ref(e);
                      inputFileRef.current = e;
                    }}
                    type="file"
                    accept="image/jpeg, image/png"
                    style={{ display: "none" }}
                  />
                  <IconButton
                    sx={styles.uploadPhotoButton}
                    onClick={() => {
                      inputFileRef.current?.click();
                    }}
                  >
                    <AddAPhotoIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box>
                <Typography>Username</Typography>
                <TextField
                  {...register("username")}
                  value={user?.username}
                  variant="outlined"
                ></TextField>
              </Box>
            </Box>
            <Button
              sx={[styles.filledButton, styles.bottomCenter]}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={styles.content}>
          <Box sx={styles.profileDetails}>
            <Avatar sx={styles.avatar} src={`${user?.imageUrl}`} />
            <Typography sx={styles.username}>{user?.username ?? ""}</Typography>
          </Box>
          <Button
            sx={[styles.outlinedButton, styles.bottomCenter]}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        </Box>
      )}
      <Snackbar
        open={banner.open}
        autoHideDuration={4000}
        onClose={() => setBanner({ open: false, text: "" })}
        message={banner.text}
      />
      <BottomNavbar selectedPath={PATHS.PERSONAL_INFO} />
    </Box>
  );
};

export default PersonalInfo;
