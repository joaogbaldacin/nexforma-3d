import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Fallback initial catalog with default stock and featured flags
export const INITIAL_FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Vaso Escultural Voronoi Prism',
    category: 'decoracao',
    categoryLabel: 'Decoração & Design',
    badge: 'Design Autoral',
    description: 'Geometria fluida com favos orgânicos e acabamento acetinado. Adiciona sofisticação e leveza contemporânea a salas, estantes ou mesas de centro.',
    highlight: 'Acabamento acetinado ao toque',
    materialHighlight: 'PLA Silk Premium Perolado',
    leadTimeBadge: 'Pronto em até 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 79,00',
    price: 79.00,
    stock: 4,
    is_featured: true,
    svgType: 'vase',
    image_url: '',
    specs: {
      dimensions: '22 cm (Altura) x 13,5 cm (Largura) x 13,5 cm (Profundidade)',
      weight: '190g',
      materialAndFinish: 'PLA Silk Premium Perolado (toque acetinado suave com alto brilho reflexivo e 100% reciclável)',
      colors: ['Prata Perolado', 'Preto Obsidian Fosco', 'Branco Mármore', 'Ciano Neon', 'Dourado Champanhe', 'Sob consulta'],
      notes: 'Produção sob encomenda. Permite ajuste de escala personalizada (de 15cm até 32cm de altura) e impermeabilização interna para flores naturais com água.'
    }
  },
  {
    id: 2,
    name: 'Luminária Lunar Moonlit 3D',
    category: 'presentes',
    categoryLabel: 'Presentes & Colecionáveis',
    badge: 'Mais Desejada',
    description: 'A serenidade da lua no seu quarto. Textura em relevo real dos mares e crateras lunares com luz suave e aconchegante sobre base de madeira maciça.',
    highlight: 'LED suave bivolt com toque suave',
    materialHighlight: 'Translúcido + Base Madeira',
    leadTimeBadge: 'Pronto em até 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 129,00',
    price: 129.00,
    stock: 2,
    is_featured: false,
    svgType: 'moon',
    image_url: '',
    specs: {
      dimensions: 'Esfera Ø 15 cm | Altura total com base: 19 cm',
      weight: '245g (esfera lunar + base em madeira)',
      materialAndFinish: 'PLA Branco Translúcido de Alta Difusão + Base geométrica em madeira maciça nobre tratada',
      colors: ['Luz Branca Quente Aconchegante (3000K)', 'Luz Neutra (4000K)', 'LED RGB Multicores (sob encomenda)'],
      notes: 'Acompanha cabo de alimentação USB e módulo LED touch bivolt de baixo consumo. Textura em relevo tridimensional fiel aos dados topográficos da NASA.'
    }
  },
  {
    id: 3,
    name: 'Suporte Minimalista para Headphone',
    category: 'setup',
    categoryLabel: 'Setup & Utilidades',
    badge: 'Elegância & Ergonomia',
    description: 'Linhas curvas contínuas que abraçam a headband do seu fone sem marcar a espuma. Deixa sua mesa visualmente limpa, organizada e moderna.',
    highlight: 'Canaleta oculta para cabo',
    materialHighlight: 'PETG Matte Anti-Risco',
    leadTimeBadge: 'Pronto em 24h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 68,00',
    price: 68.00,
    stock: 6,
    is_featured: true,
    svgType: 'headphone',
    image_url: '',
    specs: {
      dimensions: '26 cm (Altura) x 14 cm (Largura) x 12 cm (Profundidade)',
      weight: '210g (base com peso de estabilização e grip antiderrapante)',
      materialAndFinish: 'PETG Industrial Matte (alta resistência estrutural, tenacidade e acabamento anti-risco)',
      colors: ['Preto Carbono Matte', 'Cinza Chumbo', 'Branco Gelo', 'Preto com Friso Ciano Neon'],
      notes: 'Apoio superior curvo ergonômico que não deforma a almofada do fone. Inclui canaleta traseira inteligente para retenção do cabo de áudio.'
    }
  },
  {
    id: 4,
    name: 'Kit Organizador Hexagonal de Mesa',
    category: 'setup',
    categoryLabel: 'Setup & Utilidades',
    badge: 'Modular & Magnético',
    description: 'Conjunto de 3 módulos que se conectam suavemente por imãs internos. O equilíbrio perfeito entre harmonia visual e funcionalidade no dia a dia.',
    highlight: 'Encaixe magnético sutil',
    materialHighlight: 'PLA Fosco Aveludado',
    leadTimeBadge: 'Pronto em 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 89,00',
    price: 89.00,
    stock: 0,
    is_featured: false,
    svgType: 'hex',
    image_url: '',
    specs: {
      dimensions: 'Módulo central: 10x9x9 cm | Módulos laterais: 6x9x9 cm (Área útil total: aprox. 22x18 cm)',
      weight: '280g (conjunto com os 3 módulos inclusos)',
      materialAndFinish: 'PLA Fosco Aveludado de Alta Densidade com ímãs de neodímio N52 embutidos',
      colors: ['Preto Obsidian', 'Cinza Grafite', 'Branco Minimalista', 'Verde Militar', 'Ciano Accent'],
      notes: 'Design modular autoral. Os módulos se atraem magneticamente e podem ser reorganizados livremente no setup conforme sua necessidade.'
    }
  },
  {
    id: 5,
    name: 'Miniatura Samurai Shadow Articulada',
    category: 'presentes',
    categoryLabel: 'Presentes & Colecionáveis',
    badge: 'Edição Especial',
    description: 'Para quem ama detalhes minuciosos e peças com personalidade. Mais de 16 articulações firmes que permitem poses dinâmicas sobre a estante.',
    highlight: 'Rica em microdetalhes',
    materialHighlight: 'Resina 8K Ultra Definição',
    leadTimeBadge: 'Pronto em 3 dias',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 139,00',
    price: 139.00,
    stock: 1,
    is_featured: false,
    svgType: 'samurai',
    image_url: '',
    specs: {
      dimensions: '18 cm (Altura) x 9 cm (Largura) x 6 cm (Profundidade)',
      weight: '140g',
      materialAndFinish: 'Resina 8K Ultra Definição (detalhes de microescultura) + Juntas internas em ABS rígido autolubrificante',
      colors: ['Cinza Primer Técnico (pronto para pintura)', 'Preto Shadow com Detalhes Ciano', 'Cobre Envelhecido'],
      notes: 'Peça de colecionador com 16 articulações firmes (ball-joints). Acompanha par de katanas e base circular de exposição personalizada.'
    }
  },
  {
    id: 6,
    name: 'Engrenagem & Peça Técnica de Engenharia',
    category: 'tecnicas',
    categoryLabel: 'Peças Técnicas',
    badge: 'Sob Medida',
    description: 'Solução sob medida para substituição de engrenagens desgastadas ou componentes mecânicos descontinuados, com encaixes exatos e alta resistência.',
    highlight: 'Tolerância milimétrica ±0.05mm',
    materialHighlight: 'Nylon Carbon (PA-CF)',
    leadTimeBadge: 'Sob Demanda',
    pricePrefix: 'Investimento',
    priceValue: 'Sob Medida',
    price: 0,
    stock: 0,
    is_featured: true,
    svgType: 'gear',
    image_url: '',
    specs: {
      dimensions: 'Totalmente personalizável (Padrão catálogo: Ø 85 mm x 24 mm com furo de chaveta Ø 12 mm)',
      weight: '95g a 350g (variável conforme geometria e infill requisitado)',
      materialAndFinish: 'Nylon com Fibra de Carbono (PA-CF) / PETG Reforçado / ABS Industrial',
      colors: ['Preto Carbono Texturizado', 'Natural / Branco Técnico', 'Cinza Mecânico'],
      notes: 'Projetada para tolerâncias mecânicas rigorosas de ±0.05 mm e resistência térmica contínua até 140°C. Envie seu arquivo STL/STEP ou peça física para reprodução.'
    }
  },
  {
    id: 7,
    name: 'Placa Decorativa Letreiro 3D Personalizado',
    category: 'presentes',
    categoryLabel: 'Presentes & Colecionáveis',
    badge: 'Feito sob medida',
    description: 'Nome, logotipo ou frase especial esculpida em relevo tridimensional. Ideal para presentear alguém especial, decorar quartos ou destacar a identidade da sua mesa de trabalho.',
    highlight: 'Relevo 3D de alta definição',
    materialHighlight: 'PLA Premium Bicolor',
    leadTimeBadge: 'Pronto em até 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 89,00',
    price: 89.00,
    stock: 5,
    is_featured: false,
    svgType: 'signboard',
    image_url: '',
    specs: {
      dimensions: '25cm Largura x 8cm Altura x 2,5cm Profundidade (varia conforme o nome)',
      weight: '140g',
      materialAndFinish: 'PLA Premium Bicolor / Acabamento Acetinado (alta fidelidade e contraste visual)',
      colors: ['Preto com Ciano Neon', 'Branco com Dourado', 'Cinza Chumbo', 'Cores sob consulta'],
      notes: 'Personalização total de fonte, texto ou logotipo antes da produção. Enviamos prévia digital 3D para aprovação antes da impressão.'
    }
  },
  {
    id: 8,
    name: 'Engrenagem & Componente Mecânico Sob Medida',
    category: 'tecnicas',
    categoryLabel: 'Peças Técnicas',
    badge: 'Alta precisão milimétrica',
    description: 'Reconstrução e impressão de peças de reposição, engrenagens, suportes estruturais e protótipos funcionais de alta resistência mecânica e térmica.',
    highlight: 'Tolerância milimétrica rigorosa',
    materialHighlight: 'PETG / ABS / Nylon Reforçado',
    leadTimeBadge: 'Produção em 24h a 48h',
    pricePrefix: 'Investimento',
    priceValue: 'Sob Medida',
    price: 0,
    stock: 0,
    is_featured: false,
    svgType: 'mechanical',
    image_url: '',
    specs: {
      dimensions: 'Conforme projeto técnico ou peça original enviada',
      weight: 'Variável conforme preenchimento (Infill de 40% a 100%)',
      materialAndFinish: 'PETG Industrial / ABS / Nylon Reforçado (alta resistência a tração, impacto e temperatura)',
      colors: ['Preto Técnico', 'Cinza Industrial', 'Branco'],
      notes: 'Envie foto com medidas ou arquivo STL/STEP pelo WhatsApp para avaliação técnica e cálculo estrutural.'
    }
  },
  {
    id: 9,
    name: 'Organizador Modular de Mesa & Cabos',
    category: 'setup',
    categoryLabel: 'Setup & Utilidades',
    badge: 'Design funcional',
    description: 'Sistema inteligente com compartimentos para cartões SD, pendrives, canetas e canaletas ocultas para manter seu setup sempre limpo, organizado e produtivo.',
    highlight: 'Gestão integrada de cabos',
    materialHighlight: 'PLA Matte Fosco Antirrisco',
    leadTimeBadge: 'Pronto em até 24h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 59,00',
    price: 59.00,
    stock: 3,
    is_featured: false,
    svgType: 'cable-organizer',
    image_url: '',
    specs: {
      dimensions: '18cm Largura x 10cm Profundidade x 6cm Altura',
      weight: '165g',
      materialAndFinish: 'PLA Matte Fosco Antirrisco (toque aveludado resistente a marcas de dedos)',
      colors: ['Preto Fosco', 'Grafite', 'Branco Minimalista'],
      notes: 'Base com encaixe para pés antiderrapantes; módulos expansíveis com trilhos magnéticos.'
    }
  },
  {
    id: 10,
    name: 'Escultura Geométrica Low-Poly Minimalista',
    category: 'decoracao',
    categoryLabel: 'Decoração & Design',
    badge: 'Acabamento artístico',
    description: 'Peça artística facetada com estética contemporânea que cria jogos únicos de luz e sombra em estantes, escritórios ou salas de estar.',
    highlight: 'Facetas angulares esculturais',
    materialHighlight: 'PLA Silk Metálico / Velvet Fosco',
    leadTimeBadge: 'Pronto em até 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 95,00',
    price: 95.00,
    stock: 3,
    is_featured: false,
    svgType: 'lowpoly',
    image_url: '',
    specs: {
      dimensions: '20cm Altura x 13cm Largura x 15cm Profundidade',
      weight: '210g',
      materialAndFinish: 'PLA Silk Metálico / Velvet Fosco (brilho sedoso com reflexão de estúdio)',
      colors: ['Preto Ônix', 'Prata Metálico', 'Cobre', 'Branco Gelo'],
      notes: 'Disponível em diversos temas (animais geométricos, bustos ou formas abstratas sob medida).'
    }
  }
]

