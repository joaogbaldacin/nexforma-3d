<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getProductWhatsAppUrl } from '../utils/whatsapp'
import { 
  X, 
  MessageSquare, 
  Ruler, 
  Weight, 
  Layers, 
  Palette, 
  Info, 
  CheckCircle2, 
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowLeft,
  PackageCheck,
  Truck
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const activeImgIdx = ref(0)
const isLightboxOpen = ref(false)

watch(() => props.product, () => {
  activeImgIdx.value = 0
  isLightboxOpen.value = false
})

const getImages = computed(() => {
  if (!props.product) return []
  if (Array.isArray(props.product.images) && props.product.images.length > 0) {
    return props.product.images
  }
  if (props.product.image_url) {
    return [props.product.image_url]
  }
  return []
})

const nextImage = () => {
  if (getImages.value.length <= 1) return
  activeImgIdx.value = (activeImgIdx.value + 1) % getImages.value.length
}

const prevImage = () => {
  if (getImages.value.length <= 1) return
  activeImgIdx.value = (activeImgIdx.value - 1 + getImages.value.length) % getImages.value.length
}

// Extracted included items (such as LED candle, CR2032 battery, USB cable)
const includedItemsText = computed(() => {
  if (!props.product) return null
  if (props.product.specs?.includedItems) return props.product.specs.includedItems
  
  const text = (props.product.description || '') + ' ' + (props.product.specs?.notes || '')
  const regex = /(?:acompanha|inclui|incluso|inclusos|kit com|itens inclusos:?)\s*([^.\n]+)/i
  const match = text.match(regex)
  if (match) {
    return match[0].trim()
  }
  return null
})

// Close on escape key and keyboard arrow navigation
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (isLightboxOpen.value) {
      isLightboxOpen.value = false
    } else if (props.isOpen) {
      emit('close')
    }
  }
  if (props.isOpen) {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    isLightboxOpen.value = false
  }
})
</script>

