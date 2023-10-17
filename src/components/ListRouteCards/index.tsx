import { Box, FlatList, HStack, Text, VStack } from "native-base";

interface ListRouteCardsProps {
  description: string;
  data: any[];
  cardComponent: React.FC<any>;
  onPressCard: (item: any) => void;
}

export const ListRouteCards = ({
  data,
  description,
  cardComponent: CardComponent,
  onPressCard,
}: ListRouteCardsProps) => {
  return (
    <>
      <VStack mt="2" mb="2">
        <HStack py="2" justifyContent="space-between" alignItems="center">
          <Text
            fontSize={"md"}
            fontWeight={"600"}
            color="gray.900"
            lineHeight={"md"}
          >
            {description}
          </Text>
        </HStack>

        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          ListEmptyComponent={() => (
            <Box
              flex={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontSize={"md"} fontWeight={"medium"} alignItems={"center"}>
                Nenhum item encontrado
              </Text>
            </Box>
          )}
          ItemSeparatorComponent={() => <Box w={2} />}
          renderItem={({ item, index }) => (
            <CardComponent
              key={index}
              data={item}
              onPressCard={() => onPressCard(item)}
            />
          )}
        />
      </VStack>
    </>
  );
};
