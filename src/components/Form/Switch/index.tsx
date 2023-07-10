import { HStack, Switch as NBSwitch, Text } from "native-base";
import { InterfaceSwitchProps } from "native-base/lib/typescript/components/primitives/Switch/types";

import { THEME } from "~/styles/theme";

interface SwitchProps extends InterfaceSwitchProps {
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

export const Switch = ({ label, ...rest }: SwitchProps) => {
  return (
    <HStack alignItems={"center"} space={2}>
      <Text color={THEME.colors.gray["900"]}>{label}</Text>
      <NBSwitch {...rest} />
    </HStack>
  );
};