// Global shared reactive state
const products = ref([...INITIAL_FALLBACK_PRODUCTS])
const loading = ref(false)
const error = ref(null)
const isLoadedFromDb = ref(false)

// Helper to normalize product format
function normalizeProduct(item) {
  const categoryLabels = {
    decoracao: 'Decoração & Design',
    presentes: 'Presentes & Colecionáveis',
    tecnicas: 'Peças Técnicas',
    setup: 'Setup & Utilidades'
  }

  const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
  const formattedPrice = priceNum > 0 
    ? `R$ ${priceNum.toFixed(2).replace('.', ',')}` 
    : (item.priceValue || 'Sob Medida')

  const imagesList = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : (item.image_url ? [item.image_url] : (item.imageUrl ? [item.imageUrl] : []))

  const coverImage = imagesList[0] || item.image_url || item.imageUrl || ''

  return {
    id: item.id,
    name: item.name || 'Produto sem nome',
    category: item.category || 'decoracao',
    categoryLabel: item.categoryLabel || categoryLabels[item.category] || 'Geral',
    badge: item.badge || (item.is_featured ? 'Destaque' : 'Sob Medida'),
    short_description: item.short_description || (item.description ? (item.description.length > 120 ? item.description.slice(0, 120) + '...' : item.description) : ''),
    description: item.description || '',
    height: item.height || '',
    weight: item.weight || (item.specs?.weight || ''),
    highlight: item.highlight || (item.material ? `Material: ${item.material}` : 'Acabamento premium'),
    materialHighlight: item.materialHighlight || item.material || 'PLA Premium',
    leadTimeBadge: item.leadTimeBadge || (item.stock > 0 ? 'Pronto para envio' : 'Pronto em até 48h'),
    pricePrefix: item.pricePrefix || (priceNum > 0 ? 'A partir de' : 'Investimento'),
    priceValue: formattedPrice,
    price: priceNum,
    stock: typeof item.stock === 'number' ? item.stock : 0,
    is_featured: Boolean(item.is_featured),
    svgType: item.svgType || 'vase',
    images: imagesList,
    image_url: coverImage,
    specs: item.specs || {
      dimensions: item.height ? (item.height.includes('cm') ? item.height : `${item.height} cm`) : (item.dimensions || 'Sob medida'),
      weight: item.weight ? (item.weight.includes('g') ? item.weight : `${item.weight} g`) : 'Variável',
      materialAndFinish: item.material || 'PLA Silk / PETG',
      colors: ['Preto', 'Branco', 'Ciano Neon', 'Sob consulta'],
      notes: item.print_time ? `Tempo de impressão estimado: ${item.print_time}` : 'Fabricação digital aditiva com acabamento artesanal.'
    }
  }
}

