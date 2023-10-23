import React from "react";

import { Input as NativeBaseInput, IInputProps } from "native-base";

interface InputProps extends IInputProps {}

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <NativeBaseInput
      size="md"
      borderWidth={1}
      borderColor={"gray.600"}
      fontSize="md"
      fontWeight={"semibold"}
      fontFamily="body"
      borderRadius={6}
      color="gray.900"
      placeholderTextColor="gray.700"
      _focus={{
        borderWidth: 1,
        borderColor: "primary.200",
      }}
      {...rest}
    />
  );
};
