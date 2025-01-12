import { SvgIcon, SvgIconOwnProps } from "@mui/material";

const Post = (props: SvgIconOwnProps) => (
  <SvgIcon
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0.5" width="44" height="44" rx="22" fill="#FF9B05" />
    <path
      d="M29.5 23H23.5V29H21.5V23H15.5V21H21.5V15H23.5V21H29.5V23Z"
      fill="white"
    />
  </SvgIcon>
);

export default Post;
