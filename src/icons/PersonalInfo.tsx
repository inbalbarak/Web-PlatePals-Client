import { SvgIcon, SvgIconOwnProps } from "@mui/material";

const PersonalInfo = (props: SvgIconOwnProps & { selected?: boolean }) => (
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
        <mask id="path-1-inside-1_2010_1748" fill="white">
          <path d="M0 0H44V44H0V0Z" />
        </mask>
        <path
          d="M44 43H0V45H44V43Z"
          fill="#FF9B05"
          mask="url(#path-1-inside-1_2010_1748)"
        />
      </>
    )}
    <path
      d="M22 14C23.0609 14 24.0783 14.4214 24.8284 15.1716C25.5786 15.9217 26 16.9391 26 18C26 19.0609 25.5786 20.0783 24.8284 20.8284C24.0783 21.5786 23.0609 22 22 22C20.9391 22 19.9217 21.5786 19.1716 20.8284C18.4214 20.0783 18 19.0609 18 18C18 16.9391 18.4214 15.9217 19.1716 15.1716C19.9217 14.4214 20.9391 14 22 14ZM22 24C26.42 24 30 25.79 30 28V30H14V28C14 25.79 17.58 24 22 24Z"
      fill={props.selected ? "#FF9B05" : "#C1C1C1"}
    />
  </SvgIcon>
);

export default PersonalInfo;
