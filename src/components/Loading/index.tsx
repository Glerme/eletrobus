import React from "react";

import { Center, Spinner } from "native-base";

export const Loading: React.FC = () => {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="secondary.700" />
    </Center>
  );
};
