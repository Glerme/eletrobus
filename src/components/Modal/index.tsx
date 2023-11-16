import { forwardRef } from "react";
import { Platform } from "react-native";

import { Portal } from "react-native-portalize";
import { Modalize, ModalizeProps } from "react-native-modalize";

interface ModalProps extends ModalizeProps {
  forwardedRef: React.RefObject<Modalize>;
  children: React.ReactNode;
}

export const Modal = forwardRef<Modalize, ModalProps>(
  (
    {
      forwardedRef,
      children,
      adjustToContentHeight = true,
      modalHeight,
      ...rest
    },
    ref
  ) => {
    const returnTrueThenFalse = () =>
      new Promise((resolve) => setTimeout(() => resolve(false), 1000));

    const handleAvoidKeyboardLikeIOS = () => {
      return Platform.OS === "ios"
        ? true
        : (returnTrueThenFalse().then() as unknown as boolean);
    };

    const modalHeightParsed = adjustToContentHeight ? undefined : modalHeight;

    return (
      <Portal>
        <Modalize
          closeOnOverlayTap={true}
          ref={forwardedRef}
          adjustToContentHeight={adjustToContentHeight}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          avoidKeyboardLikeIOS={handleAvoidKeyboardLikeIOS()}
          modalHeight={modalHeightParsed}
          {...rest}
        >
          {children}
        </Modalize>
      </Portal>
    );
  }
);
