import React from "react";

import { Input as NativeBaseInput, IInputProps } from "native-base";

interface InputProps extends IInputProps {}

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <NativeBaseInput
      size="md"
      borderWidth={2}
      fontSize="md"
      fontFamily="body"
      color="gray.900"
      placeholderTextColor="gray.700"
      _focus={{
        borderWidth: 2,
        borderColor: "primary.400",
      }}
      {...rest}
    />
  );
};
