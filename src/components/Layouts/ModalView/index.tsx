import { ReactNode } from "react";
import { Modal, ModalProps, TouchableWithoutFeedback } from "react-native";

import { Box } from "native-base";
import { THEME } from "~/styles/theme";

interface ModalViewProps extends ModalProps {
  children: ReactNode;
  visible: boolean;
  closeModal: () => void;
  modalMarginTop?: number;
}

export const ModalView = ({
  children,
  closeModal,
  modalMarginTop = 100,
  visible,
  animationType = "slide",
  ...rest
}: ModalViewProps) => {
  return (
    <Modal
      transparent
      animationType={animationType}
      statusBarTranslucent
      visible={visible}
      {...rest}
    >
      <TouchableWithoutFeedback
        onPress={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <Box bgColor={THEME.colors.overlay} flex={1}>
          <Box flex={1} mt={modalMarginTop}>
            <Box bgColor={THEME.colors.white} flex={1} borderTopRadius={"lg"}>
              <Box
                w={39}
                h={"2px"}
                borderRadius={2}
                background={THEME.colors.primary["900"]}
                alignSelf={"center"}
                mt={13}
              />

              {children}
            </Box>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
