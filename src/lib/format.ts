export function formatCurrency(valueInCents: number): string {
  return (valueInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
