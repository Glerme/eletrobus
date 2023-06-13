import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #ececec;
  display: flex;
  flex: 1;
`;

export const BackgroundHeader = styled(LinearGradient)`
  height: 0px;
  flex: 0.5;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Content = styled.KeyboardAvoidingView`
  flex: 3;
  background-color: #e6e6e6;
`;
