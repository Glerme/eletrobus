import Constants from "expo-constants";
import styled from "styled-components/native";

const headerHeight = 20;

export const StatusBarBackground = styled.View`
  background: #0dac86;
  padding-top: ${Constants.statusBarHeight}px;
  height: ${Constants.statusBarHeight + headerHeight}px;
`;
