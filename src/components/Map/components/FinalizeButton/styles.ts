import { IconButton, VStack } from "native-base";
import styled from "styled-components/native";

// import styled from "styled-components";

export const Container = styled(VStack)`
  position: absolute;
  bottom: 20px;
  left: 10px;
  z-index: 1;
`;

export const TextFinalize = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  background-color: #ff4c4c;
`;
