import { ScrollView } from "native-base";
import { InterfaceScrollViewProps } from "native-base/lib/typescript/components/basic/ScrollView/types";

interface ScreenContentProps extends InterfaceScrollViewProps {
  children: React.ReactNode;
}

export const ScrollViewContainer = ({
  children,
  ...rest
}: ScreenContentProps) => {
  return (
    <ScrollView
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
