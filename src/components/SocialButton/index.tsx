import { Heading, IButtonProps, Button as RNButton } from "native-base";

import * as S from "./styles";

interface ButtonProps extends IButtonProps {
  onPress: () => void;
  title: string;
}

export const SocialButton = ({ title, onPress }: ButtonProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <S.ImageIcon
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          }}
        />
        <Heading fontSize="sm">{title}</Heading>
      </S.Content>
    </S.Container>
  );
};
