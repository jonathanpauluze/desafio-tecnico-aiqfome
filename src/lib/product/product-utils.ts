export function getOptionInstruction(min?: number, max?: number): string {
  if (min === 1 && max === 1) return 'escolha 1'
  if (min && max && min === max) return `escolha ${min}`
  if (min && max) return `escolha de ${min} a ${max}`
  if (min) return `escolha no mínimo ${min}`
  if (max) return `escolha até ${max}`

  return 'escolha quantos quiser'
}
