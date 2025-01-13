import { SvgIcon, SvgIconOwnProps } from "@mui/material";

const Home = (props: SvgIconOwnProps & { selected?: boolean }) => (
  <SvgIcon
    width="88" // Increased size
    height="88" // Increased size
    viewBox="0 0 88 88" // Updated viewBox to match the new size
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props.selected && (
      <>
        <mask id="path-1-inside-1_2010_1902" fill="white">
          <path d="M0.5 0H88.5V88H0.5V0Z" />{" "}
          {/* Adjusted for the new viewBox */}
        </mask>
        <path
          d="M88.5 84H0.5V92H88.5V84Z" // Adjusted dimensions
          fill="#FF9B05"
          mask="url(#path-1-inside-1_2010_1902)"
        />
      </>
    )}

    <path
      d="M40.5 60V48H48.5V60H58.5V44H64.5L44.5 26L24.5 44H30.5V60H40.5Z"
      fill={props.selected ? "#FF9B05" : "#C1C1C1"}
    />
  </SvgIcon>
);

export default Home;
