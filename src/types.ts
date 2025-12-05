export interface Contato {
  id: string;
  nome: string;
  telefone: string;
  imageUrl: string;
}

export type RootStackParamList = {
  Lista: undefined;
  Detalhe: { contato: Contato };
  Formulario: undefined;
};