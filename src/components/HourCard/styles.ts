import { Box } from "native-base";
import styled from "styled-components/native";

interface HourContainerProps {
  isToday: boolean;
}

export const HourContainer = styled(Box)<HourContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: ${(props) => (props.isToday ? "2px solid #0dac86" : "none")};

  background: #f1f1f1;
  width: 130px;
  height: 130px;
`;
