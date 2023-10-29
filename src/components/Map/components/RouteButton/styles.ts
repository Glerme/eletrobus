import { IconButton, VStack } from "native-base";
import styled from "styled-components/native";

// import styled from "styled-components";

export const Container = styled(VStack)`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

export const TextItem = styled.TouchableOpacity`
  padding: 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #5a42e7;
`;
