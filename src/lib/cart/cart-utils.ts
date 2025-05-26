type GroupedExtras = Record<string, { label: string; price: number }[]>

export function groupExtrasByGroup(
  extras: { group: string; label: string; price: number }[]
): GroupedExtras {
  return extras.reduce<GroupedExtras>((acc, extra) => {
    if (!acc[extra.group]) {
      acc[extra.group] = []
    }
    acc[extra.group].push({ label: extra.label, price: extra.price })
    return acc
  }, {})
}
