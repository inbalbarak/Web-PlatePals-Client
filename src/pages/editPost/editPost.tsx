import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SxProps,
  Typography,
} from "@mui/material";
import { chunk } from "lodash";
import { useEffect, useState } from "react";
import styles from "./editPost.style";
import { useQuery, useQueryClient } from "react-query";
import InputField from "components/InputField";
import { QUERY_KEYS } from "constants/queryKeys";
import { useForm, Controller } from "react-hook-form";
import { PostDTOAttributes } from "src/interfaces/post.interface";
import tagsService, { TagAttributes } from "services/tags.service";
import postsService from "services/posts.service";
import { USER_ID } from "constants/localStorage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "constants/routes";

export interface PostFormAttributes {
  image: string | null;
  title: string | null;
  tags: string[];
  ingredients: string | null;
  instructions: string | null;
}

const defaultValues: PostFormAttributes = {
  image: null,
  title: null,
  tags: [],
  ingredients: null,
  instructions: null,
};

const FORM_FIELDS: {
  name: keyof PostFormAttributes;
  displayName: string;
  rules?: Record<string, unknown>;
  sx?: SxProps;
  placeholder?: string;
  multiline?: boolean;
}[] = [
  {
    name: "title",
    displayName: "Recipe name",
    rules: { required: true },
    sx: styles.textField,
  },
  {
    name: "ingredients",
    displayName: "Ingredients",
    rules: {
      required: true,
    },
    sx: styles.textField,
    placeholder: "Enter your ingredients",
    multiline: true,
  },
  {
    name: "instructions",
    displayName: "instructions",
    rules: {
      required: true,
    },
    sx: styles.textField,
    placeholder: "Enter the details of your recipe",
    multiline: true,
  },
  {
    name: "tags",
    displayName: "Tags",
    sx: styles.tagsBox,
  },
];

const EditPost = () => {
  const queryClient = useQueryClient();

  const [banner, setBanner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id: postId } = useParams();

  const { data: posts } = useQuery(QUERY_KEYS.POSTS, postsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const post = posts?.find((post) => post._id === postId);

  const { control, formState, setValue, getValues, watch, reset } =
    useForm<PostFormAttributes>({
      defaultValues: defaultValues,
      mode: "all",
    });

  useEffect(() => {
    if (post) {
      reset({
        ...post,
        tags: post.tags.map((tag) => tag._id),
      });
    }
  }, [post]);

  const watchedTags = watch("tags");

  const { data: tags } = useQuery(QUERY_KEYS.TAGS, tagsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const onSave = async () => {
    try {
      await postsService.upsert({
        ...getValues(),
        author: localStorage.getItem(USER_ID),
      } as PostDTOAttributes);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });

      navigate(PATHS.HOME);
    } catch (_err) {
      setBanner(true);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <IconButton
          sx={styles.backButton}
          onClick={() => (location.key ? navigate(-1) : navigate(PATHS.HOME))}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={styles.headerText}>
          {post?._id ? "Edit your recipe" : "Create new recipe"}
        </Typography>
      </Box>
      {/* TOOD add dropzone */}
      <Box sx={styles.recipeBox}>
        <Box sx={styles.innerDisplay}>
          {FORM_FIELDS.map(
            ({ name, rules, displayName, multiline, sx, placeholder }) => (
              <Box key={name}>
                <Typography sx={styles.title}>{displayName}</Typography>
                <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field, fieldState: { error } }) =>
                    name !== "tags" ? (
                      <InputField
                        error={error}
                        sx={sx}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        multiline={multiline}
                      />
                    ) : (
                      <Box sx={styles.tagsBox}>
                        {tags?.length &&
                          chunk(tags, 3).map(
                            (tagsArray: TagAttributes[], index) => (
                              <Box sx={styles.tagsRow} key={index}>
                                {tagsArray.map((tag) => {
                                  const isSelected = watchedTags?.includes(
                                    tag._id
                                  );

                                  return (
                                    <Button
                                      key={`${tag._id}-${isSelected}`}
                                      onClick={(_event) => {
                                        const currentTags =
                                          getValues("tags") ?? [];

                                        setValue(
                                          "tags",
                                          isSelected
                                            ? currentTags?.filter(
                                                (existingTag) =>
                                                  existingTag !== tag._id
                                              )
                                            : [...currentTags, tag._id]
                                        );
                                      }}
                                      sx={styles.tag(isSelected)}
                                    >
                                      {tag.name}
                                    </Button>
                                  );
                                })}
                              </Box>
                            )
                          )}
                      </Box>
                    )
                  }
                />
              </Box>
            )
          )}
        </Box>
      </Box>
      <Button
        sx={styles.actionButton}
        disabled={!formState.isValid}
        onClick={() => {
          void (async () => {
            try {
              onSave();
            } catch (_err) {
              setBanner(true);
            }
          })();
        }}
      >
        Save
      </Button>
      <Snackbar
        open={banner}
        autoHideDuration={5000}
        onClose={() => setBanner(false)}
        message="An error accrued while saving the post, try again later"
      />
    </Box>
  );
};

export default EditPost;
