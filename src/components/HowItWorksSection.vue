<script setup>
import { 
  UploadCloud, 
  FileCode, 
  Cpu, 
  PackageCheck, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-vue-next'
import { getGeneralWhatsAppUrl } from '../utils/whatsapp'

const emit = defineEmits(['open-quote'])

const steps = [
  {
    step: '01',
    title: 'Envie sua ideia ou arquivo',
    description: 'Possui o arquivo 3D pronto (STL, OBJ, STEP, 3MF)? Excelente! Não tem? Sem problemas: envie fotos de referência, esboços em papel ou dimensões que modelamos para você.',
    icon: UploadCloud,
    details: ['Arquivos suportados: STL, OBJ, STEP, 3MF, DXF', 'Modelagem 3D a partir de esboço ou amostra física']
  },
  {
    step: '02',
    title: 'Modelagem e Orçamento',
    description: 'Analisamos a geometria, definimos altura de camada (0.08 a 0.28mm), densidade de infill e material adequado (PLA, PETG, ABS, Nylon-CF, Resina). Você recebe o valor e prazo transparente.',
    icon: FileCode,
    details: ['Simulação de fatiamento e resistência mecânica', 'Orçamento sem compromisso em até poucas horas']
  },
  {
    step: '03',
    title: 'Impressão 3D e Envio',
    description: 'A peça entra em linha de produção em impressoras de alta velocidade com monitoramento térmico. Realizamos inspeção dimensional, acabamento e despachamos com embalagem blindada.',
    icon: PackageCheck,
    details: ['Inspeção de controle de qualidade peça a peça', 'Envio com rastreamento para todo o Brasil e exterior']
  }
]

const guarantees = [
  { icon: Shield, title: 'Precisão Milimétrica', text: 'Tolerâncias mecânicas ajustadas para montagens e encaixes perfeitos.' },
  { icon: Truck, title: 'Envio Seguro & Rastreável', text: 'Embalagens com proteção antichoque e plástico bolha reforçado.' },
  { icon: RotateCcw, title: 'Garantia de Satisfação', text: 'Se a peça tiver desvio técnico do combinado, corrigimos prontamente.' }
]
</script>

<template>
  <section id="como-funciona" class="py-16 sm:py-20 md:py-24 bg-[#131A2B] relative border-t border-slate-700/40">
    
    <!-- Ambient subtle background blur -->
    <div class="absolute bottom-0 left-1/3 w-72 sm:w-80 h-72 sm:h-80 bg-sky-500/4 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-xs font-['JetBrains_Mono'] text-cyan-400">
          <span>FLUXO SIMPLES & ÁGIL</span>
        </div>
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
          Como Funciona o Processo
        </h2>
        
        <p class="text-slate-400 text-sm sm:text-base lg:text-lg">
          Do conceito digital ao produto físico nas suas mãos em 3 passos descomplicados.
        </p>
      </div>

      <!-- 3 Steps Grid with connecting elements -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
        
        <!-- Connecting Line on Desktop -->
        <div class="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-slate-700/30 via-cyan-500/20 to-slate-700/30 -z-0"></div>

        <div 
          v-for="item in steps" 
          :key="item.step"
          class="relative rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-black/25 backdrop-blur-sm hover:-translate-y-2 group"
        >
          <!-- Step Number Tag -->
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <span class="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-cyan-400">
              {{ item.step }}
            </span>
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 group-hover:shadow-sm group-hover:shadow-cyan-500/15 transition-all shrink-0">
              <component :is="item.icon" class="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <!-- Body -->
          <div class="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
            <h3 class="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-400 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Bullet check items -->
          <ul class="space-y-2 pt-4 border-t border-slate-700/40 text-[11px] sm:text-xs font-['JetBrains_Mono'] text-slate-400">
            <li v-for="(detail, i) in item.details" :key="i" class="flex items-start gap-2">
              <CheckCircle class="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{{ detail }}</span>
            </li>
          </ul>

        </div>

      </div>

      <!-- Value Reassurance 3 Badges -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-700/40">
        <div 
          v-for="(g, idx) in guarantees" 
          :key="idx" 
          class="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40"
        >
          <div class="w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0">
            <component :is="g.icon" class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk'] mb-0.5">{{ g.title }}</h4>
            <p class="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{{ g.text }}</p>
          </div>
        </div>
      </div>

      <!-- Quick CTA Banner -->
      <div class="mt-10 sm:mt-14 text-center">
        <div class="inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-3 sm:pr-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 w-full sm:w-auto max-w-xl mx-auto">
          <span class="text-xs sm:text-sm text-slate-200 px-2 sm:px-4 font-medium text-center sm:text-left">
            Pronto para iniciar seu projeto ou tirar dúvidas técnicas?
          </span>
          <a 
            :href="getGeneralWhatsAppUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Fazer Orçamento Agora</span>
            <ArrowRight class="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
