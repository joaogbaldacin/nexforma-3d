<script setup>
import { ref, computed } from 'vue'
import { 
  MessageSquare, 
  Sparkles, 
  Heart, 
  ExternalLink, 
  Clock, 
  Palette,
  Info
} from 'lucide-vue-next'
import ProductSpecsModal from './ProductSpecsModal.vue'

const selectedCategory = ref('todos')
const selectedProduct = ref(null)
const isSpecsModalOpen = ref(false)

const openSpecs = (product) => {
  selectedProduct.value = product
  isSpecsModalOpen.value = true
}

const closeSpecs = () => {
  isSpecsModalOpen.value = false
}

const categories = [
  { id: 'todos', label: 'Todos os Produtos' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'presentes', label: 'Presentes & Colecionáveis' },
  { id: 'tecnicas', label: 'Peças Técnicas' },
  { id: 'setup', label: 'Setup & Utilidades' },
]

const products = [
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
    svgType: 'vase',
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
    svgType: 'moon',
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
    svgType: 'headphone',
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
    svgType: 'hex',
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
    svgType: 'samurai',
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
    svgType: 'gear',
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
    svgType: 'signboard',
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
    svgType: 'mechanical',
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
    svgType: 'cable-organizer',
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
    svgType: 'lowpoly',
    specs: {
      dimensions: '20cm Altura x 13cm Largura x 15cm Profundidade',
      weight: '210g',
      materialAndFinish: 'PLA Silk Metálico / Velvet Fosco (brilho sedoso com reflexão de estúdio)',
      colors: ['Preto Ônix', 'Prata Metálico', 'Cobre', 'Branco Gelo'],
      notes: 'Disponível em diversos temas (animais geométricos, bustos ou formas abstratas sob medida).'
    }
  }
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'todos') {
    return products
  }
  return products.filter(p => p.category === selectedCategory.value)
})

