import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: #dedede;
  display: flex;
  position: relative;
`;

export const BackgroundHeader = styled(LinearGradient)`
  height: 20%;
  margin-bottom: -35%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;
