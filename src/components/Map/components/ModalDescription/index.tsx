import { useState } from "react";
import { Box, HStack, Image, Spacer, Text, VStack } from "native-base";

import { Modalize } from "react-native-modalize";

import { IMarker } from "~/interfaces/IMap";

import { Modal } from "~/components/Modal";
import { Title } from "~/components/Layouts/Title";
import { TypeRoute } from "~/components/TypeRoute";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

interface ModalDescriptionProps {
  data: IMarker | null;
  forwardedRef: React.RefObject<Modalize>;
}

export const ModalDescription = ({
  data,
  forwardedRef,
}: ModalDescriptionProps) => {
  if (!data) return null;

  const [favorite, setFavorite] = useState(data?.favorite ?? false);

  const handleFavoritePoint = () => {
    setFavorite(!favorite);
  };

  return (
    <Modal forwardedRef={forwardedRef}>
      <VStack px={23} mt={6} mb={4} space={2}>
        <HStack alignItems={"center"}>
          <Title size="md" textAlign={"left"}>
            {data?.title}
          </Title>

          <Spacer />

          <FavoriteButton
            favorite={favorite}
            handlePress={handleFavoritePoint}
          />
        </HStack>

        <Box
          width={"full"}
          p={2}
          borderWidth={2}
          borderRadius={4}
          borderColor={"primary.400"}
        >
          <Image
            source={
              data?.image
                ? { uri: data?.image }
                : require("~/assets/img/not-found.png")
            }
            alt={data?.title}
            w={"full"}
            h={"150"}
            resizeMode={"contain"}
          />
        </Box>

        <HStack alignItems="center" space="1">
          <TypeRoute tipo={data?.tipo} />
          <Spacer />
          <StatusInfo statusCorrida={data?.status} />
        </HStack>

        <Box width={"full"} mt={1}>
          <Box>
            <Text bold fontSize={"md"}>
              Descrição:
            </Text>

            <Text fontSize={"md"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              excepturi odit error debitis placeat, numquam quae commodi eum
              sapiente accusamus.
            </Text>
          </Box>
        </Box>
      </VStack>
    </Modal>
  );
};

// export const ModalDescription = forwardRef<Modalize, ModalDescriptionProps>(
//   ({ data, forwardedRef }, ref) => {
//     if (!data) return null;

//     const [favorite, setFavorite] = useState(data?.favorite ?? false);

//     const handleFavoritePoint = () => {
//       setFavorite(!favorite);
//     };

//     return (
//       <Modal forwardedRef={forwardedRef}>
//         <VStack px={23} mt={6} mb={4} space={2}>
//           <HStack alignItems={"center"}>
//             <Title size="md" textAlign={"left"}>
//               {data?.title}
//             </Title>

//             <Spacer />

//             <FavoriteButton
//               favorite={favorite}
//               handlePress={handleFavoritePoint}
//             />
//           </HStack>

//           <Box
//             width={"full"}
//             p={2}
//             borderWidth={2}
//             borderRadius={4}
//             borderColor={"primary.400"}
//           >
//             <Image
//               source={
//                 data?.image
//                   ? { uri: data?.image }
//                   : require("~/assets/img/not-found.png")
//               }
//               alt={data?.title}
//               w={"full"}
//               h={"150"}
//               resizeMode={"contain"}
//             />
//           </Box>

//           <HStack alignItems="center" space="1">
//             <TypeRoute tipo={data?.tipo} />
//             <Spacer />
//             <StatusInfo statusCorrida={data?.status} />
//           </HStack>

//           <Box width={"full"} mt={1}>
//             <Box>
//               <Text bold fontSize={"md"}>
//                 Descrição:
//               </Text>

//               <Text fontSize={"md"}>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
//                 excepturi odit error debitis placeat, numquam quae commodi eum
//                 sapiente accusamus.
//               </Text>
//             </Box>

//             <Box></Box>
//           </Box>
//         </VStack>
//       </Modal>
//     );
//   }
// );
