import { View } from "native-base";
import styled from "styled-components/native";

interface IProps {
  borderColor?: string;
}

export const Container = styled(View)`
  background-color: #f6f6f6;
  margin: 10px;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  flex: 1;
`;

export const CirculedIcon = styled.View<IProps>`
  border-radius: 100px;
  padding: 2px;
  border: 1.5px solid;
  margin-right: 4px;
  border-color: ${(props) =>
    props.borderColor ? `${props.borderColor}` : "#595959"};
`;
