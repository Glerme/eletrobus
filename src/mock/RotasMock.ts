import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { IBusRoute } from "~/interfaces/IBusRoute";

const RotasMock: IBusRoute[] = [
  {
    id: 1,
    name: "Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.EM_MOVIMENTO,
    tipo: "todos",
    trafegando: true,
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.DESCONECTADO,
    tipo: "estudantes",
    trafegando: false,
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.INDISPONIVEL,
    tipo: "todos",
    trafegando: false,
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.MANUTENCAO,
    tipo: "estudantes",
    trafegando: true,
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date("2023-08-07T12:00:00"),
    chegada: new Date(),
    statusCorrida: EStatusType.PARADO,
    tipo: "estudantes",
    trafegando: false,
  },
];

export default RotasMock;
