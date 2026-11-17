<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
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
  ShieldCheck
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

const handleOrderWhatsApp = () => {
  if (!props.product) return
  const text = `Olá! Estive visualizando as especificações do modelo "${props.product.name}" no catálogo da NexForma.3D e gostaria de encomendar o meu sob medida! Poderiam me passar os detalhes de prazos e valores?`
  window.open(`https://wa.me/5514999999999?text=${encodeURIComponent(text)}`, '_blank')
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop Blur -->
        <div 
          class="fixed inset-0 bg-[#0B0D10]/85 backdrop-blur-md transition-opacity" 
          @click="emit('close')"
        ></div>

        <!-- Modal Box -->
        <div 
          class="relative w-full max-w-2xl rounded-3xl bg-[#151921] border border-[#232B3B] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-8"
        >
          <!-- Top subtle cyan accent bar -->
          <div class="h-1.5 w-full bg-gradient-to-r from-[#00A8CC] via-[#00E5FF] to-[#00A8CC]"></div>

          <!-- Modal Header -->
          <div class="p-6 sm:p-8 pb-5 flex items-start justify-between border-b border-[#232B3B]">
            <div class="space-y-1.5 pr-4">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-[#0B0D10] text-[#00E5FF] border border-[#232B3B] text-[11px] font-['Space_Grotesk'] font-medium">
                  {{ product.categoryLabel }}
                </span>
                <span v-if="product.badge" class="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-['Space_Grotesk']">
                  {{ product.badge }}
                </span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] tracking-tight">
                {{ product.name }}
              </h3>
              <p class="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Close Button -->
            <button 
              type="button"
              @click="emit('close')"
              class="p-2.5 rounded-full bg-[#0B0D10] border border-[#232B3B] text-[#9CA3AF] hover:text-[#00E5FF] hover:border-[#00E5FF]/60 transition-all cursor-pointer shrink-0"
              aria-label="Fechar especificações"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Body / Specs Grid -->
          <div class="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- 1. Dimensões -->
              <div class="p-4 rounded-2xl bg-[#0B0D10] border border-[#232B3B] flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-[#151921] border border-[#232B3B] flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                  <Ruler class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="text-xs font-['Space_Grotesk'] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                    Dimensões
                  </h4>
                  <p class="text-sm font-semibold text-[#F3F4F6] mt-0.5">
                    {{ product.specs?.dimensions || 'Sob Consulta' }}
                  </p>
                </div>
              </div>

              <!-- 2. Peso Aproximado -->
              <div class="p-4 rounded-2xl bg-[#0B0D10] border border-[#232B3B] flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-[#151921] border border-[#232B3B] flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                  <Weight class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="text-xs font-['Space_Grotesk'] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                    Peso Estimado
                  </h4>
                  <p class="text-sm font-semibold text-[#F3F4F6] mt-0.5">
                    {{ product.specs?.weight || 'Variável' }}
                  </p>
                </div>
              </div>

            </div>

            <!-- 3. Material e Acabamento -->
            <div class="p-4 rounded-2xl bg-[#0B0D10] border border-[#232B3B] flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-[#151921] border border-[#232B3B] flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                <Layers class="w-5 h-5" />
              </div>
              <div class="flex-grow">
                <h4 class="text-xs font-['Space_Grotesk'] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                  Material & Acabamento
                </h4>
                <p class="text-sm font-semibold text-[#F3F4F6] mt-0.5">
                  {{ product.specs?.materialAndFinish || product.materialHighlight }}
                </p>
              </div>
            </div>

            <!-- 4. Cores Disponíveis -->
            <div class="p-4 rounded-2xl bg-[#0B0D10] border border-[#232B3B] space-y-3">
              <div class="flex items-center gap-2">
                <Palette class="w-4 h-4 text-[#00E5FF]" />
                <h4 class="text-xs font-['Space_Grotesk'] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                  Cores Disponíveis
                </h4>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(color, index) in product.specs?.colors" 
                  :key="index"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151921] border border-[#232B3B] text-xs text-[#F3F4F6]"
                >
                  <span class="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
                  <span>{{ color }}</span>
                </span>
              </div>
            </div>

            <!-- 5. Observações & Customização -->
            <div class="p-4 rounded-2xl bg-[#0B0D10] border border-[#232B3B] flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-[#151921] border border-[#232B3B] flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                <Info class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-xs font-['Space_Grotesk'] text-[#9CA3AF] uppercase tracking-wider font-semibold">
                  Observações de Fabricação
                </h4>
                <p class="text-xs sm:text-sm text-[#9CA3AF] mt-1 leading-relaxed">
                  {{ product.specs?.notes }}
                </p>
              </div>
            </div>

          </div>

          <!-- Modal Footer: Price & Direct WhatsApp CTA -->
          <div class="p-6 sm:p-8 pt-4 bg-[#0D1016] border-t border-[#232B3B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex flex-col text-center sm:text-left">
              <span class="text-[11px] text-[#9CA3AF] uppercase font-['Space_Grotesk']">
                {{ product.pricePrefix }}
              </span>
              <span class="text-2xl font-bold font-['Space_Grotesk'] text-[#F3F4F6]">
                {{ product.priceValue }}
              </span>
            </div>

            <button 
              type="button"
              @click="handleOrderWhatsApp"
              class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#33EBFF] text-[#0B0D10] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.4)] hover:shadow-[0_4px_30px_rgba(0,229,255,0.7)] transition-all cursor-pointer active:scale-95"
            >
              <MessageSquare class="w-4 h-4 fill-current" />
              <span>Encomendar este modelo no WhatsApp 💬</span>
            </button>
          </div>

        </div>

      </div>
    </transition>
  </teleport>
</template>
