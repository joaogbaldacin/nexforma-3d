<script setup>
import NexFormaLogo from './NexFormaLogo.vue'
import { Instagram, MessageSquare, Globe2 } from 'lucide-vue-next'

const emit = defineEmits(['navigate'])

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#0D1420] border-t border-slate-700/50 text-slate-400 relative overflow-hidden">
    
    <!-- Top subtle gradient line -->
    <div class="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        
        <!-- Col 1 & 2: Brand & About (2 cols) -->
        <div class="sm:col-span-2 space-y-4 sm:space-y-5">
          <button 
            type="button" 
            @click="emit('navigate', 'home')"
            class="text-left cursor-pointer"
          >
            <NexFormaLogo size="large" :show-tagline="true" />
          </button>
          
          <p class="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
            Dando forma às suas ideias, camada por camada. Soluções completas em fabricação digital aditiva: presentes personalizados, decoração, utilidades de setup e prototipagem industrial técnica.
          </p>

          <!-- Social Buttons (Only Icons, Clean & Compact) -->
          <div class="flex items-center gap-3 pt-1">
            <!-- Instagram Icon Button -->
            <a 
              href="https://instagram.com/nexforma.3d" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800/70 border border-slate-700/50 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group active:scale-95 shrink-0"
              title="Instagram @nexforma.3d"
              aria-label="Instagram da NexForma.3D"
            >
              <Instagram class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <!-- WhatsApp Icon Button -->
            <a 
              :href="'https://wa.me/5519989690055?text=' + encodeURIComponent('Olá! Vim pelo site da NexForma.3D e gostaria de solicitar um orçamento sob medida.')"
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800/70 border border-slate-700/50 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group active:scale-95 shrink-0"
              title="WhatsApp Atendimento NexForma.3D"
              aria-label="WhatsApp da NexForma.3D"
            >
              <MessageSquare class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>

          <!-- Shipping Badge -->
          <div class="inline-flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 font-['JetBrains_Mono'] bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/40 max-w-full">
            <Globe2 class="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span class="truncate">Envios protegidos para todo o Brasil e exterior 🇧🇷 ✈️</span>
          </div>
        </div>

        <!-- Col 3: Navigation Links -->
        <div class="space-y-3 sm:space-y-4">
          <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest font-['JetBrains_Mono']">
            Navegação
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'home')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Início
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'solucoes')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Soluções
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'catalogo')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Catálogo de Projetos
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'como-funciona')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Como Funciona
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 4: Soluções / Categorias -->
        <div class="space-y-3 sm:space-y-4">
          <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest font-['JetBrains_Mono']">
            Categorias
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'catalogo', 'presentes')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Presentes Personalizados
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'catalogo', 'decoracao')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Decoração & Design
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'catalogo', 'tecnicas')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Peças Técnicas & Protótipos
              </button>
            </li>
            <li>
              <button 
                type="button" 
                @click="emit('navigate', 'catalogo', 'setup')" 
                class="hover:text-cyan-400 transition-colors py-0.5 cursor-pointer text-left"
              >
                Utilidades & Setup
              </button>
            </li>
          </ul>
        </div>

        <!-- Col 5: Atendimento & Horários -->
        <div class="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
          <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest font-['JetBrains_Mono']">
            Atendimento
          </h4>
          <p class="text-xs leading-relaxed text-slate-400">
            Atendimento digital ágil via WhatsApp ou Direct no Instagram. Respostas e orçamentos no mesmo dia.
          </p>
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-700/40 space-y-1 text-xs font-['JetBrains_Mono']">
            <div class="text-cyan-400 font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>OFICINA DIGITAL ATIVA</span>
            </div>
            <p class="text-slate-400 text-[11px]">Segunda a Sábado: 08h às 20h</p>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Perfectly Centered Copyright -->
      <div class="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-700/40 text-center">
        <p class="text-[11px] sm:text-xs font-['JetBrains_Mono'] text-slate-500">
          © {{ currentYear }} <strong class="text-slate-200 font-semibold">NexForma.3D</strong>. Todos os direitos reservados.
        </p>
      </div>

    </div>
  </footer>
</template>
