<script setup>
import { 
  Gift, 
  Sparkles, 
  Wrench, 
  Layers, 
  ArrowUpRight, 
  Check, 
  Cpu, 
  Box, 
  Zap, 
  Palette 
} from 'lucide-vue-next'

const emit = defineEmits(['open-quote', 'filter-catalog'])

const solutions = [
  {
    id: 'presentes',
    title: 'Presentes Personalizados',
    badge: 'Exclusividade & Afeto',
    description: 'Transforme memórias e ideias em peças tangíveis: luminárias litofanias 3D, action figures, colecionáveis pintados, chaveiros detalhados e brindes corporativos marcantes.',
    icon: Gift,
    tags: ['Litofanias LED', 'Colecionáveis', 'Troféus', 'Resina 8K'],
    whatsappQuery: 'Olá! Tenho interesse em encomendar um Presente Personalizado sob medida com a NexForma.3D.',
    accentColor: '#00E5FF',
    highlight: 'Ideias únicas para datas especiais'
  },
  {
    id: 'decoracao',
    title: 'Decoração & Design',
    badge: 'Estética Contemporânea',
    description: 'Vasos geométricos paramétricos, esculturas de formas orgânicas, abajures vazados e painéis arquitetônicos modernos para transformar qualquer ambiente residencial ou comercial.',
    icon: Sparkles,
    tags: ['Vasos Voronoi', 'Design Paramétrico', 'PLA Silk', 'Minimalista'],
    whatsappQuery: 'Olá! Gostaria de um orçamento para peças de Decoração & Design da NexForma.3D.',
    accentColor: '#00E5FF',
    highlight: 'Acabamento acetinado e cores exclusivas'
  },
  {
    id: 'tecnicas',
    title: 'Peças Técnicas & Protótipos',
    badge: 'Engenharia & Precisão',
    description: 'Engrenagens resistentes, gabaritos industriais, caixas para circuitos eletrônicos, adaptadores e peças de reposição descontinuadas com tolerâncias mecânicas rigorosas.',
    icon: Wrench,
    tags: ['PETG / ABS+', 'Nylon Carbon (CF)', 'Tolerância ±0.05mm', 'Resistência Térmica'],
    whatsappQuery: 'Olá! Preciso de um orçamento para fabricação de Peça Técnica / Protótipo com a NexForma.3D.',
    accentColor: '#00E5FF',
    highlight: 'Materiais de engenharia de alta performance'
  },
  {
    id: 'setup',
    title: 'Utilidades & Setup',
    badge: 'Ergonomia & Organização',
    description: 'Otimize sua estação de trabalho ou setup gamer com suportes ergonômicos de headphone, organizadores magnéticos de cabos, cases para stream deck e adaptadores sob medida.',
    icon: Layers,
    tags: ['Suportes Headphone', 'Gestão de Cabos', 'Bases Articuladas', 'Dock Stations'],
    whatsappQuery: 'Olá! Gostaria de personalizar peças de Utilidades & Setup com a NexForma.3D.',
    accentColor: '#00E5FF',
    highlight: 'Encaixes milimétricos e estabilidade'
  }
]

const getWhatsAppLink = (message) => {
  return `https://wa.me/5519989690055?text=${encodeURIComponent(message)}`
}
</script>

