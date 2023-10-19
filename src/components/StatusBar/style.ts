import Constants from "expo-constants";
import styled from "styled-components/native";

const headerHeight = 20;

interface StatusBarBackgroundProps {
  backgroundIos?: string;
}

export const StatusBarBackground = styled.View<StatusBarBackgroundProps>`
  background: ${({ backgroundIos }) =>
    backgroundIos ? backgroundIos : "#0dac86"};
  padding-top: ${Constants.statusBarHeight}px;
  height: ${Constants.statusBarHeight + headerHeight}px;
`;
