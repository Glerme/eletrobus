import { EStatusType } from "~/components/StatusInfo/EStatusType";
import { IRoute } from "~/interfaces/IRoute";

const RotasMock: IRoute[] = [
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
    trafegando: true,
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),

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
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.PARADO,
    tipo: "estudantes",
    trafegando: true,
  },
];
export default RotasMock;
