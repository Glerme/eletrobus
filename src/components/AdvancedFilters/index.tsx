import { Box, FlatList, Flex, HStack, Text, VStack, View } from "native-base";
import { Student, UsersThree } from "phosphor-react-native";
import { TouchableNativeFeedback } from "react-native";
import { CirculedIcon } from "~/screens/RoutesScreen/styles";
import { THEME } from "~/styles/theme";
import { BoxButton } from "../BoxButton";
import { ICity, IFilters } from "~/screens/RoutesScreen";
import { Dispatch, SetStateAction } from "react";
import CidadesMock from "~/mock/CidadesMock";

interface AdvancedFiltersProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const AdvancedFilters = ({
  filters,
  setFilters,
}: AdvancedFiltersProps) => {
  // const [favorite, setFavorite] = useState(route?.favorite);

  const selectCities = (city: ICity) => {
    if (filters.cities.filter((item) => item.id === city.id).length > 0) {
      setFilters((prev) => ({
        ...prev,
        cities: prev.cities.filter((item) => item.id !== city.id),
      }));
      // setCities(cities.filter((item) => item.id !== city.id));
    } else {
      setFilters((prev) => ({ ...prev, cities: [...prev.cities, city] }));
      // setCities((prevCities) => [...prevCities, city]);
    }
  };

  return (
    <View>
      <HStack space={4} paddingY={2} mt={2}>
        <TouchableNativeFeedback
          onPress={() =>
            setFilters((prev) => ({ ...prev, kindPeople: "todos" }))
          }
          background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
        >
          <Flex flexDirection={"row"} alignItems={"center"} p={1}>
            <CirculedIcon
              borderColor={
                filters.kindPeople == "todos"
                  ? THEME.colors.primary["500"]
                  : undefined
              }
            >
              <UsersThree
                size={18}
                color={
                  filters.kindPeople == "todos"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              />
            </CirculedIcon>

            <Text
              fontSize="sm"
              fontWeight={"500"}
              fontFamily="medium"
              color={
                filters.kindPeople == "todos"
                  ? THEME.colors.primary["500"]
                  : THEME.colors.gray["800"]
              }
            >
              Todos
            </Text>
          </Flex>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
          onPress={() =>
            setFilters((prev) => ({ ...prev, kindPeople: "estudantes" }))
          }
          background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
        >
          <Flex flexDirection={"row"} alignItems={"center"} p={1}>
            <CirculedIcon
              borderColor={
                filters.kindPeople == "estudantes"
                  ? THEME.colors.primary["500"]
                  : undefined
              }
            >
              <Student
                size={18}
                color={
                  filters.kindPeople == "estudantes"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              />
            </CirculedIcon>
            <Text
              fontSize="sm"
              fontWeight={"500"}
              fontFamily="medium"
              color={
                filters.kindPeople == "estudantes"
                  ? THEME.colors.primary["500"]
                  : THEME.colors.gray["800"]
              }
            >
              Estudantes
            </Text>
          </Flex>
        </TouchableNativeFeedback>
      </HStack>

      <VStack mt={2}>
        <Box mb={2}>
          <Text
            fontSize={"md"}
            color={THEME.colors.gray["800"]}
            fontWeight={"600"}
          >
            Intermunicipais
          </Text>
        </Box>

        <FlatList
          horizontal
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          data={CidadesMock}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <BoxButton
              item={item}
              isActive={
                filters.cities.filter((city) => city.id === item.id).length > 0
              }
              onPress={() => selectCities(item)}
              key={item.id}
            />
          )}
        />
      </VStack>
    </View>
  );
};
