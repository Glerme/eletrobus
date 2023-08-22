import styled from "styled-components/native";

export const Container = styled.TouchableWithoutFeedback`
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
`;

export const Content = styled.View`
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: $white;
`;

export const ImageIcon = styled.Image`
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
`;
