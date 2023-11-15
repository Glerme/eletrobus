import { Button, HStack, Text, VStack } from "native-base";
import { Modal } from "../Modal";
import { Title } from "../Layouts/Title";
import { THEME } from "~/styles/theme";

interface ModalStatementProps {
  modalRef: any;
  handleCloseModal: any;
  title: string;
  description: string;
  fnStatement: () => void;
}

export const ModalStatement = ({
  modalRef,
  handleCloseModal,
  title,
  description,
  fnStatement,
}: ModalStatementProps) => {
  return (
    <Modal
      forwardedRef={modalRef}
      HeaderComponent={
        <VStack px={23} mt={6}>
          <Title size="md" textAlign={"left"}>
            {title}
          </Title>
        </VStack>
      }
    >
      <VStack px={23} mt={6} mb={6}>
        <Text fontSize="md" color="black">
          {description}
        </Text>

        <HStack space={2} mt={2}>
          <Button
            flex={1}
            h={12}
            colorScheme="primary"
            bg="red.600"
            onPress={handleCloseModal}
          >
            <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
              Não
            </Text>
          </Button>
          <Button
            flex={1}
            h={12}
            colorScheme="primary"
            bg={THEME.colors.primary["500"]}
            onPress={fnStatement}
          >
            <HStack space={1} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                Sim
              </Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};
