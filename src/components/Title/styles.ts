import { Heading } from "native-base";
import styled from "styled-components/native";

interface ContainerProps {
  bottomColor?: string;
}

export const ContainerHeading = styled(Heading)<ContainerProps>`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.bottomColor || "#5A42E7"};
  color: ${(props) => props.color || "#595959"};
`;
