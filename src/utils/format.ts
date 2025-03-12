export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function normalizeCurrency(value: string): number {
  const cleanedString = value.replace(/[^\d,\.]/g, '');
  const normalizedString = cleanedString.replace(',', '.');
  
  return Number(normalizedString);
}