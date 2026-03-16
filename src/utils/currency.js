const mxnFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const PRICE_PER_UNIT_PRODUCTS = [
  'bolsa organza',
  'caja bautizo',
  'caja acrilica',
  'vela numero personalizada',
]

const normalizeText = (text) =>
  String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export const formatPriceMXN = (value) => {
  if (value === null || value === undefined || value === '') {
    return `${mxnFormatter.format(0)} MXN`
  }

  const parsedValue =
    typeof value === 'number'
      ? value
      : Number(String(value).replace(/,/g, '').replace(/[^0-9.-]/g, ''))

  if (Number.isNaN(parsedValue)) {
    return String(value)
  }

  return `${mxnFormatter.format(parsedValue)} MXN`
}

const shouldAddEachUnit = (productName) => {
  const normalizedName = normalizeText(productName)
  return PRICE_PER_UNIT_PRODUCTS.some((name) => normalizedName.includes(name))
}

export const formatProductPrice = (value, productName) => {
  const formattedPrice = formatPriceMXN(value)
  return shouldAddEachUnit(productName) ? `${formattedPrice} c/u` : formattedPrice
}
