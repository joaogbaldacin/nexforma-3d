<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X, MessageSquare, Send, CheckCircle2, Sparkles, FileUp, Cpu } from 'lucide-vue-next'
import { createWhatsAppUrl } from '../utils/whatsapp'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const projectCategory = ref('Presentes Personalizados')
const hasFile = ref('Tenho ideia/foto (preciso de modelagem)')
const materialChoice = ref('Indicação técnica da NexForma.3D')
const projectDetails = ref('')

const categories = [
  'Presentes Personalizados',
  'Decoração & Design',
  'Peças Técnicas & Protótipos',
  'Utilidades & Setup',
  'Outro projeto sob medida'
]

const fileOptions = [
  'Já tenho arquivo 3D (STL, OBJ, STEP, 3MF)',
  'Tenho ideia/foto (preciso de modelagem)',
  'Quero reproduzir uma peça física existente'
]

const materials = [
  'Indicação técnica da NexForma.3D',
  'PLA Premium (Decoração / Geral)',
  'PETG / ABS (Peças Técnicas e Resistência)',
  'Resina 8K (Alta Definição e Detalhes)',
  'Nylon com Fibra de Carbono (PA-CF)'
]

const handleSendWhatsApp = () => {
  let message = `Olá NexForma.3D! Gostaria de um orçamento para impressão 3D:\n\n`
  message += `*Categoria:* ${projectCategory.value}\n`
  message += `*Arquivo 3D:* ${hasFile.value}\n`
  message += `*Material Preferido:* ${materialChoice.value}\n`
  if (projectDetails.value.trim()) {
    message += `*Detalhes do Projeto:* ${projectDetails.value.trim()}\n`
  }
  message += `\nEnvio para meu CEP. Poderiam me passar os prazos e valores?`

  const url = createWhatsAppUrl(message)
  window.open(url, '_blank')
  emit('close')
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
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
          @click="emit('close')"
        ></div>

        <!-- Modal Content Container -->
        <div 
          class="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-slate-800/95 border border-slate-700/50 shadow-2xl shadow-black/60 backdrop-blur-xl overflow-hidden z-10 my-4 sm:my-8"
        >
          <!-- Top Accent Light -->
          <div class="h-1.5 w-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-sky-500"></div>

          <!-- Header -->
          <div class="p-5 sm:p-6 pb-4 flex items-start justify-between border-b border-slate-700/50 gap-3">
            <div class="pr-2">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-cyan-400 mb-1.5">
                <Sparkles class="w-3 h-3" />
                <span>ORÇAMENTO RÁPIDO & TRANSPARENTE</span>
              </div>
              <h3 class="text-lg sm:text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-white">
                Monte seu Pedido <span class="text-cyan-400">NexForma.3D</span>
              </h3>
              <p class="text-xs text-[#9CA3AF] mt-0.5">
                Preencha as informações básicas para adiantar o cálculo de fatiamento no WhatsApp.
              </p>
            </div>

            <button 
              type="button"
              @click="emit('close')"
              class="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-pointer shrink-0"
              aria-label="Fechar"
            >
              <X class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <!-- Form Body -->
          <div class="p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[65vh] sm:max-h-[70vh] overflow-y-auto">
            
            <!-- Category Selection -->
            <div>
              <label class="block text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                1. Tipo de Projeto
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  type="button"
                  @click="projectCategory = cat"
                  class="p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer active:scale-98 min-h-[42px] flex items-center"
                  :class="[
                    projectCategory === cat
                      ? 'bg-cyan-500/15 border-cyan-400 text-white font-semibold shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-900/70 border-slate-700/50 text-slate-400 hover:border-cyan-400/30 hover:text-slate-200'
                  ]"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- 3D File status -->
            <div>
              <label class="block text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                2. Status do Arquivo / Modelagem
              </label>
              <div class="space-y-2">
                <button
                  v-for="opt in fileOptions"
                  :key="opt"
                  type="button"
                  @click="hasFile = opt"
                  class="w-full p-2.5 sm:p-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between cursor-pointer active:scale-98 min-h-[42px]"
                  :class="[
                    hasFile === opt
                      ? 'bg-cyan-500/15 border-cyan-400 text-white font-semibold'
                      : 'bg-slate-900/70 border-slate-700/50 text-slate-400 hover:border-cyan-400/30'
                  ]"
                >
                  <span>{{ opt }}</span>
                  <CheckCircle2 v-if="hasFile === opt" class="w-4 h-4 text-cyan-400 shrink-0" />
                </button>
              </div>
            </div>

            <!-- Material preference -->
            <div>
              <label class="block text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                3. Preferência de Material
              </label>
              <select 
                v-model="materialChoice"
                class="w-full p-3 rounded-xl bg-slate-900/70 border border-slate-700/50 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none cursor-pointer min-h-[44px]"
              >
                <option v-for="mat in materials" :key="mat" :value="mat">
                  {{ mat }}
                </option>
              </select>
            </div>

            <!-- Additional Details -->
            <div>
              <label class="block text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                4. Detalhes, Dimensões ou Quantidade (Opcional)
              </label>
              <textarea 
                v-model="projectDetails"
                rows="3"
                placeholder="Ex: Gostaria de uma luminária com 18cm de altura na cor branca perolada, ou uma engrenagem de 45 dentes em nylon..."
                class="w-full p-3 rounded-xl bg-slate-900/70 border border-slate-700/50 text-xs text-slate-200 placeholder-slate-500/60 focus:border-cyan-400 focus:outline-none"
              ></textarea>
            </div>

          </div>

          <!-- Footer Actions -->
          <div class="p-5 sm:p-6 pt-3.5 bg-slate-900/50 border-t border-slate-700/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span class="text-[10px] sm:text-[11px] text-[#9CA3AF] font-['JetBrains_Mono'] text-center sm:text-left">
              ● Redirecionamento seguro para o WhatsApp oficial
            </span>

            <button
              type="button"
              @click="handleSendWhatsApp"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/30 transition-all cursor-pointer min-h-[48px] active:scale-95"
            >
              <MessageSquare class="w-4 h-4 fill-current shrink-0" />
              <span>Continuar no WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </transition>
  </teleport>
</template>
