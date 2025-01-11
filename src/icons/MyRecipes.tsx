import { SvgIcon, SvgIconOwnProps } from "@mui/material";

const MyRecipes = (props: SvgIconOwnProps & { selected?: boolean }) => (
  <SvgIcon
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props.selected && (
      <>
        <mask id="path-1-inside-1_2007_482" fill="white">
          <path d="M0.75 0H44.75V44H0.75V0Z" />
        </mask>
        <path
          d="M44.75 43H0.75V45H44.75V43Z"
          fill="#FF9B05"
          mask="url(#path-1-inside-1_2007_482)"
        />
      </>
    )}

    <path
      d="M13.75 32V13H31.75V32L28.75 30L25.75 32L22.75 30L19.75 32L16.75 30L13.75 32ZM27.75 19V17H25.75V19H27.75ZM23.75 19V17H17.75V19H23.75ZM23.75 21H17.75V23H23.75V21ZM25.75 23H27.75V21H25.75V23Z"
      fill={props.selected ? "#FF9B05" : "#C1C1C1"}
    />
  </SvgIcon>
);

export default MyRecipes;
