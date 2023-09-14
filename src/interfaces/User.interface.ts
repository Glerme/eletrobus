export interface UserProps {
  email: string;
  family_name?: string;
  given_name?: string;
  id: string;
  locale?: string;
  name: string;
  picture?: string | null;
  verified_email?: boolean;
  favorite?: [] | null; //array de ponto e onibus
  driver: Driver | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Driver {
  cpf: string;
  cnh: string;
}
