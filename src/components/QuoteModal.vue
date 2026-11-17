<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X, MessageSquare, Send, CheckCircle2, Sparkles, FileUp, Cpu } from 'lucide-vue-next'

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

  const url = `https://wa.me/5514999999999?text=${encodeURIComponent(message)}`
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-[#0B0D10]/85 backdrop-blur-md transition-opacity" 
          @click="emit('close')"
        ></div>

        <!-- Modal Content Container -->
        <div 
          class="relative w-full max-w-xl rounded-2xl bg-[#151921] border border-[#232B3B] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8"
        >
          <!-- Top Accent Light -->
          <div class="h-1.5 w-full bg-gradient-to-r from-[#00A8CC] via-[#00E5FF] to-[#00A8CC]"></div>

          <!-- Header -->
          <div class="p-6 pb-4 flex items-start justify-between border-b border-[#232B3B]">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 text-[11px] font-['JetBrains_Mono'] text-[#00E5FF] mb-2">
                <Sparkles class="w-3 h-3" />
                <span>ORÇAMENTO RÁPIDO & TRANSPARENTE</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#F3F4F6]">
                Monte seu Pedido <span class="text-[#00E5FF]">NexForma.3D</span>
              </h3>
              <p class="text-xs text-[#9CA3AF] mt-1">
                Preencha as informações básicas para adiantar o cálculo de fatiamento no WhatsApp.
              </p>
            </div>

            <button 
              type="button"
              @click="emit('close')"
              class="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2633] transition-colors cursor-pointer"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Form Body -->
          <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            
            <!-- Category Selection -->
            <div>
              <label class="block text-xs font-semibold text-[#F3F4F6] uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                1. Tipo de Projeto
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  type="button"
                  @click="projectCategory = cat"
                  class="p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer"
                  :class="[
                    projectCategory === cat
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#F3F4F6] font-semibold shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                      : 'bg-[#0B0D10] border-[#232B3B] text-[#9CA3AF] hover:border-[#00E5FF]/40 hover:text-[#F3F4F6]'
                  ]"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- 3D File status -->
            <div>
              <label class="block text-xs font-semibold text-[#F3F4F6] uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                2. Status do Arquivo / Modelagem
              </label>
              <div class="space-y-2">
                <button
                  v-for="opt in fileOptions"
                  :key="opt"
                  type="button"
                  @click="hasFile = opt"
                  class="w-full p-2.5 rounded-lg text-left text-xs transition-all border flex items-center justify-between cursor-pointer"
                  :class="[
                    hasFile === opt
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#F3F4F6] font-semibold'
                      : 'bg-[#0B0D10] border-[#232B3B] text-[#9CA3AF] hover:border-[#00E5FF]/40'
                  ]"
                >
                  <span>{{ opt }}</span>
                  <CheckCircle2 v-if="hasFile === opt" class="w-4 h-4 text-[#00E5FF]" />
                </button>
              </div>
            </div>

            <!-- Material preference -->
            <div>
              <label class="block text-xs font-semibold text-[#F3F4F6] uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                3. Preferência de Material
              </label>
              <select 
                v-model="materialChoice"
                class="w-full p-3 rounded-lg bg-[#0B0D10] border border-[#232B3B] text-xs text-[#F3F4F6] focus:border-[#00E5FF] focus:outline-none cursor-pointer"
              >
                <option v-for="mat in materials" :key="mat" :value="mat">
                  {{ mat }}
                </option>
              </select>
            </div>

            <!-- Additional Details -->
            <div>
              <label class="block text-xs font-semibold text-[#F3F4F6] uppercase tracking-wider mb-2 font-['JetBrains_Mono']">
                4. Detalhes, Dimensões aproximadas ou Quantidade (Opcional)
              </label>
              <textarea 
                v-model="projectDetails"
                rows="3"
                placeholder="Ex: Gostaria de uma luminária com 18cm de altura na cor branca perolada, ou uma engrenagem de 45 dentes em nylon..."
                class="w-full p-3 rounded-lg bg-[#0B0D10] border border-[#232B3B] text-xs text-[#F3F4F6] placeholder-[#9CA3AF]/60 focus:border-[#00E5FF] focus:outline-none"
              ></textarea>
            </div>

          </div>

          <!-- Footer Actions -->
          <div class="p-6 pt-4 bg-[#0D1016] border-t border-[#232B3B] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span class="text-[11px] text-[#9CA3AF] font-['JetBrains_Mono']">
              ● Redirecionamento seguro para o WhatsApp oficial
            </span>

            <button
              type="button"
              @click="handleSendWhatsApp"
              class="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#00E5FF] text-[#0B0D10] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] transition-all cursor-pointer"
            >
              <MessageSquare class="w-4 h-4 fill-current" />
              <span>Continuar no WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </transition>
  </teleport>
</template>
