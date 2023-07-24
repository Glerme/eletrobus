import { EStatusInfo } from "~/components/StatusInfo/EStatusInfo";

const RotasMock = [
  {
    id: 1,
    name: "Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusInfo.DISPONIVEL,
    tipo: "todos",
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusInfo.DESCONECTADO,
    tipo: "estudantes",
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusInfo.INDISPONIVEL,
    tipo: "todos",
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusInfo.MANUTENCAO,
    tipo: "estudantes",
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusInfo.PARADO,
    tipo: "estudantes",
  },
];
export default RotasMock;