export function useProducts() {
  const featuredProducts = computed(() => {
    const list = products.value.filter(p => p.is_featured)
    // If none is marked, fallback to the first 3
    if (list.length === 0) {
      return products.value.slice(0, 3)
    }
    return list
  })

  // Fetch from Supabase with safe fallback
  const fetchProducts = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Use fallback
      return
    }

    loading.value = true
    error.value = null

    try {
      const { data, error: err } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (err) {
        console.warn('[Supabase] Erro ao carregar produtos (usando fallback):', err.message)
        error.value = err.message
      } else if (data && data.length > 0) {
        products.value = data.map(normalizeProduct)
        isLoadedFromDb.value = true
      }
    } catch (e) {
      console.warn('[Supabase] Exceção ao consultar tabela products:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // Stock quick update
  const updateStock = async (id, deltaOrAbsolute, isAbsolute = false) => {
    const target = products.value.find(p => p.id === id)
    if (!target) return

    const newStock = isAbsolute 
      ? Math.max(0, deltaOrAbsolute) 
      : Math.max(0, target.stock + deltaOrAbsolute)

    target.stock = newStock

    if (isSupabaseConfigured && supabase && isLoadedFromDb.value) {
      try {
        await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', id)
      } catch (e) {
        console.error('[Supabase] Falha ao atualizar estoque:', e)
      }
    }
  }

  // Toggle is_featured
  const toggleFeatured = async (id) => {
    const target = products.value.find(p => p.id === id)
    if (!target) return

    const nextState = !target.is_featured
    target.is_featured = nextState

    if (isSupabaseConfigured && supabase && isLoadedFromDb.value) {
      try {
        await supabase
          .from('products')
          .update({ is_featured: nextState })
          .eq('id', id)
      } catch (e) {
        console.error('[Supabase] Falha ao alternar destaque:', e)
      }
    }
  }

  // Update quick price
  const updatePrice = async (id, newPriceNum) => {
    const target = products.value.find(p => p.id === id)
    if (!target) return

    target.price = newPriceNum
    target.priceValue = newPriceNum > 0 
      ? `R$ ${newPriceNum.toFixed(2).replace('.', ',')}` 
      : 'Sob Medida'

    if (isSupabaseConfigured && supabase && isLoadedFromDb.value) {
      try {
        await supabase
          .from('products')
          .update({ price: newPriceNum })
          .eq('id', id)
      } catch (e) {
        console.error('[Supabase] Falha ao atualizar preço:', e)
      }
    }
  }

  // Add new product
  const addProduct = async (productData) => {
    const newId = Date.now()
    const normalized = normalizeProduct({
      id: newId,
      ...productData
    })

    products.value.unshift(normalized)

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          name: normalized.name,
          category: normalized.category,
          short_description: normalized.short_description,
          description: normalized.description,
          height: normalized.height,
          weight: normalized.weight,
          material: normalized.materialHighlight,
          dimensions: normalized.specs?.dimensions,
          price: normalized.price,
          stock: normalized.stock,
          is_featured: normalized.is_featured,
          images: normalized.images,
          image_url: normalized.image_url
        }

        const { data, error: err } = await supabase
          .from('products')
          .insert([payload])
          .select()

        if (!err && data && data[0]) {
          // Sync with database ID
          normalized.id = data[0].id
        }
      } catch (e) {
        console.error('[Supabase] Falha ao salvar produto:', e)
      }
    }

    return normalized
  }

  // Update product full
  const updateProduct = async (id, updates) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index === -1) return

    products.value[index] = normalizeProduct({
      ...products.value[index],
      ...updates
    })

    if (isSupabaseConfigured && supabase && isLoadedFromDb.value) {
      try {
        const target = products.value[index]
        const payload = {
          name: target.name,
          category: target.category,
          short_description: target.short_description,
          description: target.description,
          height: target.height,
          weight: target.weight,
          material: target.materialHighlight || target.material,
          dimensions: target.specs?.dimensions,
          price: target.price,
          stock: target.stock,
          is_featured: target.is_featured,
          images: target.images,
          image_url: target.image_url
        }

        await supabase
          .from('products')
          .update(payload)
          .eq('id', id)
      } catch (e) {
        console.error('[Supabase] Falha ao atualizar produto:', e)
      }
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    products.value = products.value.filter(p => p.id !== id)

    if (isSupabaseConfigured && supabase && isLoadedFromDb.value) {
      try {
        await supabase
          .from('products')
          .delete()
          .eq('id', id)
      } catch (e) {
        console.error('[Supabase] Falha ao deletar produto:', e)
      }
    }
  }

  return {
    products,
    featuredProducts,
    loading,
    error,
    isLoadedFromDb,
    isSupabaseConfigured,
    fetchProducts,
    updateStock,
    toggleFeatured,
    updatePrice,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
