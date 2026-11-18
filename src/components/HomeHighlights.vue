<script setup>
import { ref } from 'vue'
import { 
  Layers, 
  Cpu, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  ChevronDown, 
  ShieldCheck, 
  Palette, 
  Flame, 
  Wrench,
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-vue-next'

const emit = defineEmits(['open-quote', 'navigate'])

// 1. Social Proof Bar
const proofMetrics = [
  {
    icon: Layers,
    value: '0.08mm',
    label: 'Precisão de Camada',
    sub: 'Microdetalhes & acabamento liso'
  },
  {
    icon: Cpu,
    value: '+15 Materiais',
    label: 'Engenharia & Estética',
    sub: 'PLA, PETG, ABS, Carbon e Resina'
  },
  {
    icon: MapPin,
    value: 'Marília/SP & Brasil',
    label: 'Retirada ou Envio Nacional',
    sub: 'Embalagens blindadas seguras'
  },
  {
    icon: Sparkles,
    value: '100% Sob Medida',
    label: 'Do Conceito à Impressão',
    sub: 'Com ou sem arquivo 3D pronto'
  }
]

// 2. Weekly Featured Products (3 Selected Items)
const featuredProducts = [
  {
    id: 1,
    name: 'Vaso Escultural Voronoi Prism',
    category: 'Decoração & Design',
    badge: 'Design Autoral',
    description: 'Geometria fluida com favos orgânicos e reflexo acetinado estúdio. Eleva a estética de salas, aparadores ou setups.',
    material: 'PLA Silk Premium Perolado',
    leadTime: 'Pronto em 48h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 79,00',
    svgType: 'vase'
  },
  {
    id: 3,
    name: 'Suporte Minimalista para Headphone',
    category: 'Setup & Utilidades',
    badge: 'Elegância & Ergonomia',
    description: 'Apoio curvo ergonômico que não deforma a espuma do fone, com canaleta inteligente para retenção de cabos.',
    material: 'PETG Matte Anti-Risco',
    leadTime: 'Pronto em 24h',
    pricePrefix: 'A partir de',
    priceValue: 'R$ 68,00',
    svgType: 'headphone'
  },
  {
    id: 6,
    name: 'Engrenagem & Peça Técnica',
    category: 'Peças Técnicas',
    badge: 'Alta Resistência',
    description: 'Substituição de peças desgastadas ou componentes descontinuados com tolerâncias rigorosas para engenharia mecânica.',
    material: 'Nylon Carbon (PA-CF) / PETG',
    leadTime: 'Sob Demanda',
    pricePrefix: 'Investimento',
    priceValue: 'Sob Medida',
    svgType: 'gear'
  }
]

// 3. Materials & Engineering Guide
const materialsGuide = [
  {
    title: 'PLA Silk & Matte',
    subtitle: 'Estética & Cores Vivas',
    icon: Palette,
    tag: 'Design & Presentes',
    description: 'Bioplástico ecológico de origem vegetal com acabamento premium acetinado ou fosco aveludado. Ideal para peças decorativas, estátuas, letreiros e presentes marcantes.',
    features: ['Brilho sedoso ou fosco elegante', 'Ampla variedade de cores nobres', 'Perfeito para uso residencial e escritório']
  },
  {
    title: 'PETG & ABS+',
    subtitle: 'Resistência & Durabilidade',
    icon: ShieldCheck,
    tag: 'Setup & Acessórios',
    description: 'Polímeros tenazes com alta absorção de impacto, flexibilidade controlada e resistência térmica até 85°C. Perfeitos para suportes de mesa, adaptadores e uso diário contínuo.',
    features: ['Excelente adesão intercamadas', 'Resistente a impactos mecânicos', 'Não deforma sob calor moderado']
  },
  {
    title: 'Nylon Carbon & Resina',
    subtitle: 'Engenharia & Microdetalhes',
    icon: Wrench,
    tag: 'Indústria & Protótipos',
    description: 'Filamentos reforçados com fibra de carbono real e resinas fotopolímeras 8K. O ápice em rigidez mecânica para engrenagens, caixas eletrônicas ou miniaturas ultradetalhadas.',
    features: ['Tolerâncias dimensionais de ±0.05mm', 'Resistência térmica até 140°C', 'Superfície de injeção plástica']
  }
]

// 4. Interactive FAQ Accordion
const faqs = [
  {
    q: 'Não tenho o arquivo 3D (.STL), vocês modelam?',
    a: 'Com certeza! Você não precisa ter conhecimento técnico nem arquivos prontos. Basta nos enviar fotos de referência, medidas aproximadas ou um esboço simples pelo WhatsApp que nossos especialistas realizam a modelagem 3D do zero para você.'
  },
  {
    q: 'Qual é o prazo médio de produção e entrega?',
    a: 'Peças do catálogo e itens rápidos costumam ser impressos e finalizados em 24h a 48h úteis. Projetos sob medida, peças de engenharia ou lotes maiores têm prazos alinhados com total transparência no momento do orçamento.'
  },
  {
    q: 'Posso retirar pessoalmente em Marília/SP ou vocês enviam?',
    a: 'Sim! Clientes de Marília/SP e região podem retirar seus pedidos diretamente conosco sem custo de frete. Para as demais cidades do Brasil e do exterior, enviamos via transportadora com embalagem blindada reforçada e rastreamento online.'
  }
]

const activeFaq = ref(0) // first open by default

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const getOrderLink = (productName) => {
  const text = `Olá! Vi o produto ${productName} nos destaques da NexForma.3D e gostaria de tirar dúvidas / fazer um orçamento.`
  return `https://wa.me/5519989690055?text=${encodeURIComponent(text)}`
}
</script>

<template>
  <div class="space-y-16 sm:space-y-24 pb-12 sm:pb-20">
    
    <!-- 1. FAIXA DE NÚMEROS & CREDIBILIDADE (Social Proof Bar) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xl shadow-xl shadow-black/40">
        <div 
          v-for="(metric, idx) in proofMetrics" 
          :key="idx"
          class="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-700/40 flex flex-col justify-between transition-all hover:border-cyan-400/40"
        >
          <div class="flex items-center justify-between mb-2 sm:mb-3">
            <span class="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Space_Grotesk'] text-white">
              {{ metric.value }}
            </span>
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <component :is="metric.icon" class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-200 font-['Space_Grotesk']">
              {{ metric.label }}
            </h4>
            <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
              {{ metric.sub }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. VITRINE DESTAQUES DA SEMANA (Preview do Catálogo) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-xs font-['Space_Grotesk'] text-cyan-400">
            <Sparkles class="w-3.5 h-3.5 text-cyan-400" />
            <span>SELEÇÃO DA SEMANA</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
            Criações em Destaque
          </h2>
          <p class="text-slate-400 text-sm sm:text-base max-w-xl">
            Uma prévia dos nossos modelos mais requisitados, prontos para fabricação com qualidade artesanal e tecnologia aditiva.
          </p>
        </div>

        <button
          type="button"
          @click="emit('navigate', 'catalogo')"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-cyan-400/50 text-white font-medium text-xs sm:text-sm transition-all duration-200 self-start md:self-auto cursor-pointer group shadow-sm"
        >
          <span>Ver Catálogo Completo</span>
          <ArrowRight class="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <!-- 3 Featured Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div 
          v-for="item in featuredProducts" 
          :key="item.id"
          class="rounded-2xl sm:rounded-3xl bg-slate-800/70 border border-slate-700/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1.5 backdrop-blur-sm group"
        >
          <div>
            <!-- Visual studio mockup container -->
            <div class="relative h-52 sm:h-60 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-b border-slate-700/50 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-radial from-cyan-500/8 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <div class="absolute bottom-4 w-36 h-6 bg-black/60 rounded-full blur-md"></div>

              <!-- 1. Vaso -->
              <svg v-if="item.svgType === 'vase'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
                <defs>
                  <linearGradient id="home-vase-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2D3B4F"/>
                    <stop offset="45%" stop-color="#1B2432"/>
                    <stop offset="100%" stop-color="#0F151E"/>
                  </linearGradient>
                </defs>
                <path d="M70 45 C60 85 50 115 75 145 C85 155 115 155 125 145 C150 115 140 85 130 45 Z" fill="url(#home-vase-grad)" stroke="#2A374A" stroke-width="1.5" />
                <path d="M70 45 Q100 95 125 145" fill="none" stroke="#00E5FF" stroke-width="1.6" opacity="0.8" />
                <path d="M130 45 Q100 95 75 145" fill="none" stroke="#384C66" stroke-width="1.8" />
                <ellipse cx="100" cy="45" rx="30" ry="8" fill="#1E2837" stroke="#00E5FF" stroke-width="1.5" />
                <ellipse cx="100" cy="45" rx="20" ry="5" fill="#0C1017" />
              </svg>

              <!-- 2. Headphone -->
              <svg v-else-if="item.svgType === 'headphone'" viewBox="0 0 200 200" class="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
                <rect x="55" y="152" width="90" height="12" rx="6" fill="#1C2433" stroke="#2D3B4F" stroke-width="1.5" />
                <rect x="62" y="154" width="76" height="3" rx="1.5" fill="#00E5FF" opacity="0.5" />
                <path d="M96 60 L96 152 M104 60 L104 152" stroke="#161E2B" stroke-width="4" stroke-linecap="round" />
                <path d="M60 62 C60 36 140 36 140 62" fill="none" stroke="#253245" stroke-width="7" stroke-linecap="round" />
                <path d="M64 58 C64 40 136 40 136 58" fill="none" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" opacity="0.9" />
                <rect x="52" y="62" width="16" height="24" rx="8" fill="#1E293B" stroke="#00E5FF" stroke-width="1.5" />
                <rect x="132" y="62" width="16" height="24" rx="8" fill="#1E293B" stroke="#00E5FF" stroke-width="1.5" />
              </svg>

              <!-- 3. Engrenagem Técnica -->
              <svg v-else viewBox="0 0 200 200" class="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:rotate-12">
                <circle cx="100" cy="100" r="54" fill="#1E293B" stroke="#475569" stroke-width="2" />
                <g stroke="#00E5FF" stroke-width="3" stroke-linecap="round">
                  <line x1="100" y1="36" x2="100" y2="47" />
                  <line x1="100" y1="153" x2="100" y2="164" />
                  <line x1="36" y1="100" x2="47" y2="100" />
                  <line x1="153" y1="100" x2="164" y2="100" />
                  <line x1="55" y1="55" x2="63" y2="63" />
                  <line x1="137" y1="137" x2="145" y2="145" />
                </g>
                <circle cx="100" cy="100" r="30" fill="#0B0F16" stroke="#00E5FF" stroke-width="1.5" />
                <circle cx="100" cy="100" r="16" fill="#1E293B" />
                <rect x="96" y="80" width="8" height="12" rx="2" fill="#00E5FF" />
              </svg>

              <!-- Badges -->
              <span class="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-slate-900/85 border border-slate-700/50 text-[10px] sm:text-[11px] font-['Space_Grotesk'] text-slate-200 flex items-center gap-1.5 shadow-sm">
                <Sparkles class="w-3 h-3 text-cyan-400" />
                <span>{{ item.badge }}</span>
              </span>
              <span class="absolute top-3.5 right-3.5 px-2 py-1 rounded-full bg-slate-800/90 border border-slate-700/50 text-[9px] sm:text-[10px] font-['Space_Grotesk'] text-slate-400">
                {{ item.category }}
              </span>
            </div>

            <!-- Card Body -->
            <div class="p-5 sm:p-6 pb-2 space-y-2.5">
              <h3 class="text-lg font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-400 transition-colors">
                {{ item.name }}
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                {{ item.description }}
              </p>
              <div class="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
                <span class="px-2 py-0.5 rounded bg-slate-900/70 border border-slate-700/40 text-slate-300">
                  {{ item.material }}
                </span>
                <span class="flex items-center gap-1 text-cyan-400/90">
                  <Clock class="w-3 h-3 shrink-0" /> {{ item.leadTime }}
                </span>
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-5 sm:p-6 pt-3">
            <div class="pt-3 border-t border-slate-700/40 flex items-center justify-between gap-3">
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-['Space_Grotesk'] block">
                  {{ item.pricePrefix }}
                </span>
                <span class="text-lg font-bold font-['Space_Grotesk'] text-white">
                  {{ item.priceValue }}
                </span>
              </div>
              <a 
                :href="getOrderLink(item.name)"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer min-h-[38px] active:scale-95"
              >
                <MessageSquare class="w-3.5 h-3.5 fill-current" />
                <span>Pedir</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. GUIA RÁPIDO DE MATERIAIS & ENGENHARIA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/50 text-xs font-['Space_Grotesk'] text-cyan-400">
          <Wrench class="w-3.5 h-3.5 text-cyan-400" />
          <span>GUIA DE PRODUÇÃO</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
          Materiais de Engenharia & Acabamento
        </h2>
        <p class="text-slate-400 text-sm sm:text-base">
          Escolha a matéria-prima ideal para as necessidades do seu projeto ou conte com nossa recomendação técnica.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div 
          v-for="(mat, idx) in materialsGuide" 
          :key="idx"
          class="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm flex flex-col justify-between hover:border-cyan-400/40 transition-all group"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <component :is="mat.icon" class="w-6 h-6" />
              </div>
              <span class="px-2.5 py-1 rounded-full bg-slate-900/70 text-[10px] font-['Space_Grotesk'] text-slate-400 border border-slate-700/40">
                {{ mat.tag }}
              </span>
            </div>

            <div>
              <h3 class="text-lg font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-400 transition-colors">
                {{ mat.title }}
              </h3>
              <span class="text-xs text-cyan-400/90 font-medium font-['Space_Grotesk'] block mt-0.5">
                {{ mat.subtitle }}
              </span>
            </div>

            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {{ mat.description }}
            </p>
          </div>

          <div class="pt-5 mt-4 border-t border-slate-700/40 space-y-2">
            <div 
              v-for="(feat, fIdx) in mat.features" 
              :key="fIdx"
              class="flex items-center gap-2 text-xs text-slate-300"
            >
              <CheckCircle2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{{ feat }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FAQ RÁPIDO (Acordeão Interativo) -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 sm:mb-10 space-y-2">
        <h2 class="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
          Perguntas Frequentes
        </h2>
        <p class="text-slate-400 text-sm">
          Tire suas dúvidas técnicas mais comuns antes de enviar seu projeto.
        </p>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, fIdx) in faqs" 
          :key="fIdx"
          class="rounded-2xl bg-slate-800/70 border border-slate-700/50 overflow-hidden transition-colors"
          :class="activeFaq === fIdx ? 'border-cyan-400/50 shadow-md' : 'hover:border-slate-700'"
        >
          <button 
            type="button"
            @click="toggleFaq(fIdx)"
            class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
          >
            <span class="text-sm sm:text-base font-semibold text-white font-['Space_Grotesk']">
              {{ faq.q }}
            </span>
            <div 
              class="w-7 h-7 rounded-lg bg-slate-900/80 border border-slate-700/40 flex items-center justify-center text-cyan-400 shrink-0 transition-transform duration-200"
              :class="activeFaq === fIdx ? 'rotate-180 bg-cyan-500/20 text-cyan-300' : ''"
            >
              <ChevronDown class="w-4 h-4" />
            </div>
          </button>

          <div 
            v-show="activeFaq === fIdx"
            class="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-700/30 pt-3"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- 5. BANNER FINAL DE CONVERSÃO -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-800/80 via-slate-800/90 to-slate-800/80 border border-slate-700/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div class="space-y-2 text-center md:text-left z-10 max-w-xl">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] font-['Space_Grotesk'] text-cyan-400">
            <span>COMECE SEU PROJETO HOJE</span>
          </div>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white">
            Pronto para transformar sua ideia em realidade física?
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Navegue pelo nosso portfólio completo de soluções ou fale direto com um especialista para simular seu orçamento.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10 shrink-0">
          <button
            type="button"
            @click="emit('navigate', 'solucoes')"
            class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 hover:border-cyan-400/40 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center min-h-[44px]"
          >
            Explorar Soluções
          </button>

          <button
            type="button"
            @click="emit('open-quote')"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2 min-h-[44px] active:scale-95"
          >
            <MessageSquare class="w-4 h-4 fill-current" />
            <span>Pedir Orçamento Sob Medida</span>
          </button>
        </div>
      </div>
    </section>

  </div>
</template>
