<script setup>
import { ref, computed, watch } from 'vue'
import { useProducts } from '../composables/useProducts'
import { getProductWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp'
import { 
  MessageSquare, 
  Sparkles, 
  Heart, 
  ExternalLink, 
  Clock, 
  Palette, 
  Info, 
  Search, 
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Weight
} from 'lucide-vue-next'
import ProductSpecsModal from './ProductSpecsModal.vue'

const props = defineProps({
  initialCategory: {
    type: String,
    default: 'todos'
  }
})

const { products } = useProducts()

const selectedCategory = ref(props.initialCategory)
const searchQuery = ref('')
const selectedProduct = ref(null)
const isSpecsModalOpen = ref(false)

// React when parent changes initialCategory (tab navigation with pre-filter)
watch(() => props.initialCategory, (val) => {
  selectedCategory.value = val
  searchQuery.value = ''
})

const openSpecs = (product) => {
  selectedProduct.value = product
  isSpecsModalOpen.value = true
}

const closeSpecs = () => {
  isSpecsModalOpen.value = false
}

// Multi-image navigation on cards
const activeImageIndices = ref({})

const getProductImages = (product) => {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images
  }
  if (product.image_url) {
    return [product.image_url]
  }
  return []
}

const getActiveImage = (product) => {
  const imgs = getProductImages(product)
  if (imgs.length === 0) return null
  const idx = activeImageIndices.value[product.id] || 0
  return imgs[idx] || imgs[0]
}

const nextImage = (product, e) => {
  if (e) e.stopPropagation()
  const imgs = getProductImages(product)
  if (imgs.length <= 1) return
  const current = activeImageIndices.value[product.id] || 0
  activeImageIndices.value[product.id] = (current + 1) % imgs.length
}

const prevImage = (product, e) => {
  if (e) e.stopPropagation()
  const imgs = getProductImages(product)
  if (imgs.length <= 1) return
  const current = activeImageIndices.value[product.id] || 0
  activeImageIndices.value[product.id] = (current - 1 + imgs.length) % imgs.length
}

const setImageIndex = (product, idx, e) => {
  if (e) e.stopPropagation()
  activeImageIndices.value[product.id] = idx
}

const clearSearch = () => {
  searchQuery.value = ''
}

const categories = [
  { id: 'todos', label: 'Todos os Produtos' },
  { id: 'decoracao', label: 'Decoração' },
  { id: 'presentes', label: 'Presentes & Colecionáveis' },
  { id: 'tecnicas', label: 'Peças Técnicas' },
  { id: 'setup', label: 'Setup & Utilidades' },
]

const filteredProducts = computed(() => {
  let list = products.value
  // Category filter
  if (selectedCategory.value !== 'todos') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  // Search filter (name, material, description keywords)
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.materialHighlight || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.specs?.materialAndFinish || '').toLowerCase().includes(q)
    )
  }
  return list
})

const getOrderLink = (product) => {
  return getProductWhatsAppUrl(product)
}
</script>

