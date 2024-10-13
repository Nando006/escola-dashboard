export interface ITextField {
  name: string;
  label: string;
  placeholder?: string;
  icon?: string;
  iconSize?: number;
  typeField: 'text' | 'email';
  maskType?: 'cpf' | 'cnpj' | 'cep' | 'phone';
  max?: number;
};