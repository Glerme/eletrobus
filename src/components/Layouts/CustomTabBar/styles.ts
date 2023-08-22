import { Box } from "native-base";
import styled from "styled-components/native";

export const Container = styled(Box)`
  justify-content: center;
  align-items: center;
`;

export const Content = styled(Box)`
  position: absolute;
  background-color: #171626;
  border-top-width: 0;

  z-index: 10;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0;
`;

export const ButtonTab = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