<template>
  <section id="catalogo" class="py-16 sm:py-20 md:py-24 bg-[#111726] relative">
    
    <!-- Ambient subtle background glow -->
    <div class="absolute top-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-cyan-500/4 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header (Warm & Humanized) -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-xs font-['Space_Grotesk'] text-cyan-400">
          <Sparkles class="w-3.5 h-3.5 text-cyan-400" />
          <span>VITRINE DE CRIAÇÕES & DESIGN</span>
        </div>
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
          Peças Exclusivas & Feitas Sob Medida
        </h2>
        
        <p class="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed">
          Cada peça da <strong>NexForma.3D</strong> une a precisão da tecnologia digital ao cuidado do acabamento manual. Inspire-se nos modelos abaixo ou peça uma versão personalizada com suas cores e dimensões favoritas.
        </p>

        <!-- Warm humanized pledge -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs text-[#9CA3AF]">
          <span class="flex items-center gap-1.5">
            <Heart class="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Produção artesanal & sob medida
          </span>
          <span class="text-[#232B3B] hidden sm:inline">•</span>
          <span class="flex items-center gap-1.5">
            <Palette class="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Cores e tamanhos personalizáveis
          </span>
        </div>
      </div>

      <!-- Filter Buttons (Smooth & Elegant Pills) -->
      <div class="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap mb-5 sm:mb-7">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          @click="selectedCategory = cat.id; searchQuery = ''"
          class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border select-none active:scale-95"
          :class="[
            selectedCategory === cat.id
              ? 'bg-cyan-500 text-white font-bold border-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
              : 'bg-slate-800/70 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:border-cyan-400/40'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="max-w-lg mx-auto mb-7 sm:mb-10">
        <div class="relative flex items-center">
          <Search class="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nome, material (PLA, PETG, Resina)..."
            class="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="clearSearch"
            class="absolute right-3 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Limpar busca"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Results Counter -->
      <div class="flex items-center justify-between mb-5 sm:mb-7 px-1">
        <p class="text-xs sm:text-sm text-slate-500">
          <span class="text-cyan-400 font-semibold text-sm sm:text-base">{{ filteredProducts.length }}</span>
          {{ filteredProducts.length === 1 ? ' produto encontrado' : ' produtos encontrados' }}
          <span v-if="searchQuery" class="text-slate-600"> para "<span class="text-slate-400">{{ searchQuery }}</span>"</span>
        </p>
        <button
          v-if="searchQuery || selectedCategory !== 'todos'"
          type="button"
          @click="selectedCategory = 'todos'; searchQuery = ''"
          class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer underline underline-offset-2"
        >
          Limpar filtros
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredProducts.length === 0"
        class="py-20 text-center space-y-4"
      >
        <div class="w-16 h-16 rounded-2xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-center mx-auto">
          <Search class="w-7 h-7 text-slate-600" />
        </div>
        <h3 class="text-lg font-semibold text-slate-300 font-['Space_Grotesk']">Nenhum produto encontrado</h3>
        <p class="text-sm text-slate-500 max-w-xs mx-auto">Tente outro termo de busca ou remova os filtros ativos.</p>
        <button
          type="button"
          @click="selectedCategory = 'todos'; searchQuery = ''"
          class="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-sm font-medium hover:bg-cyan-500/15 transition-colors cursor-pointer"
        >
          Ver todos os produtos
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="rounded-2xl sm:rounded-3xl bg-slate-800/70 border border-slate-700/50 overflow-hidden flex flex-col justify-between transition-all duration-400 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1.5 backdrop-blur-sm group"
        >
          
          <div>
            <!-- Studio Photography Mockup Box (Square 1:1 Aspect Ratio) -->
            <div class="relative aspect-square w-full bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-700/50 flex items-center justify-center overflow-hidden">
              
              <!-- Soft studio ambient lighting -->
              <div class="absolute inset-0 bg-radial from-cyan-500/8 via-transparent to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>

              <!-- Floor shadow pedestal -->
              <div class="absolute bottom-5 w-36 sm:w-44 h-7 sm:h-8 bg-black/50 rounded-full blur-md"></div>

              <!-- Real photo if uploaded, otherwise procedural SVG -->
              <template v-if="getActiveImage(product)">
                <img 
                  :src="getActiveImage(product)" 
                  :alt="product.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <!-- Multi-image Arrows Navigation (if product has > 1 image) -->
                <div 
                  v-if="getProductImages(product).length > 1" 
                  class="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <button 
                    type="button" 
                    @click.stop="prevImage(product, $event)"
                    class="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-lg cursor-pointer active:scale-95 transition-all"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft class="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    @click.stop="nextImage(product, $event)"
                    class="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-lg cursor-pointer active:scale-95 transition-all"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>

                <!-- Multi-image Dot Indicators -->
                <div 
                  v-if="getProductImages(product).length > 1" 
                  class="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10"
                >
                  <button 
                    v-for="(_, dotIdx) in getProductImages(product)" 
                    :key="dotIdx"
                    type="button"
                    @click.stop="setImageIndex(product, dotIdx, $event)"
                    class="h-1.5 rounded-full transition-all pointer-events-auto cursor-pointer"
                    :class="[
                      (activeImageIndices[product.id] || 0) === dotIdx 
                        ? 'w-4 bg-cyan-400 shadow-sm shadow-cyan-400/50' 
                        : 'w-1.5 bg-slate-400/60 hover:bg-white'
                    ]"
                    :aria-label="'Ver foto ' + (dotIdx + 1)"
                  ></button>
                </div>
              </template>

              <!-- 1. Vaso Escultural Helix -->
              <svg v-else-if="product.svgType === 'vase'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-108">
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
              <span class="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/50 text-[10px] sm:text-[11px] font-['Space_Grotesk'] text-slate-200 flex items-center gap-1.5 shadow-sm">
                <Sparkles class="w-3 h-3 text-cyan-400" />
                <span>{{ product.badge }}</span>
              </span>

              <!-- Top Right: Category Tag -->
              <span class="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 px-2 sm:px-2.5 py-1 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700/50 text-[9px] sm:text-[10px] font-['Space_Grotesk'] text-slate-400">
                {{ product.categoryLabel }}
              </span>

            </div>

            <!-- Card Body (Clean & Welcoming E-Commerce Style) -->
            <div class="p-4 sm:p-6 pb-2">
              
              <!-- Product Title (Clickable) -->
              <h3 
                @click="openSpecs(product)"
                class="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-white mb-1.5 sm:mb-2 group-hover:text-cyan-400 transition-colors leading-snug cursor-pointer"
                title="Clique para ver mais informações"
              >
                {{ product.name }}
              </h3>

              <!-- Humanized Benefit/Feeling Short Description (Clean & Aligned) -->
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem]">
                {{ product.short_description || product.description }}
              </p>

              <!-- Discrete Physical Specs Tags (Altura & Peso) -->
              <div 
                v-if="product.height || product.weight || product.specs?.dimensions || product.specs?.weight" 
                class="flex flex-wrap items-center gap-1.5 mb-3 text-[11px] font-['JetBrains_Mono']"
              >
                <span 
                  v-if="product.height || product.specs?.dimensions" 
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/50"
                  title="Altura / Dimensões"
                >
                  <Ruler class="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{{ product.height ? (product.height.includes('cm') ? product.height : product.height + ' cm') : product.specs?.dimensions }}</span>
                </span>
                <span 
                  v-if="product.weight || product.specs?.weight" 
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/50"
                  title="Peso Estimado"
                >
                  <Weight class="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{{ product.weight ? (product.weight.includes('g') ? product.weight : product.weight + ' g') : product.specs?.weight }}</span>
                </span>
              </div>

              <!-- Sensory & Practical Highlights -->
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/70 text-[10px] sm:text-[11px] text-slate-300 border border-slate-700/40">
                  <Heart class="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>{{ product.highlight }}</span>
                </span>
                
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/70 text-[10px] sm:text-[11px] text-slate-400 border border-slate-700/40">
                  <span>{{ product.materialHighlight }}</span>
                </span>
              </div>

            </div>
          </div>

          <!-- Card Footer: Price, Specs Button & Friendly WhatsApp Button -->
          <div class="p-4 sm:p-6 pt-2">
            <div class="pt-3 sm:pt-4 border-t border-slate-700/40 space-y-2.5 sm:space-y-3">
              
              <!-- Real-time Availability & Stock Badge -->
              <div class="flex items-center justify-between text-[11px] font-['Space_Grotesk']">
                <span 
                  v-if="product.stock > 0"
                  class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold text-[10px] sm:text-[11px]"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Em estoque ({{ product.stock }} un.)
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 text-[10px] sm:text-[11px]"
                >
                  <Clock class="w-3 h-3 text-cyan-400" />
                  Sob encomenda
                </span>

                <span v-if="product.is_featured" class="text-amber-400 font-semibold flex items-center gap-1 text-[10px]">
                  ★ Destaque
                </span>
              </div>

              <!-- Price in Evidence -->
              <div class="flex items-baseline justify-between mb-0.5">
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-[11px] text-slate-400 uppercase font-['Space_Grotesk'] tracking-wider">
                    {{ product.pricePrefix }}
                  </span>
                  <span class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
                    {{ product.priceValue }}
                  </span>
                </div>

                <span class="text-[10px] sm:text-[11px] text-cyan-400 font-['Space_Grotesk'] bg-cyan-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-cyan-500/20 flex items-center gap-1">
                  <Clock class="w-3 h-3 shrink-0" />
                  <span>{{ product.leadTimeBadge }}</span>
                </span>
              </div>

              <!-- Actions: Mais informações + Pedir -->
              <div class="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  @click="openSpecs(product)"
                  class="py-2.5 px-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/50 hover:border-cyan-400/50 text-xs font-semibold text-slate-300 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer min-h-[42px] active:scale-95 group/info"
                  title="Ver detalhes completos, galeria e especificações"
                >
                  <Info class="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover/info:scale-110 shrink-0" />
                  <span>Mais informações</span>
                </button>

                <a 
                  :href="getProductWhatsAppUrl(product)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-cyan-500/25 active:scale-95 cursor-pointer min-h-[42px]"
                >
                  <MessageSquare class="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>Pedir</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- Humanized Bottom Banner: Custom Requests -->
      <div class="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-800/60 via-slate-800/80 to-slate-800/60 border border-slate-700/50 backdrop-blur-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
        <div class="space-y-1 text-center md:text-left">
          <div class="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-['Space_Grotesk'] font-bold mb-1">
            <Sparkles class="w-3.5 h-3.5" />
            <span>ATELIÊ SOB MEDIDA</span>
          </div>
          <h4 class="text-base sm:text-lg md:text-xl font-bold text-white font-['Space_Grotesk']">
            Quer uma cor diferente, tamanho especial ou gravar seu nome/logo?
          </h4>
          <p class="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Conversamos com você em cada detalhe para que a peça fique perfeita no seu espaço. Cuidamos do projeto do primeiro esboço até a entrega com todo carinho.
          </p>
        </div>

        <a 
          :href="getGeneralWhatsAppUrl()"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full md:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 border border-cyan-500/30 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-cyan-500/20 min-h-[48px] text-center"
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
