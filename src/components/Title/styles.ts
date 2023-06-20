import { Heading, View } from "native-base";
import styled from "styled-components/native";

interface TextDetailProps {
  bottomColor?: string;
  bottomWidth?: string;
}

export const ContainerHeading = styled(Heading)`
  color: ${(props) => props.color || "#595959"};
`;

export const TextDetail = styled(View)<TextDetailProps>`
  margin-top: -1px;
  margin-bottom: 3px;
  width: ${(props) => props.bottomWidth || "50px"};
  height: 2px;
  background-color: ${(props) => props.bottomColor || "#5A42E7"};
`;
