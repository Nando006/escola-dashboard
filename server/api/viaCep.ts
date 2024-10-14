export default async function ViaCep(cep: string) {
  try {
    if (cep && cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        console.log('CEP não encontrado');
        return null;
      }

      return data;
    }
    return null;
  } catch (err) {
    console.log('Algo de errado', err);
    return null;
  }
}