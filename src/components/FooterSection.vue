<script setup>
import NexFormaLogo from './NexFormaLogo.vue'
import { Instagram, MessageSquare, Globe2 } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#07090C] border-t border-[#232B3B] text-[#9CA3AF] relative overflow-hidden">
    
    <!-- Top subtle gradient line -->
    <div class="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        
        <!-- Col 1 & 2: Brand & About (2 cols) -->
        <div class="sm:col-span-2 space-y-4 sm:space-y-5">
          <NexFormaLogo size="large" :show-tagline="true" />
          
          <p class="text-xs sm:text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
            Dando forma às suas ideias, camada por camada. Soluções completas em fabricação digital aditiva: presentes personalizados, decoração, utilidades de setup e prototipagem industrial técnica.
          </p>

          <!-- Social Buttons (Only Icons, Clean & Compact) -->
          <div class="flex items-center gap-3 pt-1">
            <!-- Instagram Icon Button -->
            <a 
              href="https://instagram.com/nexforma.3d" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-[#151921] border border-[#232B3B] hover:border-[#00E5FF] text-[#9CA3AF] hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] group active:scale-95 shrink-0"
              title="Instagram @nexforma.3d"
              aria-label="Instagram da NexForma.3D"
            >
              <Instagram class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <!-- WhatsApp Icon Button -->
            <a 
              href="https://wa.me/5514999999999?text=Ol%C3%A1%20NexForma.3D!"
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-[#151921] border border-[#232B3B] hover:border-[#00E5FF] text-[#9CA3AF] hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] group active:scale-95 shrink-0"
              title="WhatsApp Atendimento NexForma.3D"
              aria-label="WhatsApp da NexForma.3D"
            >
              <MessageSquare class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>

          <!-- Shipping Badge -->
          <div class="inline-flex items-center gap-2 text-[11px] sm:text-xs text-[#9CA3AF] font-['JetBrains_Mono'] bg-[#151921]/60 px-3 py-1.5 rounded-lg border border-[#232B3B]/60 max-w-full">
            <Globe2 class="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
            <span class="truncate">Envios protegidos para todo o Brasil e exterior 🇧🇷 ✈️</span>
          </div>
        </div>

        <!-- Col 3: Navigation Links -->
        <div class="space-y-3 sm:space-y-4">
          <h4 class="text-xs font-bold text-[#F3F4F6] uppercase tracking-widest font-['JetBrains_Mono']">
            Navegação
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li>
              <a href="#hero" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Início</a>
            </li>
            <li>
              <a href="#solucoes" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Soluções</a>
            </li>
            <li>
              <a href="#catalogo" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Catálogo de Projetos</a>
            </li>
            <li>
              <a href="#como-funciona" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Como Funciona</a>
            </li>
          </ul>
        </div>

        <!-- Col 4: Soluções -->
        <div class="space-y-3 sm:space-y-4">
          <h4 class="text-xs font-bold text-[#F3F4F6] uppercase tracking-widest font-['JetBrains_Mono']">
            Categorias
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li>
              <a href="#solucoes" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Presentes Personalizados</a>
            </li>
            <li>
              <a href="#solucoes" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Decoração & Design</a>
            </li>
            <li>
              <a href="#solucoes" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Peças Técnicas & Protótipos</a>
            </li>
            <li>
              <a href="#solucoes" class="hover:text-[#00E5FF] transition-colors py-0.5 inline-block">Utilidades & Setup</a>
            </li>
          </ul>
        </div>

        <!-- Col 5: Atendimento & Horários -->
        <div class="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
          <h4 class="text-xs font-bold text-[#F3F4F6] uppercase tracking-widest font-['JetBrains_Mono']">
            Atendimento
          </h4>
          <p class="text-xs leading-relaxed text-[#9CA3AF]">
            Atendimento digital ágil via WhatsApp ou Direct no Instagram. Respostas e orçamentos no mesmo dia.
          </p>
          <div class="p-3 rounded-xl bg-[#151921] border border-[#232B3B] space-y-1 text-xs font-['JetBrains_Mono']">
            <div class="text-[#00E5FF] font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
              <span>OFICINA DIGITAL ATIVA</span>
            </div>
            <p class="text-[#9CA3AF] text-[11px]">Segunda a Sábado: 08h às 20h</p>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Perfectly Centered Copyright -->
      <div class="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#232B3B] text-center">
        <p class="text-[11px] sm:text-xs font-['JetBrains_Mono'] text-[#9CA3AF]">
          © {{ currentYear }} <strong class="text-[#F3F4F6] font-semibold">NexForma.3D</strong>. Todos os direitos reservados.
        </p>
      </div>

    </div>
  </footer>
</template>
