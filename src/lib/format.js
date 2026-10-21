export function formatPrice(value) {
  const amount = Number(value) || 0
  return `${amount.toLocaleString('ru-RU')} ₸`
}

export function formatDate(iso) {
  return new Date(iso).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
