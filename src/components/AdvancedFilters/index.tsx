import {
  Box,
  Button,
  FlatList,
  Flex,
  HStack,
  Text,
  VStack,
  View,
} from "native-base";
import {
  Buildings,
  HouseLine,
  HouseSimple,
  Student,
  UsersThree,
} from "phosphor-react-native";
import { TouchableHighlight, TouchableNativeFeedback } from "react-native";
import { CirculedIcon } from "~/screens/RoutesScreen/styles";
import { THEME } from "~/styles/theme";
import { BoxButton } from "../BoxButton";
import { ICity, IFilters } from "~/screens/RoutesScreen";
import { Dispatch, SetStateAction, useState } from "react";
import CidadesMock from "~/mock/CidadesMock";

import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import {
  formatDate,
  formatHoursDataMin,
  formatHoursMinutes,
} from "~/utils/format";
import { InputTime } from "./styles";

interface AdvancedFiltersProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const AdvancedFilters = ({
  filters,
  setFilters,
}: AdvancedFiltersProps) => {
  // const [favorite, setFavorite] = useState(route?.favorite);
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    console.log(new Date());
    setFilters((prev) => ({
      ...prev,
      time: currentDate,
    }));
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: filters.time,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

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
      <VStack>
        <HStack space={2} mt={3}>
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
                  size={14}
                  color={
                    filters.kindPeople == "todos"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                  weight="bold"
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
                  size={14}
                  color={
                    filters.kindPeople == "estudantes"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                  weight="bold"
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
        <HStack space={2} mt={2} paddingY={0}>
          <TouchableNativeFeedback
            onPress={() =>
              setFilters((prev) => ({ ...prev, kindRoute: "todos" }))
            }
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon
                borderColor={
                  filters.kindRoute == "todos"
                    ? THEME.colors.primary["500"]
                    : undefined
                }
              >
                <HouseSimple
                  size={14}
                  color={
                    filters.kindRoute == "todos"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                  weight="bold"
                />
              </CirculedIcon>

              <Text
                fontSize="sm"
                fontWeight={"500"}
                fontFamily="medium"
                color={
                  filters.kindRoute == "todos"
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
              setFilters((prev) => ({ ...prev, kindRoute: "municipal" }))
            }
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon
                borderColor={
                  filters.kindRoute == "municipal"
                    ? THEME.colors.primary["500"]
                    : undefined
                }
              >
                <HouseLine
                  size={14}
                  color={
                    filters.kindRoute == "municipal"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                  weight="bold"
                />
              </CirculedIcon>
              <Text
                fontSize="sm"
                fontWeight={"500"}
                fontFamily="medium"
                color={
                  filters.kindRoute == "municipal"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              >
                Municipal
              </Text>
            </Flex>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() =>
              setFilters((prev) => ({ ...prev, kindRoute: "intermunicipal" }))
            }
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon
                borderColor={
                  filters.kindRoute == "intermunicipal"
                    ? THEME.colors.primary["500"]
                    : undefined
                }
              >
                <Buildings
                  size={14}
                  color={
                    filters.kindRoute == "intermunicipal"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                  weight="bold"
                />
              </CirculedIcon>
              <Text
                fontSize="sm"
                fontWeight={"500"}
                fontFamily="medium"
                color={
                  filters.kindRoute == "intermunicipal"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              >
                Intermunicipal
              </Text>
            </Flex>
          </TouchableNativeFeedback>
        </HStack>
      </VStack>
      {/* cidades */}
      <VStack mt={2}>
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
      <View mt={2}>
        {/* <Button onPress={showDatepicker}>a</Button> */}
        <HStack space={2}>
          <InputTime
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(216, 216, 216)" : "transparent",
              },
            ]}
            onPress={() => showMode("date")}
          >
            <HStack alignItems={"center"} space={1}>
              <View>
                <Text fontSize={"sm"} fontWeight={500} color={"gray.800"}>
                  Data:
                </Text>
              </View>
              <Text color={"gray.800"}>{formatDate(filters.time)}</Text>
            </HStack>
          </InputTime>

          <InputTime
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(216, 216, 216)" : "transparent",
              },
            ]}
            onPress={() => showMode("time")}
          >
            <HStack alignItems={"center"} space={1}>
              <View>
                <Text fontSize={"sm"} fontWeight={500} color={"gray.800"}>
                  Hora:
                </Text>
              </View>
              <Text color={"gray.800"}>{formatHoursMinutes(filters.time)}</Text>
            </HStack>
          </InputTime>
        </HStack>
      </View>
    </View>
  );
};
