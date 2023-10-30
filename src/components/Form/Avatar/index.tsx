import { Avatar as NBAvatar } from "native-base";
import { IAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";

interface AvatarProps extends IAvatarProps {}

export const Avatar = ({ source, ...rest }: AvatarProps) => {
  return (
    <NBAvatar
      source={source ? source : require("~/assets/svg/avatar-not-found.svg")}
      size={"md"}
      {...rest}
    />
  );
};
