import { EStatusType } from "~/components/StatusInfo/EStatusType";

const RotasMock = [
  {
    id: 1,
    name: "Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusType.DISPONIVEL,
    tipo: "todos",
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusType.DESCONECTADO,
    tipo: "estudantes",
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusType.INDISPONIVEL,
    tipo: "todos",
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusType.MANUTENCAO,
    tipo: "estudantes",
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatusType.PARADO,
    tipo: "estudantes",
  },
];
export default RotasMock;
