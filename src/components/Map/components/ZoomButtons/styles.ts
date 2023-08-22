import { IconButton, VStack } from "native-base";
import styled from "styled-components";

export const Container = styled(VStack)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

export const IconItem = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5a42e7;
`;
