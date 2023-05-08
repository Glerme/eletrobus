export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: {
        screen: "driver" | "passenger";
      };
      motorista: undefined;
      passageiro: { orderId: string };
    }
  }
}
