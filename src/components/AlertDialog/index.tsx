import { useRef, useState } from "react";

import { AlertDialog as NBAlertDialog, Button, Center } from "native-base";

interface AlertDialogProps {
  // onClose: () => void;
}

export const AlertDialog = ({}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  return (
    <Center>
      <Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Customer
      </Button>
      <NBAlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <NBAlertDialog.Content>
          <NBAlertDialog.CloseButton />
          <NBAlertDialog.Header>Delete Customer</NBAlertDialog.Header>
          <NBAlertDialog.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </NBAlertDialog.Body>
        </NBAlertDialog.Content>
      </NBAlertDialog>
    </Center>
  );
};
