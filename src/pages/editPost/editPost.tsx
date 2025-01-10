import { chunk } from "lodash";
import { useState } from "react";
import styles from "./editPost.style";
import { useQuery } from "react-query";
import InputField from "components/InputField";
import { QUERY_KEYS } from "constants/queryKeys";
import { useForm, Controller } from "react-hook-form";
import { PostAttributes } from "src/interfaces/post.interface";
import tagsService, { TagAttributes } from "services/tags.service";
import { Box, Button, Snackbar, SxProps, Typography } from "@mui/material";
import { upsert } from "services/posts.service";
import { USERNAME } from "constants/localStorage";

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
}[] = [
  {
    name: "title",
    displayName: "Recipe name",
    rules: { required: true },
    sx: styles.smallTextField,
  },
  {
    name: "ingredients",
    displayName: "Ingredients",
    rules: {
      required: true,
    },
    sx: styles.bigTextField,
    placeholder: "Enter your ingredients",
  },
  {
    name: "instructions",
    displayName: "instructions",
    rules: {
      required: true,
    },
    sx: styles.bigTextField,
    placeholder: "Enter the details of your recipe",
  },
  {
    name: "tags",
    displayName: "Tags",
    sx: styles.tagsBox,
  },
];

const EditPost = (post?: PostAttributes) => {
  const [banner, setBanner] = useState(false);
  const { control, formState, setValue, getValues, watch } =
    useForm<PostFormAttributes>({
      defaultValues: post ?? defaultValues,
      mode: "all",
    });

  const watchedTags = watch("tags");

  const { data: tags } = useQuery(QUERY_KEYS.TAGS, tagsService.getAll, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const onSave = async () => {
    try {
      await upsert({
        ...getValues(),
        author: localStorage.getItem(USERNAME) ?? "",
      } as PostAttributes);
    } catch (_err) {
      setBanner(true);
    }
  };

  return (
    <Box sx={styles.root}>
      {/* TOOD add dropzone */}
      <Box sx={styles.recipeBox}>
        <Box sx={styles.innerDisplay}>
          {FORM_FIELDS.map(({ name, rules, displayName, sx, placeholder }) => (
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
          ))}
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
