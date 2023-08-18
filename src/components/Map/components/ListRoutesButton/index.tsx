import { TouchableNativeFeedback } from "react-native";

import {
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { useModal } from "~/hooks/useModal";

import { MagnifyingGlass } from "phosphor-react-native";

import { Modal } from "~/components/Modal";
import { Input } from "~/components/Form/Input";
import { Title } from "~/components/Layouts/Title";

import { Container } from "./styles";
import { THEME } from "~/styles/theme";

interface ListRoutesButtonProps {}

export const ListRoutesButton = ({}: ListRoutesButtonProps) => {
  const { handleOpenModal, modalRef } = useModal();

  const arrayDeObjetos = [];

  for (let i = 1; i <= 50; i++) {
    arrayDeObjetos.push({ value: i });
  }

  return (
    <>
      <Container onPress={handleOpenModal}>
        <MaterialIcons name="menu" size={24} color={"#fff"} />
      </Container>

      <Modal forwardedRef={modalRef}>
        <VStack px={23} mt={6} mb={6}>
          <Title size="md" textAlign={"left"}>
            Rotas
          </Title>

          <HStack
            mt={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            space={2}
          >
            <Input flex={1} />
            <IconButton
              borderWidth={1}
              borderColor={"transparent"}
              h={"full"}
              w={"16"}
              display={"flex"}
              alignItems={"center"}
              background={THEME.colors.primary["50"]}
              borderRadius={6}
              _pressed={{
                backgroundColor: THEME.colors.primary["100"],
              }}
            >
              <Icon as={<MagnifyingGlass size={22} />} />
            </IconButton>
          </HStack>

          <FlatList
            data={arrayDeObjetos}
            keyExtractor={(item) => `${item.value}`}
            mt={4}
            maxH={"500px"}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={() => (
              <Box
                flex={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  Nenhuma rota encontrada
                </Text>
              </Box>
            )}
            contentContainerStyle={{
              paddingBottom: 16,
            }}
            borderWidth={1}
            borderRadius={4}
            borderColor={"gray.400"}
            p={2}
            renderItem={({ item, index }) => (
              <TouchableNativeFeedback key={index}>
                <Box padding={"4"}>
                  <Text>{item.value}</Text>
                </Box>
              </TouchableNativeFeedback>
            )}
          />
        </VStack>
      </Modal>
    </>
  );
};
