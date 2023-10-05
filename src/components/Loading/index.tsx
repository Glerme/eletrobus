import React from "react";

import { Center, Spinner } from "native-base";

export const Loading: React.FC = () => {
  return (
    <Center flex={1} bg="white">
      <Spinner color="primary.700" size={"lg"} />
    </Center>
  );
};
