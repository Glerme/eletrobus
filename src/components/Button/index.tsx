import { Heading, IButtonProps, Button as RNButton } from "native-base";

interface ButtonProps extends IButtonProps {
  onPress: () => void;
  title: string;
  fontColor?: string;
}

export const Button = ({ title, onPress, fontColor, ...rest }: ButtonProps) => {
  return (
    <RNButton onPress={onPress} fontSize="sm" rounded="sm" {...rest}>
      <Heading color={fontColor} fontSize="sm">
        {title}
      </Heading>
    </RNButton>
  );
};
