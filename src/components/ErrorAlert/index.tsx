import { Alert, Text } from "native-base";

interface ErrorAlertProps {
  text?: string;
  error?: any;
}

export const ErrorAlert = ({ text, error }: ErrorAlertProps) => {
  if (error) console.error(error);

  return (
    <Alert colorScheme={"error"} status="error">
      <Alert.Icon size={22} />
      <Text fontSize="md" fontWeight="medium" color="coolGray.800">
        {text ??
          "Erro ao carregar os dados, por favor tente novamente mais tarde."}
      </Text>
    </Alert>
  );
};