<template>
  <section id="solucoes" class="py-16 sm:py-20 md:py-24 bg-[#0B0D10] relative border-t border-[#232B3B]/60">
    
    <!-- Ambient subtle background glow -->
    <div class="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151921] border border-[#232B3B] text-xs font-['JetBrains_Mono'] text-[#00E5FF]">
          <Zap class="w-3.5 h-3.5" />
          <span>PORTFÓLIO MULTIDISCIPLINAR</span>
        </div>
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] tracking-tight">
          Soluções completas em <br class="hidden sm:inline" />
          <span class="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            Fabricação Digital
          </span>
        </h2>
        
        <p class="text-[#9CA3AF] text-sm sm:text-base lg:text-lg">
          Unimos tecnologia aditiva de última geração a acabamentos de alto padrão para atender projetos pessoais, decorativos e industriais.
        </p>
      </div>

      <!-- 4 Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        <div 
          v-for="sol in solutions" 
          :key="sol.id"
          class="relative rounded-2xl bg-[#151921] border border-[#232B3B] p-5 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#00E5FF]/60 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col justify-between group overflow-hidden"
        >
          <!-- Corner Ambient Accent -->
          <div class="absolute -top-12 -right-12 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-2xl group-hover:bg-[#00E5FF]/15 transition-all duration-500"></div>

          <div>
            <!-- Card Header: Icon & Badge -->
            <div class="flex items-start justify-between mb-4 sm:mb-6 gap-2">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0B0D10] border border-[#232B3B] group-hover:border-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.35)] flex items-center justify-center transition-all duration-300 shrink-0">
                <component :is="sol.icon" class="w-6 h-6 sm:w-7 sm:h-7 text-[#00E5FF] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span class="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-['JetBrains_Mono'] bg-[#0B0D10] text-[#9CA3AF] border border-[#232B3B] shrink-0">
                {{ sol.badge }}
              </span>
            </div>

            <!-- Title & Description -->
            <h3 class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#F3F4F6] mb-2 sm:mb-3 group-hover:text-[#00E5FF] transition-colors">
              {{ sol.title }}
            </h3>

            <p class="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              {{ sol.description }}
            </p>

            <!-- Feature Highlight -->
            <div class="p-2.5 sm:p-3 rounded-lg bg-[#0B0D10]/70 border border-[#232B3B]/80 mb-4 sm:mb-6 flex items-center gap-2 text-xs text-[#F3F4F6]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0"></span>
              <span class="font-medium text-[11px] sm:text-xs">{{ sol.highlight }}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              <span 
                v-for="tag in sol.tags" 
                :key="tag"
                class="px-2 sm:px-2.5 py-1 rounded bg-[#0B0D10] text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-[#9CA3AF] border border-[#232B3B] group-hover:border-[#00E5FF]/30 transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-4 border-t border-[#232B3B] flex items-center justify-between">
            <a 
              :href="getWhatsAppLink(sol.whatsappQuery)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#00E5FF] hover:text-[#33EBFF] group-hover:translate-x-1 transition-all py-1"
            >
              <span>Consultar / Orçar esta categoria</span>
              <ArrowUpRight class="w-4 h-4 shrink-0" />
            </a>
            
            <a 
              href="#catalogo"
              class="text-xs text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors hidden sm:block font-['JetBrains_Mono']"
            >
              Ver exemplos →
            </a>
          </div>

        </div>
      </div>

      <!-- Trust Footer Banner within Solutions -->
      <div class="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#151921] via-[#1A2230] to-[#151921] border border-[#232B3B] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
        <div class="flex items-start sm:items-center gap-3.5 sm:gap-4 text-left">
          <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
            <Cpu class="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 class="font-bold text-[#F3F4F6] font-['Space_Grotesk'] text-sm sm:text-base">Não encontrou o modelo exato que procura?</h4>
            <p class="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">Trabalhamos com modelagem 3D sob medida e aceitamos arquivos STL, OBJ, STEP, 3MF ou desenhos técnicos.</p>
          </div>
        </div>

        <a 
          :href="getWhatsAppLink('Olá! Tenho um projeto sob medida e gostaria de saber se vocês conseguem modelar e imprimir.')"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full md:w-auto shrink-0 px-6 py-3 rounded-xl bg-[#00E5FF] text-[#0B0D10] font-bold text-sm hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all cursor-pointer text-center flex items-center justify-center min-h-[44px]"
        >
          Enviar Meu Projeto
        </a>
      </div>

    </div>
  </section>
</template>