const getOrderLink = (productName) => {
  const text = `Olá! Me encantei pelo produto "${productName}" no catálogo da NexForma.3D e gostaria de encomendar o meu sob medida! Poderiam me passar os detalhes de cores e envio?`
  return `https://wa.me/5519989690055?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <section id="catalogo" class="py-16 sm:py-20 md:py-24 bg-[#0B0D10] relative">
    
    <!-- Ambient subtle background glow -->
    <div class="absolute top-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#00E5FF]/5 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header (Warm & Humanized) -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151921] border border-[#232B3B] text-xs font-['Space_Grotesk'] text-[#00E5FF]">
          <Sparkles class="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>VITRINE DE CRIAÇÕES & DESIGN</span>
        </div>
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] tracking-tight">
          Peças Exclusivas & Feitas Sob Medida
        </h2>
        
        <p class="text-[#9CA3AF] text-sm sm:text-base lg:text-lg leading-relaxed">
          Cada peça da <strong>NexForma.3D</strong> une a precisão da tecnologia digital ao cuidado do acabamento manual. Inspire-se nos modelos abaixo ou peça uma versão personalizada com suas cores e dimensões favoritas.
        </p>

        <!-- Warm humanized pledge -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs text-[#9CA3AF]">
          <span class="flex items-center gap-1.5">
            <Heart class="w-3.5 h-3.5 text-[#00E5FF] shrink-0" /> Produção artesanal & sob medida
          </span>
          <span class="text-[#232B3B] hidden sm:inline">•</span>
          <span class="flex items-center gap-1.5">
            <Palette class="w-3.5 h-3.5 text-[#00E5FF] shrink-0" /> Cores e tamanhos personalizáveis
          </span>
        </div>
      </div>

      <!-- Filter Buttons (Smooth & Elegant Pills) -->
      <div class="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap mb-10 sm:mb-14">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          @click="selectedCategory = cat.id"
          class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border select-none active:scale-95"
          :class="[
            selectedCategory === cat.id
              ? 'bg-[#00E5FF] text-[#0B0D10] font-bold border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105'
              : 'bg-[#151921] text-[#9CA3AF] border-[#232B3B] hover:text-[#F3F4F6] hover:border-[#00E5FF]/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.15)]'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="rounded-2xl sm:rounded-3xl bg-[#151921] border border-[#232B3B] overflow-hidden flex flex-col justify-between transition-all duration-400 hover:border-[#00E5FF]/60 hover:shadow-[0_16px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1.5 group"
        >
          
          <div>
            <!-- Studio Photography Mockup Box -->
            <div class="relative h-56 sm:h-64 bg-gradient-to-b from-[#131720] via-[#0E1219] to-[#0A0D12] border-b border-[#232B3B] flex items-center justify-center overflow-hidden">
              
              <!-- Soft studio ambient lighting -->
              <div class="absolute inset-0 bg-radial from-[#00E5FF]/10 via-transparent to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>

              <!-- Floor shadow pedestal -->
              <div class="absolute bottom-5 w-36 sm:w-44 h-7 sm:h-8 bg-black/60 rounded-full blur-md"></div>

              <!-- Vector Studio Illustrations with Depth & Warmth -->
              
              <!-- 1. Vaso Escultural Helix -->
              <svg v-if="product.svgType === 'vase'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <defs>
                  <linearGradient id="vase-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2D3B4F"/>
                    <stop offset="45%" stop-color="#1B2432"/>
                    <stop offset="100%" stop-color="#0F151E"/>
                  </linearGradient>
                  <linearGradient id="vase-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.8"/>
                    <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.2"/>
                  </linearGradient>
                </defs>
                <!-- Vase Body -->
                <path d="M70 45 C60 85 50 115 75 145 C85 155 115 155 125 145 C150 115 140 85 130 45 Z" fill="url(#vase-grad)" stroke="#2A374A" stroke-width="1.5" />
                <!-- Sculpted spiral facets -->
                <path d="M70 45 Q100 95 125 145" fill="none" stroke="#00E5FF" stroke-width="1.6" opacity="0.8" />
                <path d="M130 45 Q100 95 75 145" fill="none" stroke="#384C66" stroke-width="1.8" />
                <path d="M85 45 Q105 100 110 152" fill="none" stroke="#00E5FF" stroke-width="1.2" opacity="0.5" />
                <!-- Top Rim with porcelain gloss -->
                <ellipse cx="100" cy="45" rx="30" ry="8" fill="#1E2837" stroke="url(#vase-highlight)" stroke-width="2" />
                <ellipse cx="100" cy="45" rx="20" ry="5" fill="#0C1017" />
              </svg>

              <!-- 2. Luminária Moonlit 3D com Base de Madeira -->
              <svg v-else-if="product.svgType === 'moon'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_12px_30px_rgba(0,229,255,0.25)] transition-transform duration-500 group-hover:scale-108">
                <defs>
                  <radialGradient id="moon-light" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#FFFFFF"/>
                    <stop offset="60%" stop-color="#E2E8F0"/>
                    <stop offset="90%" stop-color="#94A3B8"/>
                    <stop offset="100%" stop-color="#475569"/>
                  </radialGradient>
                  <filter id="moon-halo">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <!-- Cozy Glow Aura -->
                <circle cx="100" cy="85" r="46" fill="#00E5FF" opacity="0.12" filter="url(#moon-halo)" />
                <!-- Moon Sphere -->
                <circle cx="100" cy="85" r="44" fill="url(#moon-light)" />
                <!-- Soft Lunar Textures & Craters -->
                <circle cx="82" cy="70" r="9" fill="#CBD5E1" opacity="0.7" />
                <circle cx="118" cy="80" r="13" fill="#94A3B8" opacity="0.5" />
                <circle cx="95" cy="102" r="7" fill="#64748B" opacity="0.5" />
                <circle cx="110" cy="60" r="5" fill="#94A3B8" opacity="0.6" />
                <ellipse cx="78" cy="98" rx="8" ry="5" fill="#64748B" opacity="0.4" />
                <!-- Warm Wooden Minimalist Tripod Stand -->
                <polygon points="68,162 100,125 132,162" fill="none" stroke="#A27B5C" stroke-width="4.5" stroke-linejoin="round" />
                <line x1="100" y1="125" x2="100" y2="162" stroke="#8D6E63" stroke-width="3.5" />
              </svg>

              <!-- 3. Suporte Minimalista para Headphone -->
              <svg v-else-if="product.svgType === 'headphone'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Base with weighted bevel -->
                <rect x="55" y="152" width="90" height="12" rx="6" fill="#1C2433" stroke="#2D3B4F" stroke-width="1.5" />
                <rect x="62" y="154" width="76" height="3" rx="1.5" fill="#00E5FF" opacity="0.5" />
                <!-- Vertical Stem -->
                <path d="M96 60 L96 152 M104 60 L104 152" stroke="#161E2B" stroke-width="4" stroke-linecap="round" />
                <!-- Curved Crown Rest Pad -->
                <path d="M60 62 C60 36 140 36 140 62" fill="none" stroke="#253245" stroke-width="7" stroke-linecap="round" />
                <path d="M64 58 C64 40 136 40 136 58" fill="none" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" opacity="0.9" />
                <!-- Headphone Silhouette resting on stand -->
                <path d="M60 60 C60 40 140 40 140 60" fill="none" stroke="#475569" stroke-width="3" />
                <rect x="52" y="62" width="16" height="24" rx="8" fill="#1E293B" stroke="#00E5FF" stroke-width="1.5" />
                <rect x="132" y="62" width="16" height="24" rx="8" fill="#1E293B" stroke="#00E5FF" stroke-width="1.5" />
              </svg>

              <!-- 4. Kit Organizador Hexagonal de Mesa -->
              <svg v-else-if="product.svgType === 'hex'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Center Hexagon Container -->
                <polygon points="100,65 130,82 130,118 100,135 70,118 70,82" fill="#202A39" stroke="#2F3F56" stroke-width="2" />
                <polygon points="100,68 126,83 126,115 100,130 74,115 74,83" fill="#131B26" />
                <!-- Left Lower Hexagon Tray -->
                <polygon points="60,95 85,110 85,140 60,155 35,140 35,110" fill="#1A2330" stroke="#2B394E" stroke-width="2" />
                <polygon points="60,98 82,111 82,138 60,151 38,138 38,111" fill="#0E141D" />
                <!-- Right Hexagon Container with subtle cyan rim -->
                <polygon points="140,95 165,110 165,140 140,155 115,140 115,110" fill="#1A2330" stroke="#00E5FF" stroke-width="1.8" />
                <polygon points="140,98 162,111 162,138 140,151 118,138 118,111" fill="#0E141D" />
                <!-- Subtle Pen Silhouette inside center cup -->
                <line x1="95" y1="45" x2="105" y2="95" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" />
                <line x1="105" y1="50" x2="98" y2="90" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
              </svg>

              <!-- 5. Miniatura Samurai Shadow Articulada -->
              <svg v-else-if="product.svgType === 'samurai'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Studio Display Pedestal -->
                <ellipse cx="100" cy="158" rx="48" ry="10" fill="#1A222F" stroke="#2B384B" stroke-width="2" />
                <ellipse cx="100" cy="158" rx="38" ry="6" fill="#0F141D" stroke="#00E5FF" stroke-width="1" />
                <!-- Figurine Silhouette -->
                <!-- Crest & Mask -->
                <polygon points="100,42 80,56 120,56" fill="#00E5FF" />
                <path d="M78 62 L122 62 L112 85 L88 85 Z" fill="#202A39" stroke="#33435A" stroke-width="1.5" />
                <!-- Shoulders & Armor -->
                <path d="M68 90 L132 90 L124 130 L76 130 Z" fill="#171F2B" stroke="#2D3B4F" stroke-width="1.5" />
                <line x1="68" y1="105" x2="132" y2="105" stroke="#00E5FF" stroke-width="1.2" opacity="0.7" />
                <!-- Dual Katanas with Glowing Cyan Energy Line -->
                <line x1="45" y1="145" x2="155" y2="45" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                <line x1="45" y1="145" x2="155" y2="45" stroke="#00E5FF" stroke-width="4" opacity="0.4" stroke-linecap="round" />
              </svg>

              <!-- 6. Engrenagem & Peça Técnica de Engenharia -->
              <svg v-else-if="product.svgType === 'gear'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:rotate-12">
                <defs>
                  <linearGradient id="gear-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#334155"/>
                    <stop offset="50%" stop-color="#1E293B"/>
                    <stop offset="100%" stop-color="#0F172A"/>
                  </linearGradient>
                </defs>
                <!-- Gear Outer Body -->
                <circle cx="100" cy="100" r="54" fill="url(#gear-metal)" stroke="#475569" stroke-width="2" />
                <!-- Precision Teeth Facets -->
                <g stroke="#00E5FF" stroke-width="3" stroke-linecap="round">
                  <line x1="100" y1="36" x2="100" y2="47" />
                  <line x1="100" y1="153" x2="100" y2="164" />
                  <line x1="36" y1="100" x2="47" y2="100" />
                  <line x1="153" y1="100" x2="164" y2="100" />
                  <line x1="55" y1="55" x2="63" y2="63" />
                  <line x1="137" y1="137" x2="145" y2="145" />
                  <line x1="55" y1="145" x2="63" y2="137" />
                  <line x1="137" y1="63" x2="145" y2="55" />
                </g>
                <circle cx="100" cy="100" r="30" fill="#0B0F16" stroke="#00E5FF" stroke-width="1.5" />
                <circle cx="100" cy="100" r="16" fill="#1E293B" />
                <rect x="96" y="80" width="8" height="12" rx="2" fill="#00E5FF" />
              </svg>

              <!-- 7. Placa Decorativa Letreiro 3D Personalizado -->
              <svg v-else-if="product.svgType === 'signboard'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Stand Base -->
                <polygon points="35,145 165,145 155,160 45,160" fill="#101722" stroke="#253245" stroke-width="1.5" />
                <!-- Slanted Signboard Body -->
                <polygon points="30,65 170,65 160,145 40,145" fill="#16202D" stroke="#2A384D" stroke-width="2" />
                <polygon points="34,70 166,70 157,140 43,140" fill="#0E141D" />
                <!-- Cyan Border Accent Line -->
                <line x1="36" y1="72" x2="164" y2="72" stroke="#00E5FF" stroke-width="2" />
                <!-- Extruded 3D Text Simulation (NEX.3D in isometric bevels) -->
                <!-- Letter N -->
                <path d="M52 120 L52 85 L60 85 L72 110 L72 85 L79 85 L79 120 L71 120 L59 95 L59 120 Z" fill="#00E5FF" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))" />
                <!-- Letter E -->
                <path d="M85 120 L85 85 L105 85 L105 91 L92 91 L92 99 L103 99 L103 105 L92 105 L92 114 L106 114 L106 120 Z" fill="#00E5FF" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))" />
                <!-- Letter X -->
                <path d="M112 120 L121 103 L113 85 L121 85 L126 96 L131 85 L139 85 L131 103 L140 120 L132 120 L126 109 L120 120 Z" fill="#00E5FF" filter="drop-shadow(0 0 4px rgba(0,229,255,0.4))" />
                <!-- 3D Dot Accent -->
                <circle cx="147" cy="116" r="3.5" fill="#00E5FF" />
              </svg>

              <!-- 8. Engrenagem & Componente Mecânico Sob Medida -->
              <svg v-else-if="product.svgType === 'mechanical'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Pillow block mounting base -->
                <path d="M35 130 L165 130 C165 130 165 155 155 158 L45 158 C35 155 35 130 35 130 Z" fill="#182332" stroke="#2B3C52" stroke-width="2" />
                <!-- Base Bolt Holes -->
                <ellipse cx="50" cy="144" rx="5" ry="3" fill="#090E15" stroke="#00E5FF" stroke-width="1.2" />
                <ellipse cx="150" cy="144" rx="5" ry="3" fill="#090E15" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Bearing Arch / Housing -->
                <path d="M60 130 C60 70 140 70 140 130 Z" fill="#1C2738" stroke="#2E4057" stroke-width="2" />
                <!-- Bevel Gear Hub / Center Bore -->
                <circle cx="100" cy="100" r="34" fill="#101722" stroke="#00E5FF" stroke-width="2" />
                <circle cx="100" cy="100" r="18" fill="#1C2738" stroke="#00E5FF" stroke-width="1.5" stroke-dasharray="3 2" />
                <circle cx="100" cy="100" r="8" fill="#090E15" />
                <!-- Keyway Slot -->
                <rect x="97" y="88" width="6" height="8" fill="#00E5FF" />
                <!-- Engineering Tolerance Marks -->
                <line x1="66" y1="48" x2="134" y2="48" stroke="#00E5FF" stroke-width="1" stroke-dasharray="2 2" />
                <line x1="66" y1="44" x2="66" y2="52" stroke="#00E5FF" stroke-width="1" />
                <line x1="134" y1="44" x2="134" y2="52" stroke="#00E5FF" stroke-width="1" />
              </svg>

              <!-- 9. Organizador Modular de Mesa & Cabos -->
              <svg v-else-if="product.svgType === 'cable-organizer'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
                <!-- Main Organizer Body in 3D Isometric View -->
                <polygon points="100,50 170,85 170,125 100,160 30,125 30,85" fill="#192230" stroke="#2A394E" stroke-width="2" />
                <polygon points="100,53 166,86 100,119 34,86" fill="#141B26" />
                <!-- Pen & Accessory Slots -->
                <ellipse cx="65" cy="85" rx="8" ry="5" fill="#0A0E15" stroke="#00E5FF" stroke-width="1.2" />
                <ellipse cx="85" cy="75" rx="8" ry="5" fill="#0A0E15" stroke="#00E5FF" stroke-width="1.2" />
                <!-- SD Card / Flash Drive Slots -->
                <rect x="110" y="70" width="16" height="3" transform="rotate(25 110 70)" fill="#00E5FF" />
                <rect x="125" y="77" width="16" height="3" transform="rotate(25 125 77)" fill="#00E5FF" />
                <rect x="140" y="84" width="16" height="3" transform="rotate(25 140 84)" fill="#00E5FF" />
                <!-- Integrated Cable Routing Channels (glowing cyan curves) -->
                <path d="M40 105 Q100 135 160 105" fill="none" stroke="#253447" stroke-width="6" stroke-linecap="round" />
                <path d="M40 105 Q100 135 160 105" fill="none" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" />
                <circle cx="100" cy="120" r="3" fill="#FFFFFF" />
              </svg>

              <!-- 10. Escultura Geométrica Low-Poly Minimalista -->
              <svg v-else viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_12px_28px_rgba(0,229,255,0.25)] transition-transform duration-500 group-hover:scale-108">
                <!-- Pedestal Shadow -->
                <ellipse cx="100" cy="155" rx="42" ry="8" fill="#0A0E14" />
                <!-- Low-Poly Faceted Sculpture (Geometric Diamond Beast / Polyhedron) -->
                <!-- Center Triangle -->
                <polygon points="100,45 130,95 70,95" fill="#29374B" stroke="#00E5FF" stroke-width="1.5" />
                <!-- Top Left Facet -->
                <polygon points="100,45 70,95 45,75" fill="#1C2737" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Top Right Facet -->
                <polygon points="100,45 130,95 155,75" fill="#364963" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Mid Left Facet -->
                <polygon points="70,95 45,75 50,125" fill="#151D2A" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Mid Right Facet -->
                <polygon points="130,95 155,75 150,125" fill="#2E3F57" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Lower Center Left -->
                <polygon points="100,145 70,95 100,115" fill="#1B2533" stroke="#00E5FF" stroke-width="1.5" />
                <!-- Lower Center Right -->
                <polygon points="100,145 130,95 100,115" fill="#253347" stroke="#00E5FF" stroke-width="1.5" />
                <!-- Lower Left Outer -->
                <polygon points="100,145 70,95 50,125" fill="#111722" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Lower Right Outer -->
                <polygon points="100,145 130,95 150,125" fill="#3D516E" stroke="#00E5FF" stroke-width="1.2" />
                <!-- Glowing Crest Vertex -->
                <circle cx="100" cy="45" r="2.5" fill="#00E5FF" />
              </svg>

              <!-- Top Left: Humanized Badge (Feito sob medida / Design autoral) -->
              <span class="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-full bg-[#0B0D10]/85 backdrop-blur-md border border-[#232B3B] text-[10px] sm:text-[11px] font-['Space_Grotesk'] text-[#F3F4F6] flex items-center gap-1.5 shadow-sm">
                <Sparkles class="w-3 h-3 text-[#00E5FF]" />
                <span>{{ product.badge }}</span>
              </span>

              <!-- Top Right: Category Tag -->
              <span class="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 px-2 sm:px-2.5 py-1 rounded-full bg-[#151921]/90 backdrop-blur-md border border-[#232B3B] text-[9px] sm:text-[10px] font-['Space_Grotesk'] text-[#9CA3AF]">
                {{ product.categoryLabel }}
              </span>

            </div>

            <!-- Card Body (Clean & Welcoming E-Commerce Style) -->
            <div class="p-4 sm:p-6 pb-2">
              
              <!-- Product Title -->
              <h3 class="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] mb-1.5 sm:mb-2 group-hover:text-[#00E5FF] transition-colors leading-snug">
                {{ product.name }}
              </h3>

              <!-- Humanized Benefit/Feeling Description -->
              <p class="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-3 sm:mb-4">
                {{ product.description }}
              </p>

              <!-- Sensory & Practical Highlights -->
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B0D10] text-[10px] sm:text-[11px] text-[#D1D5DB] border border-[#232B3B]">
                  <Heart class="w-3 h-3 text-[#00E5FF] shrink-0" />
                  <span>{{ product.highlight }}</span>
                </span>
                
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B0D10] text-[10px] sm:text-[11px] text-[#9CA3AF] border border-[#232B3B]">
                  <span>{{ product.materialHighlight }}</span>
                </span>
              </div>

            </div>
          </div>

          <!-- Card Footer: Price, Specs Button & Friendly WhatsApp Button -->
          <div class="p-4 sm:p-6 pt-2">
            <div class="pt-3 sm:pt-4 border-t border-[#232B3B]/80 space-y-2.5 sm:space-y-3">
              
              <!-- Price in Evidence -->
              <div class="flex items-baseline justify-between mb-0.5">
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-[11px] text-[#9CA3AF] uppercase font-['Space_Grotesk'] tracking-wider">
                    {{ product.pricePrefix }}
                  </span>
                  <span class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] tracking-tight">
                    {{ product.priceValue }}
                  </span>
                </div>

                <span class="text-[10px] sm:text-[11px] text-[#00E5FF] font-['Space_Grotesk'] bg-[#00E5FF]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#00E5FF]/20 flex items-center gap-1">
                  <Clock class="w-3 h-3 shrink-0" />
                  <span>{{ product.leadTimeBadge }}</span>
                </span>
              </div>

              <!-- Button 1: Mais Especificações (Secondary Discreet Action) -->
              <button
                type="button"
                @click="openSpecs(product)"
                class="w-full py-2.5 px-4 rounded-xl bg-[#0B0D10] hover:bg-[#1C2330] border border-[#232B3B] hover:border-[#00E5FF]/60 text-xs font-semibold text-[#9CA3AF] hover:text-[#00E5FF] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group/btn min-h-[44px] active:scale-98"
              >
                <Info class="w-4 h-4 text-[#00E5FF] transition-transform duration-200 group-hover/btn:scale-110 shrink-0" />
                <span>Mais especificações</span>
              </button>

              <!-- Button 2: Encomendar pelo WhatsApp (Primary CTA) -->
              <a 
                :href="getOrderLink(product.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3.5 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#33EBFF] text-[#0B0D10] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(0,229,255,0.25)] hover:shadow-[0_4px_25px_rgba(0,229,255,0.5)] active:scale-98 cursor-pointer min-h-[48px]"
              >
                <MessageSquare class="w-4 h-4 fill-current shrink-0" />
                <span>Encomendar pelo WhatsApp 💬</span>
              </a>

            </div>
          </div>

        </div>
      </div>

      <!-- Humanized Bottom Banner: Custom Requests -->
      <div class="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#151921] via-[#1A2230] to-[#151921] border border-[#232B3B] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
        <div class="space-y-1 text-center md:text-left">
          <div class="inline-flex items-center gap-1.5 text-xs text-[#00E5FF] font-['Space_Grotesk'] font-bold mb-1">
            <Sparkles class="w-3.5 h-3.5" />
            <span>ATELIÊ SOB MEDIDA</span>
          </div>
          <h4 class="text-base sm:text-lg md:text-xl font-bold text-[#F3F4F6] font-['Space_Grotesk']">
            Quer uma cor diferente, tamanho especial ou gravar seu nome/logo?
          </h4>
          <p class="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl">
            Conversamos com você em cada detalhe para que a peça fique perfeita no seu espaço. Cuidamos do projeto do primeiro esboço até a entrega com todo carinho.
          </p>
        </div>

        <a 
          :href="'https://wa.me/5519989690055?text=' + encodeURIComponent('Olá equipe da NexForma.3D! Gostaria de conversar sobre uma peça personalizada sob medida.')"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full md:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-[#151921] hover:bg-[#00E5FF] border border-[#00E5FF]/50 text-[#F3F4F6] hover:text-[#0B0D10] font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] min-h-[48px] text-center"
        >
          <MessageSquare class="w-4 h-4 shrink-0" />
          <span>Falar com o Ateliê no WhatsApp 💬</span>
        </a>
      </div>

    </div>

    <!-- Product Specifications Modal -->
    <ProductSpecsModal 
      :is-open="isSpecsModalOpen" 
      :product="selectedProduct" 
      @close="closeSpecs" 
    />
  </section>
</template>
