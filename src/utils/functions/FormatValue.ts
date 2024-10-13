export default function FormatValue(value: string, maskType: string): string {
  value = value.replace(/\D/g, '');
  
  switch(maskType.toLowerCase()) {
    case 'cpf':
      // Aplica a formatação do CPF
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    break;
    case 'cnpj':
      // Aplica a formatação do CNPJ
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    break;
    case 'cep':
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    break;
    case 'phone':
      if (value.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        // Celular: (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
      };    
    break;
    default:
      
    break;
  };
  return value;
};