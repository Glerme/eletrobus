import { EStatus } from "~/components/Status/EStatus";

const RotasMock = [
  {
    id: 1,
    name: "Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatus.DISPONIVEL,
    tipo: "todos",
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatus.DESCONECTADO,
    tipo: "estudantes",
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatus.INDISPONIVEL,
    tipo: "todos",
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: EStatus.MANUTENCAO,
    tipo: "estudantes",
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: EStatus.PARADO,
    tipo: "estudantes",
  },
];
export default RotasMock;
