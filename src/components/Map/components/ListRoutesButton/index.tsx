import {
  Box,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { MagnifyingGlass } from "phosphor-react-native";

import { useModal } from "~/hooks/useModal";

import { routesMock } from "~/mock/RotasMock";

import { RouteInterface } from "~/interfaces/Route.interface";

import { Modal } from "~/components/Modal";
import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { Title } from "~/components/Layouts/Title";

import { Container } from "./styles";
import { THEME } from "~/styles/theme";

interface ListRoutesButtonProps {
  onPressRoute: (route: RouteInterface) => void;
}

export const ListRoutesButton = ({ onPressRoute }: ListRoutesButtonProps) => {
  const { handleOpenModal, modalRef } = useModal();

  return (
    <>
      <Container onPress={handleOpenModal}>
        <MaterialIcons name="menu" size={24} color={"#fff"} />
      </Container>

      <Modal
        forwardedRef={modalRef}
        HeaderComponent={
          <VStack px={23} mt={6}>
            <Title size="md" textAlign={"left"}>
              Rotas
            </Title>
          </VStack>
        }
      >
        <VStack px={23} mt={6} mb={6}>
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

          <ScrollView flex={1}>
            <FlatList
              keyExtractor={(item) => `${item.id}`}
              data={routesMock}
              mt={4}
              maxH={"500"}
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
              renderItem={({ item }: { item: RouteInterface }) => (
                <ListItem
                  item={item}
                  onPress={() => onPressRoute(item)}
                  key={item.id}
                />
              )}
            />
          </ScrollView>
        </VStack>
      </Modal>
    </>
  );
};
