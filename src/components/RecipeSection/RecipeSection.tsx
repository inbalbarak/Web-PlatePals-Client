import { FC } from "react";
import styles from "./RecipeSection.style";
import { Box } from "@mui/material";

interface RecipeSectionProps {
  title: string;
  content: string;
}

const RecipeSection: FC<RecipeSectionProps> = ({ title, content }) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.title}>{title}</Box>
      <Box sx={styles.content}>{content}</Box>
    </Box>
  );
};

export default RecipeSection;
