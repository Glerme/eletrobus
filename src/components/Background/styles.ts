import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: #ececec;
  display: flex;
  position: relative;
`;

export const BackgroundHeader = styled(LinearGradient)`
  height: 10%;
  margin-bottom: -18%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const Content = styled.KeyboardAvoidingView`
  /* flex: 1; */
  margin-bottom: 100px;
`;
