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

import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass, List } from "phosphor-react-native";

import { useModal } from "~/hooks/useModal";

import { api } from "~/services/axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { Modal } from "~/components/Modal";
import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { Title } from "~/components/Layouts/Title";

import { Container } from "./styles";
import { THEME } from "~/styles/theme";

interface ListRoutesButtonProps {
  onPressRoute: (route: BusStopInterface) => void;
}

export const ListRoutesButton = ({ onPressRoute }: ListRoutesButtonProps) => {
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

  const { data, isLoading, isError, error } = useQuery<BusStopInterface[]>({
    queryKey: ["bus-stop"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface[]>("/bus-stop");
      return data;
    },
  });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    console.error(error);

    return <></>;
  }

  return (
    <>
      <Container onPress={handleOpenModal}>
        <List size={24} color={"#fff"} />
      </Container>

      <Modal
        forwardedRef={modalRef}
        HeaderComponent={
          <VStack px={23} mt={6}>
            <Title size="md" textAlign={"left"}>
              Pontos
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
              data={data}
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
              renderItem={({ item }: { item: BusStopInterface }) => (
                <ListItem
                  item={item}
                  onPress={() => {
                    onPressRoute(item);
                    handleCloseModal();
                  }}
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
