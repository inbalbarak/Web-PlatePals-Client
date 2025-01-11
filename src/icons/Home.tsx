import { SvgIcon, SvgIconOwnProps } from "@mui/material";

const Home = (props: SvgIconOwnProps & { selected?: boolean }) => (
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
        <mask id="path-1-inside-1_2010_1902" fill="white">
          <path d="M0.25 0H44.25V44H0.25V0Z" />
        </mask>
        <path
          d="M44.25 42H0.25V46H44.25V42Z"
          fill="#FF9B05"
          mask="url(#path-1-inside-1_2010_1902)"
        />
      </>
    )}

    <path
      d="M20.25 30V24H24.25V30H29.25V22H32.25L22.25 13L12.25 22H15.25V30H20.25Z"
      fill={props.selected ? "#FF9B05" : "#C1C1C1"}
    />
  </SvgIcon>
);

export default Home;