<template>
  <teleport to="body">
    <!-- 1. MAIN PRODUCT DETAILS MODAL (ANÚNCIO ESTILO STUDIO TECH) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isOpen && product" 
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
      >
        <!-- Backdrop Blur -->
        <div 
          class="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity" 
          @click="emit('close')"
        ></div>

        <!-- Modal Container -->
        <div 
          class="relative w-full max-w-4xl lg:max-w-5xl rounded-2xl sm:rounded-3xl bg-[#111726] border border-slate-700/60 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden z-10 my-4 sm:my-6 flex flex-col max-h-[92vh]"
        >
          <!-- Top subtle cyan accent bar -->
          <div class="h-1.5 w-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-sky-500 shrink-0"></div>

          <!-- Header / Navigation bar -->
          <div class="p-4 sm:p-5 px-5 sm:px-8 border-b border-slate-700/50 flex items-center justify-between gap-4 bg-slate-900/60 shrink-0">
            <!-- Back to catalog button -->
            <button 
              type="button" 
              @click="emit('close')"
              class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
            >
              <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Voltar ao catálogo</span>
            </button>

            <!-- Center Badges -->
            <div class="hidden sm:flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700/50 text-[11px] font-['Space_Grotesk'] font-medium">
                {{ product.categoryLabel }}
              </span>
              <span v-if="product.badge" class="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-[11px] font-['Space_Grotesk'] font-semibold">
                {{ product.badge }}
              </span>
            </div>

            <!-- Close (X) button -->
            <button 
              type="button"
              @click="emit('close')"
              class="p-2 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer shrink-0"
              aria-label="Fechar detalhes do produto"
              title="Fechar (ESC)"
            >
              <X class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <!-- Modal Scrollable Content (2-Column Responsive Layout) -->
          <div class="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            
            <!-- LEFT COLUMN: Interactive Photo Gallery (6 Cols) -->
            <div class="lg:col-span-6 space-y-3 lg:sticky lg:top-0">
              
              <!-- Main Active Image Box -->
              <div 
                class="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 flex items-center justify-center group select-none shadow-inner"
              >
                <!-- Real Image -->
                <template v-if="getImages.length > 0">
                  <img 
                    :src="getImages[activeImgIdx] || getImages[0]" 
                    :alt="product.name" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                    @click="isLightboxOpen = true"
                  />

                  <!-- Badges on Photo -->
                  <div class="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-10">
                    <span 
                      v-if="activeImgIdx === 0" 
                      class="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] font-['Space_Grotesk'] shadow-md flex items-center gap-1"
                    >
                      <Sparkles class="w-3 h-3 fill-current" />
                      <span>FOTO PRINCIPAL</span>
                    </span>
                    <span 
                      v-if="getImages.length > 1" 
                      class="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-['JetBrains_Mono'] border border-slate-700/50 shadow-sm"
                    >
                      {{ activeImgIdx + 1 }} / {{ getImages.length }}
                    </span>
                  </div>

                  <!-- Zoom / Ampliar Button -->
                  <button 
                    type="button" 
                    @click.stop="isLightboxOpen = true"
                    class="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-700/60 shadow-md backdrop-blur-sm cursor-pointer transition-all flex items-center gap-1.5 text-xs font-['Space_Grotesk']"
                    title="Clique para ver imagem ampliada"
                  >
                    <Maximize2 class="w-3.5 h-3.5" />
                    <span class="hidden sm:inline text-[11px]">Ampliar</span>
                  </button>

                  <!-- Prev / Next arrows -->
                  <div 
                    v-if="getImages.length > 1" 
                    class="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none"
                  >
                    <button 
                      type="button" 
                      @click.stop="prevImage"
                      class="p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-xl cursor-pointer active:scale-95 transition-all"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft class="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button 
                      type="button" 
                      @click.stop="nextImage"
                      class="p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-xl cursor-pointer active:scale-95 transition-all"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </template>

                <!-- Fallback Placeholder -->
                <div v-else class="text-center p-6 text-slate-500 space-y-2">
                  <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
                    <Layers class="w-8 h-8" />
                  </div>
                  <p class="text-xs font-['Space_Grotesk'] text-slate-400">Visualização digital 3D</p>
                </div>

              </div>

              <!-- Thumbnails Row (if > 1 image) -->
              <div v-if="getImages.length > 1" class="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
                <button 
                  v-for="(img, idx) in getImages" 
                  :key="idx"
                  type="button"
                  @click="activeImgIdx = idx"
                  class="aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative group bg-slate-900"
                  :class="[
                    activeImgIdx === idx 
                      ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-102 shadow-md' 
                      : 'border-slate-700/60 opacity-60 hover:opacity-100 hover:border-slate-500'
                  ]"
                >
                  <img :src="img" :alt="'Miniatura ' + (idx + 1)" class="w-full h-full object-cover" />
                </button>
              </div>

              <!-- Trust & Security Badges under gallery -->
              <div class="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/40 text-[11px] text-slate-400 font-['JetBrains_Mono']">
                <div class="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/30">
                  <ShieldCheck class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Acabamento testado</span>
                </div>
                <div class="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/30">
                  <Truck class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Envios para todo Brasil</span>
                </div>
              </div>

            </div>

            <!-- RIGHT COLUMN: Complete Product Showcase Information (6 Cols) -->
            <div class="lg:col-span-6 space-y-5">
              
              <!-- Badges & Availability row -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700/50 text-[10px] sm:text-[11px] font-['Space_Grotesk'] font-medium">
                    {{ product.categoryLabel }}
                  </span>
                  
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
                    Produção sob encomenda
                  </span>

                  <span class="text-[10px] sm:text-[11px] text-cyan-400 font-['Space_Grotesk'] bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                    <Clock class="w-3 h-3 shrink-0" />
                    <span>{{ product.leadTimeBadge || 'Pronto em 48h' }}</span>
                  </span>
                </div>

                <!-- Product Main Title -->
                <h2 class="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight leading-snug">
                  {{ product.name }}
                </h2>
              </div>

              <!-- Price & Ordering Card (Estilo Anúncio E-commerce) -->
              <div class="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg space-y-4">
                <div class="flex items-baseline justify-between gap-3">
                  <div>
                    <span class="text-[10px] sm:text-[11px] text-slate-400 uppercase font-['Space_Grotesk'] tracking-wider block">
                      {{ product.pricePrefix || 'A PARTIR DE' }}
                    </span>
                    <span class="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
                      {{ product.priceValue }}
                    </span>
                  </div>

                  <span class="text-[11px] text-slate-400 text-right font-['JetBrains_Mono']">
                    Pix, Cartão ou Boleto<br>
                    <strong class="text-emerald-400 font-medium">Orçamento sem compromisso</strong>
                  </span>
                </div>

                <!-- Primary CTA Button: PEDIR -->
                <a 
                  :href="getProductWhatsAppUrl(product)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all cursor-pointer active:scale-98 min-h-[48px]"
                >
                  <MessageSquare class="w-5 h-5 fill-current shrink-0" />
                  <span>Pedir pelo WhatsApp 💬</span>
                </a>
              </div>

              <!-- Complete Product Description (Preserving line breaks & paragraphs) -->
              <div class="space-y-2">
                <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider font-['JetBrains_Mono'] flex items-center gap-1.5">
                  <Info class="w-3.5 h-3.5 text-cyan-400" />
                  <span>Descrição Completa</span>
                </h4>
                <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {{ product.description }}
                </div>
              </div>

              <!-- Technical Specifications Grid -->
              <div class="space-y-2.5">
                <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider font-['JetBrains_Mono'] flex items-center gap-1.5">
                  <Ruler class="w-3.5 h-3.5 text-cyan-400" />
                  <span>Especificações Técnicas</span>
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  
                  <!-- Dimensões / Altura -->
                  <div class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-start gap-2.5">
                    <Ruler class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span class="text-[10px] text-slate-500 uppercase font-['JetBrains_Mono'] block">Dimensões / Altura</span>
                      <strong class="text-slate-200 font-semibold text-xs mt-0.5 block">
                        {{ product.height ? (product.height.includes('cm') ? product.height : product.height + ' cm') : (product.specs?.dimensions || 'Sob Consulta') }}
                      </strong>
                    </div>
                  </div>

                  <!-- Peso Estimado -->
                  <div class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-start gap-2.5">
                    <Weight class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span class="text-[10px] text-slate-500 uppercase font-['JetBrains_Mono'] block">Peso Estimado</span>
                      <strong class="text-slate-200 font-semibold text-xs mt-0.5 block">
                        {{ product.weight ? (product.weight.includes('g') ? product.weight : product.weight + ' g') : (product.specs?.weight || 'Variável') }}
                      </strong>
                    </div>
                  </div>

                  <!-- Material & Tecnologia 3D -->
                  <div class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-start gap-2.5 sm:col-span-2">
                    <Layers class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span class="text-[10px] text-slate-500 uppercase font-['JetBrains_Mono'] block">Material & Impressão 3D</span>
                      <strong class="text-slate-200 font-semibold text-xs mt-0.5 block">
                        {{ product.specs?.materialAndFinish || product.materialHighlight || product.material || 'PLA Silk / PETG' }}
                      </strong>
                    </div>
                  </div>

                  <!-- Itens Inclusos (se disponível) -->
                  <div v-if="includedItemsText" class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-start gap-2.5 sm:col-span-2">
                    <PackageCheck class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span class="text-[10px] text-slate-500 uppercase font-['JetBrains_Mono'] block">Itens Inclusos</span>
                      <strong class="text-slate-200 font-semibold text-xs mt-0.5 block">
                        {{ includedItemsText }}
                      </strong>
                    </div>
                  </div>

                  <!-- Cores Disponíveis -->
                  <div v-if="product.specs?.colors && product.specs.colors.length" class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 sm:col-span-2 space-y-1.5">
                    <div class="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-['JetBrains_Mono']">
                      <Palette class="w-3.5 h-3.5 text-cyan-400" />
                      <span>Cores Disponíveis</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span 
                        v-for="(color, cIdx) in product.specs.colors" 
                        :key="cIdx"
                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/50 text-[11px] text-slate-300"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                        <span>{{ color }}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Observações de Fabricação -->
                  <div v-if="product.specs?.notes" class="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 sm:col-span-2 flex items-start gap-2.5">
                    <Info class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span class="text-[10px] text-slate-500 uppercase font-['JetBrains_Mono'] block">Observações de Fabricação</span>
                      <p class="text-slate-300 text-xs mt-0.5 leading-relaxed">
                        {{ product.specs.notes }}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Bottom Action bar (Mobile & Desktop quick close) -->
              <div class="pt-2 flex items-center justify-between border-t border-slate-700/40 text-xs">
                <button 
                  type="button"
                  @click="emit('close')"
                  class="py-2 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft class="w-3.5 h-3.5" />
                  <span>Voltar ao catálogo</span>
                </button>

                <a 
                  :href="getProductWhatsAppUrl(product)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Pedir agora →</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </transition>

    <!-- 2. LIGHTBOX / FULLSCREEN ZOOM MODAL -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isLightboxOpen && getImages.length > 0"
        class="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 select-none"
      >
        <!-- Top Bar with counter & close -->
        <div class="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm font-['Space_Grotesk'] font-bold text-slate-200">
              {{ product?.name }}
            </span>
            <span class="text-xs font-['JetBrains_Mono'] text-slate-400">
              ({{ activeImgIdx + 1 }} de {{ getImages.length }})
            </span>
          </div>

          <button 
            type="button" 
            @click="isLightboxOpen = false"
            class="p-2 sm:p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer border border-slate-600/50"
            title="Fechar ampliação (ESC)"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Center Image Display -->
        <div class="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
          <img 
            :src="getImages[activeImgIdx]" 
            :alt="product?.name" 
            class="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />

          <!-- Arrows -->
          <button 
            v-if="getImages.length > 1"
            type="button" 
            @click="prevImage"
            class="absolute left-2 sm:-left-12 p-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition-all cursor-pointer border border-slate-700"
            aria-label="Imagem anterior"
          >
            <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button 
            v-if="getImages.length > 1"
            type="button" 
            @click="nextImage"
            class="absolute right-2 sm:-right-12 p-2.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition-all cursor-pointer border border-slate-700"
            aria-label="Próxima imagem"
          >
            <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <!-- Bottom Thumbnails Strip -->
        <div v-if="getImages.length > 1" class="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto">
          <button 
            v-for="(thumb, tIdx) in getImages" 
            :key="tIdx"
            type="button"
            @click="activeImgIdx = tIdx"
            class="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0"
            :class="activeImgIdx === tIdx ? 'border-cyan-400 scale-110 ring-2 ring-cyan-400/40' : 'border-slate-700 opacity-60 hover:opacity-100'"
          >
            <img :src="thumb" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </transition>

  </teleport>
</template>
