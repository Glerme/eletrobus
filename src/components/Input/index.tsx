import { Input as RNInput, IInputProps } from "native-base";

interface InputProps extends IInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const Input = ({
  onChangeText,
  placeholder,
  value,
  ...rest
}: InputProps) => {
  return (
    <RNInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...rest}
    />
  );
};
