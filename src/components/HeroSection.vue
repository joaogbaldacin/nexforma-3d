<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getGeneralWhatsAppUrl } from '../utils/whatsapp'
import { 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  Cpu, 
  Layers, 
  Gauge, 
  Thermometer, 
  Flame, 
  Globe2, 
  CheckCircle2, 
  Terminal
} from 'lucide-vue-next'

const emit = defineEmits(['open-quote', 'navigate'])

const WHATSAPP_URL = getGeneralWhatsAppUrl()

// Animated telemetry simulation
const currentLayer = ref(184)
const totalLayers = 320
const progressPercent = ref(58)
const nozzleTemp = ref(220)
const bedTemp = ref(60)
const currentGcode = ref('G1 X128.40 Y94.20 E2.14 F15000')

const gcodeLog = [
  'G1 X112.50 Y88.10 E1.82 F12000 ; Infill Gyroid',
  'G1 X124.30 Y92.40 E2.05 F15000 ; Inner Wall',
  'G1 X136.20 Y98.80 E2.38 F18000 ; Perimeter Pass',
  'G1 Z29.44 F600 ; Layer shift -> 184',
  'M106 S255 ; Fan 100% cooling active',
  'G1 X142.10 Y105.30 E2.71 F15000 ; Surface ironing'
]
let gcodeIndex = 0
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    gcodeIndex = (gcodeIndex + 1) % gcodeLog.length
    currentGcode.value = gcodeLog[gcodeIndex]
    
    // Subtle temperature variance simulation
    nozzleTemp.value = 220 + (Math.floor(Math.random() * 3) - 1)
  }, 2200)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="hero" class="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden build-plate-iso bg-gradient-to-b from-[#131A2B] via-[#161F33] to-[#111726]">
    
    <!-- Ambient Neon Glow Accents in Background -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[250px] sm:h-[350px] bg-cyan-500/6 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none -z-10"></div>
    <div class="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-sky-500/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none -z-10"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        <!-- Left Column: Copy & CTAs (7 cols) -->
        <div class="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          
          <!-- Badge: Brand & Shipping -->
          <div class="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] max-w-full">
            <span class="relative flex h-2 w-2 shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span class="text-xs font-semibold text-slate-200 font-['Space_Grotesk'] tracking-wide">
              NEXFORMA.3D
            </span>
            <span class="text-[#232B3B] hidden xs:inline">•</span>
            <span class="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1 font-['JetBrains_Mono']">
              <Globe2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 
              <span>Envio para Brasil e Exterior</span>
            </span>
          </div>

          <!-- Main Headline (Optimized for Mobile Viewports) -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F3F4F6] font-['Space_Grotesk'] leading-[1.15]">
            Dando forma às suas ideias, <br />
            <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-slate-200 bg-clip-text text-transparent">
              camada por camada.
            </span>
          </h1>

          <!-- Subtitle / Bio Value Proposition -->
          <p class="text-sm sm:text-base lg:text-lg text-[#9CA3AF] max-w-2xl font-normal leading-relaxed">
            Especialistas em fabricação digital aditiva: desde <strong class="text-[#F3F4F6]">presentes personalizados</strong> e peças exclusivas de <strong class="text-[#F3F4F6]">decoração</strong>, até <strong class="text-[#F3F4F6]">utilidades para seu setup</strong> e <strong class="text-[#F3F4F6]">protótipos técnicos industriais</strong> sob medida.
          </p>

          <!-- Highlights Chips -->
          <div class="flex flex-wrap gap-2 pt-1">
            <div class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-[11px] sm:text-xs text-[#9CA3AF]">
              <CheckCircle2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Alta Resolução (0.08mm - 0.20mm)</span>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-[11px] sm:text-xs text-[#9CA3AF]">
              <CheckCircle2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Filamentos de Engenharia & Resina</span>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-[11px] sm:text-xs text-[#9CA3AF]">
              <CheckCircle2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Orçamento Ágil sem Compromisso</span>
            </div>
          </div>

          <!-- Action Buttons (Responsive flex-col on mobile, flex-row on desktop) -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
            <a 
              :href="WHATSAPP_URL"
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full sm:w-auto relative group overflow-hidden px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-center flex items-center justify-center gap-2.5 shadow-md hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
            >
              <span class="absolute inset-0 w-full h-full bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <MessageSquare class="w-5 h-5 fill-current shrink-0" />
              <span>Pedir Orçamento no WhatsApp</span>
            </a>

            <button
              type="button"
              @click="emit('navigate', 'catalogo')"
              class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-400/40 text-[#F3F4F6] font-semibold text-center flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px] cursor-pointer"
            >
              <span>Ver Catálogo & Ideias</span>
              <ArrowRight class="w-4 h-4 text-cyan-400 shrink-0" />
            </button>
          </div>

          <!-- Social Proof note -->
          <div class="flex items-center gap-3 pt-1 text-xs text-slate-400">
            <div class="flex -space-x-2 shrink-0">
              <div class="w-7 h-7 rounded-full bg-slate-700/80 border border-cyan-400/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold">3D</div>
              <div class="w-7 h-7 rounded-full bg-slate-800/70 border border-slate-700/40 flex items-center justify-center text-[10px] text-white">BR</div>
              <div class="w-7 h-7 rounded-full bg-slate-900/70 border border-slate-700/40 flex items-center justify-center text-[10px] text-cyan-400">✦</div>
            </div>
            <span class="text-[11px] sm:text-xs">Atendimento direto com especialistas via WhatsApp ou Instagram <strong>@nexforma.3d</strong></span>
          </div>

        </div>

        <!-- Right Column: Interactive 3D Print Simulation Card (5 cols) -->
        <div class="lg:col-span-5 mt-4 lg:mt-0">
          <div class="relative rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-xl shadow-black/40 overflow-hidden group hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-sm">
            
            <!-- Terminal Header / Status Bar -->
            <div class="px-4 sm:px-5 py-3 bg-slate-900/80 border-b border-slate-700/50 flex items-center justify-between">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#00E5FF]/80"></span>
                <span class="ml-1 sm:ml-2 text-[10px] sm:text-xs font-['JetBrains_Mono'] text-[#9CA3AF] truncate max-w-[140px] sm:max-w-none">BAMBU_X1C // LIVE</span>
              </div>
              
              <div class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-cyan-400">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span>FABRICANDO</span>
              </div>
            </div>

            <!-- 3D Isometric Build Plate Visualizer -->
            <div class="relative h-52 sm:h-64 bg-slate-900/90 build-plate-grid flex items-center justify-center overflow-hidden border-b border-slate-700/50">
              
              <!-- Laser Scanner Line -->
              <div class="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-laser z-20 pointer-events-none"></div>

              <!-- Isometric Model Representation (Layers in Progress) -->
              <div class="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center">
                
                <!-- Build Plate Grid Base in 3D perspective -->
                <svg viewBox="0 0 200 200" class="w-full h-full">
                  <defs>
                    <linearGradient id="cyber-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#0077B6" stop-opacity="0.4"/>
                    </linearGradient>
                    <filter id="glow-svg">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <!-- Bed Plate Grid Lines -->
                  <path d="M100 20 L180 70 L100 120 L20 70 Z" fill="#151921" stroke="#232B3B" stroke-width="1.5" />
                  <path d="M100 35 L160 72.5 L100 110 L40 72.5 Z" fill="none" stroke="#232B3B" stroke-dasharray="2 2" stroke-width="1" />
                  
                  <!-- Layer 1 Deposited -->
                  <path d="M100 100 L150 75 L150 82 L100 107 L50 82 L50 75 Z" fill="#1C2433" stroke="#00E5FF" stroke-width="1.2" />

                  <!-- Layer 2 Deposited -->
                  <path d="M100 90 L150 65 L150 72 L100 97 L50 72 L50 65 Z" fill="#1C2433" stroke="#00E5FF" stroke-width="1.2" />

                  <!-- Layer 3 Deposited -->
                  <path d="M100 80 L150 55 L150 62 L100 87 L50 62 L50 55 Z" fill="#1A283C" stroke="#00E5FF" stroke-width="1.5" />

                  <!-- Top Active Layer (Glowing Cyan) -->
                  <path d="M100 70 L150 45 L100 20 L50 45 Z" fill="url(#cyber-glow)" stroke="#00E5FF" stroke-width="2" filter="url(#glow-svg)" />
                  <path d="M50 45 L100 70 L100 75 L50 50 Z" fill="#00E5FF" opacity="0.7" />
                  <path d="M100 70 L150 45 L150 50 L100 75 Z" fill="#0096C7" opacity="0.7" />

                  <!-- Virtual Toolhead / Nozzle Position -->
                  <circle cx="108" cy="42" r="3.5" fill="#FFFFFF" filter="url(#glow-svg)" />
                  <circle cx="108" cy="42" r="6" fill="none" stroke="#00E5FF" stroke-width="1" class="animate-ping" />
                </svg>

                <!-- Floating Coordinates Overlay -->
                <div class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-['JetBrains_Mono'] text-cyan-400">
                  Z: +29.44mm (0.16)
                </div>

                <div class="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-['JetBrains_Mono'] text-[#9CA3AF]">
                  INFILL: 45% GYROID
                </div>
              </div>

            </div>

            <!-- Print Telemetry Stats Grid -->
            <div class="p-4 sm:p-5 space-y-3.5 sm:space-y-4">
              
              <!-- Progress Bar -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span class="text-[#9CA3AF] flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Layers class="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Progresso: Camada {{ currentLayer }} / {{ totalLayers }}
                  </span>
                  <span class="text-cyan-400 font-bold text-xs">{{ progressPercent }}%</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-900/70 border border-slate-700/40 overflow-hidden p-[1px]">
                  <div 
                    class="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500"
                    :style="{ width: progressPercent + '%' }"
                  ></div>
                </div>
              </div>

              <!-- 4 Telemetry Metrics Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-['JetBrains_Mono'] text-xs">
                
                <!-- Metric 1: Nozzle -->
                <div class="p-2 sm:p-2.5 rounded-lg bg-slate-900/70 border border-slate-700/40 flex flex-col">
                  <div class="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                    <Flame class="w-3 h-3 text-red-400 shrink-0" /> Bico (E0)
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-[#F3F4F6] mt-0.5">{{ nozzleTemp }}°C</span>
                  <span class="text-[9px] text-[#9CA3AF]">Meta: 220°C</span>
                </div>

                <!-- Metric 2: Bed -->
                <div class="p-2 sm:p-2.5 rounded-lg bg-slate-900/70 border border-slate-700/40 flex flex-col">
                  <div class="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                    <Thermometer class="w-3 h-3 text-amber-400 shrink-0" /> Mesa
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-[#F3F4F6] mt-0.5">{{ bedTemp }}°C</span>
                  <span class="text-[9px] text-[#9CA3AF]">Meta: 60°C</span>
                </div>

                <!-- Metric 3: Speed -->
                <div class="p-2 sm:p-2.5 rounded-lg bg-slate-900/70 border border-slate-700/40 flex flex-col">
                  <div class="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                    <Gauge class="w-3 h-3 text-cyan-400 shrink-0" /> Velocidade
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5">250 mm/s</span>
                  <span class="text-[9px] text-[#9CA3AF]">Acel: 10K</span>
                </div>

                <!-- Metric 4: Filament -->
                <div class="p-2 sm:p-2.5 rounded-lg bg-slate-900/70 border border-slate-700/40 flex flex-col">
                  <div class="flex items-center gap-1 text-[#9CA3AF] text-[10px]">
                    <Cpu class="w-3 h-3 text-cyan-400 shrink-0" /> Material
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-[#F3F4F6] mt-0.5 truncate">PETG-CF</span>
                  <span class="text-[9px] text-cyan-400">Ciano / Tech</span>
                </div>

              </div>

              <!-- Simulated GCode Console Line -->
              <div class="flex items-center gap-2 p-2 rounded-md bg-slate-900/70 border border-slate-700/40 text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-[#9CA3AF] overflow-hidden">
                <Terminal class="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                <span class="text-cyan-400/80 shrink-0">$</span>
                <span class="truncate text-[#F3F4F6]">{{ currentGcode }}</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
