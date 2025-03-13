import { useMutation, useQuery } from "react-query";
import styles from "./personalInfo.style";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Snackbar,
  SvgIconProps,
  TextField,
  Typography,
} from "@mui/material";
import { QUERY_KEYS } from "constants/queryKeys";
import usersService from "services/usersService";
import { USER_ID } from "constants/localStorage";
import { ArrowBack } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "constants/routes";
import { useQueryClient } from "react-query";
import { logout } from "services/auth.service";
import BottomNavbar from "components/BottomNavbar";

interface TextIconProps {
  Icon: React.FC<SvgIconProps>;
  text: string;
}

const PersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [banner, setBanner] = useState({
    open: false,
    text: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: user, refetch } = useQuery(
    QUERY_KEYS.USER,
    async () => {
      const user = await usersService.getById(
        localStorage.getItem(USER_ID) ?? ""
      );
      setUpdatedUsername(user.username);

      return user;
    },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setUpdatedUsername(user?.username ?? "");
  }, [user]);

  const { mutate: updateUser } = useMutation(
    QUERY_KEYS.UPDATE_USER,
    async (data: { _id: string; username: string }) =>
      await usersService.upsert(data._id, data.username),
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
        <Box sx={styles.content}>
          <Typography>Username</Typography>
          <TextField
            variant="outlined"
            value={updatedUsername}
            onChange={({ target }) => setUpdatedUsername(target.value)}
          ></TextField>
          <Button
            onClick={() => {
              updateUser({ _id: user?._id ?? "", username: updatedUsername });
              refetch();
              setEditMode(false);
            }}
            sx={[styles.filledButton, styles.bottomCenter]}
          >
            Update
          </Button>
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
