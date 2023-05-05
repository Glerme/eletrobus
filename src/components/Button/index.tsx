import React from "react";
import { IButtonProps, Button as RNButton } from "native-base";

interface ButtonProps extends IButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

export const Button = ({ children, onPress, ...rest }: ButtonProps) => {
  return (
    <RNButton onPress={onPress} {...rest}>
      {children}
    </RNButton>
  );
};
