import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const BackgroundSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={390}
    height={809}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#F7F7F7" d="M0 0h390v809H0z" />
      <G filter="url(#b)">
        <Path fill="#fff" d="M0 0h390v-1H0z" />
      </G>
      <Path fill="#0DAC86" d="M0 0h390v196a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h390v809H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BackgroundSvg;
