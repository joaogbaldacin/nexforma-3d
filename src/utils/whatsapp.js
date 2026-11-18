/**
 * Centralized WhatsApp utilities for NexForma.3D
 */

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5519989690055'

export const GENERAL_MESSAGE = 'Olá! Vim pelo site da NexForma.3D e gostaria de solicitar um orçamento personalizado de impressão 3D. Já tenho uma ideia/arquivo do que preciso!'

/**
 * Creates a WhatsApp URL for any message text
 * @param {string} message
 * @returns {string}
 */
export const createWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Returns the general quote WhatsApp link
 * @returns {string}
 */
export const getGeneralWhatsAppUrl = () => {
  return createWhatsAppUrl(GENERAL_MESSAGE)
}

/**
 * Generates dynamic WhatsApp message and URL based on product properties
 * @param {object} product
 * @returns {string}
 */
export const getProductWhatsAppUrl = (product) => {
  if (!product) return getGeneralWhatsAppUrl()

  const name = product.name || 'Produto'
  const price = product.price
  const priceValue = product.priceValue || ''

  // Check if item has custom/quote-based price (e.g. engineering parts)
  const isCustomPrice = (!price || price <= 0) && (!priceValue || priceValue.toLowerCase().includes('sob medida'))

  if (isCustomPrice) {
    return createWhatsAppUrl(
      `Olá! Vim pelo site da NexForma.3D e tenho interesse em *${name}* (Sob Medida). Gostaria de solicitar um orçamento personalizado!`
    )
  }

  // Format price string
  let formattedPrice = ''
  if (typeof price === 'number' && price > 0) {
    formattedPrice = price.toFixed(2).replace('.', ',')
  } else if (typeof priceValue === 'string') {
    formattedPrice = priceValue.replace(/^R\$\s*/i, '').trim()
  }

  const stock = typeof product.stock === 'number' ? product.stock : 0

  if (stock > 0) {
    return createWhatsAppUrl(
      `Olá! Vim pelo site da NexForma.3D e tenho interesse no modelo *${name}* (Pronta entrega - R$ ${formattedPrice}). Gostaria de ver as opções de cores e finalizar o pedido!`
    )
  } else {
    return createWhatsAppUrl(
      `Olá! Vim pelo site da NexForma.3D e gostaria de encomendar o modelo *${name}* (Produção sob encomenda - R$ ${formattedPrice}). Qual o prazo de envio para o meu CEP?`
    )
  }
}
