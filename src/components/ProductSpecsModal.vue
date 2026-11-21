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
  ChevronRight
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

watch(() => props.product, () => {
  activeImgIdx.value = 0
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

// Close on escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
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
  }
})
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen && product" 
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop Blur -->
        <div 
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
          @click="emit('close')"
        ></div>

        <!-- Modal Box -->
        <div 
          class="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-slate-800/95 border border-slate-700/50 shadow-2xl shadow-black/60 backdrop-blur-xl overflow-hidden z-10 my-4 sm:my-8"
        >
          <!-- Top subtle cyan accent bar -->
          <div class="h-1.5 w-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-sky-500"></div>

          <!-- Modal Header -->
          <div class="p-5 sm:p-7 pb-4 flex items-start justify-between border-b border-slate-700/50 gap-3">
            <div class="space-y-1.5 pr-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900/80 text-cyan-400 border border-slate-700/50 text-[10px] sm:text-[11px] font-['Space_Grotesk'] font-medium">
                  {{ product.categoryLabel }}
                </span>
                <span v-if="product.badge" class="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-['Space_Grotesk']">
                  {{ product.badge }}
                </span>
              </div>
              <h3 class="text-xl sm:text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
                {{ product.name }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Close Button -->
            <button 
              type="button"
              @click="emit('close')"
              class="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all cursor-pointer shrink-0"
              aria-label="Fechar especificações"
            >
              <X class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <!-- Modal Body / Specs Grid -->
          <div class="p-5 sm:p-7 space-y-4 sm:space-y-5 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto">
            
            <!-- Product Photo Gallery -->
            <div v-if="getImages.length > 0" class="space-y-2.5">
              <!-- Main Active Image -->
              <div class="relative aspect-square sm:aspect-[16/10] max-h-72 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50 flex items-center justify-center group">
                <img 
                  :src="getImages[activeImgIdx] || getImages[0]" 
                  :alt="product.name" 
                  class="w-full h-full object-contain"
                />

                <!-- Prev / Next arrows if multiple images -->
                <div v-if="getImages.length > 1" class="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                  <button 
                    type="button" 
                    @click.stop="prevImage"
                    class="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-lg cursor-pointer transition-all active:scale-95"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft class="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    @click.stop="nextImage"
                    class="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white pointer-events-auto border border-slate-700/60 shadow-lg cursor-pointer transition-all active:scale-95"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- Thumbnails Row (if > 1 image) -->
              <div v-if="getImages.length > 1" class="flex items-center gap-2 overflow-x-auto pb-1">
                <button 
                  v-for="(img, idx) in getImages" 
                  :key="idx"
                  type="button"
                  @click="activeImgIdx = idx"
                  class="w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer"
                  :class="activeImgIdx === idx ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105' : 'border-slate-700/60 opacity-60 hover:opacity-100'"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              <!-- 1. Dimensões / Altura -->
              <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-700/40 flex items-start gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Ruler class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 class="text-[10px] sm:text-xs font-['Space_Grotesk'] text-slate-500 uppercase tracking-wider font-semibold">
                    Dimensões / Altura
                  </h4>
                  <p class="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
                    {{ product.height ? (product.height.includes('cm') ? product.height : product.height + ' cm') : (product.specs?.dimensions || 'Sob Consulta') }}
                  </p>
                </div>
              </div>

              <!-- 2. Peso Aproximado -->
              <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-700/40 flex items-start gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Weight class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 class="text-[10px] sm:text-xs font-['Space_Grotesk'] text-slate-500 uppercase tracking-wider font-semibold">
                    Peso Estimado
                  </h4>
                  <p class="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
                    {{ product.weight ? (product.weight.includes('g') ? product.weight : product.weight + ' g') : (product.specs?.weight || 'Variável') }}
                  </p>
                </div>
              </div>

            </div>

            <!-- 3. Material e Acabamento -->
            <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-700/40 flex items-start gap-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Layers class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div class="flex-grow">
                <h4 class="text-[10px] sm:text-xs font-['Space_Grotesk'] text-slate-500 uppercase tracking-wider font-semibold">
                  Material & Acabamento
                </h4>
                <p class="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
                  {{ product.specs?.materialAndFinish || product.materialHighlight }}
                </p>
              </div>
            </div>

            <!-- 4. Cores Disponíveis -->
            <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-700/40 space-y-2.5">
              <div class="flex items-center gap-2">
                <Palette class="w-4 h-4 text-cyan-400" />
                <h4 class="text-[10px] sm:text-xs font-['Space_Grotesk'] text-slate-500 uppercase tracking-wider font-semibold">
                  Cores Disponíveis
                </h4>
              </div>
              
              <div class="flex flex-wrap gap-1.5 sm:gap-2">
                <span 
                  v-for="(color, index) in product.specs?.colors" 
                  :key="index"
                  class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/40 text-[11px] sm:text-xs text-slate-200"
                >
                  <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shrink-0"></span>
                  <span>{{ color }}</span>
                </span>
              </div>
            </div>

            <!-- 5. Observações & Customização -->
            <div class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-700/40 flex items-start gap-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Info class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 class="text-[10px] sm:text-xs font-['Space_Grotesk'] text-slate-500 uppercase tracking-wider font-semibold">
                  Observações de Fabricação
                </h4>
                <p class="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  {{ product.specs?.notes }}
                </p>
              </div>
            </div>

          </div>

          <!-- Modal Footer: Price & Direct WhatsApp CTA -->
          <div class="p-5 sm:p-7 pt-4 bg-slate-900/50 border-t border-slate-700/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div class="flex flex-col text-center sm:text-left">
              <span class="text-[10px] sm:text-[11px] text-slate-400 uppercase font-['Space_Grotesk']">
                {{ product.pricePrefix }}
              </span>
              <span class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
                {{ product.priceValue }}
              </span>
            </div>

            <a 
              :href="getProductWhatsAppUrl(product)"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/30 transition-all cursor-pointer active:scale-95 min-h-[48px]"
            >
              <MessageSquare class="w-4 h-4 fill-current shrink-0" />
              <span>Encomendar este modelo no WhatsApp 💬</span>
            </a>
          </div>

        </div>

      </div>
    </transition>
  </teleport>
</template>
