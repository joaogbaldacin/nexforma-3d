<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NexFormaLogo from './NexFormaLogo.vue'
import { Menu, X, MessageSquare, Instagram, ChevronRight } from 'lucide-vue-next'

const emit = defineEmits(['open-quote'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Início', href: '#hero' },
  { name: 'Soluções', href: '#solucoes' },
  { name: 'Catálogo', href: '#catalogo' },
  { name: 'Como Funciona', href: '#como-funciona' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const GENERAL_WHATSAPP_URL = "https://wa.me/5519989690055?text=" + encodeURIComponent("Olá! Vim pelo site da NexForma.3D e gostaria de solicitar um orçamento sob medida.")
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-[#111726]/95 backdrop-blur-xl border-b border-slate-700/50 py-2.5 sm:py-3 shadow-lg shadow-black/30' 
        : 'bg-transparent py-3.5 sm:py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-2 sm:gap-4">
        
        <!-- Logo -->
        <a href="#hero" class="flex items-center shrink-0" @click="closeMobileMenu">
          <NexFormaLogo size="normal" :show-tagline="false" />
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            class="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors tracking-wide relative group py-1"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        <!-- Right Side: Desktop Social & CTA -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Clean Round Instagram Icon Button -->
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group"
            title="Siga a NexForma.3D no Instagram"
            aria-label="Instagram da NexForma.3D"
          >
            <Instagram class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <!-- CTA Button (WhatsApp Direct) -->
          <a 
            :href="GENERAL_WHATSAPP_URL"
            target="_blank" 
            rel="noopener noreferrer"
            class="relative group overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 shadow-md hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 min-h-[42px]"
          >
            <span class="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <MessageSquare class="w-4 h-4 fill-current" />
            <span>Pedir Orçamento</span>
          </a>
        </div>

        <!-- Mobile Controls (Clean, Compact, No Overlap) -->
        <div class="flex items-center gap-1.5 sm:gap-2.5 md:hidden shrink-0">
          <!-- Mobile Instagram Icon Button -->
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all active:scale-95 shrink-0"
            title="Instagram"
            aria-label="Instagram da NexForma.3D"
          >
            <Instagram class="w-4 h-4" />
          </a>

          <!-- Quick Quote Button (WhatsApp Direct) -->
          <a 
            :href="GENERAL_WHATSAPP_URL"
            target="_blank" 
            rel="noopener noreferrer"
            class="px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white flex items-center gap-1 active:scale-95 cursor-pointer shrink-0 min-h-[36px]"
          >
            <MessageSquare class="w-3.5 h-3.5 fill-current" />
            <span class="hidden xs:inline sm:inline">Orçamento</span>
          </a>

          <!-- Hamburger Menu Toggle Button -->
          <button 
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-cyan-400 flex items-center justify-center focus:outline-none cursor-pointer active:scale-95 shrink-0"
            aria-label="Abrir Menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5 text-cyan-400" />
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Dropdown Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-[#111726]/98 backdrop-blur-xl border-b border-slate-700/50 px-5 sm:px-6 py-6 space-y-4 shadow-2xl"
      >
        <div class="flex flex-col space-y-2">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            @click="closeMobileMenu"
            class="text-base font-medium text-slate-200 hover:text-cyan-400 py-3 border-b border-slate-700/30 flex items-center justify-between"
          >
            <span>{{ link.name }}</span>
            <ChevronRight class="w-4 h-4 text-slate-500" />
          </a>
        </div>

        <div class="pt-3 flex flex-col gap-3">
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sm text-slate-400 hover:text-cyan-400 active:scale-98 transition-all"
          >
            <Instagram class="w-4 h-4 text-cyan-400" />
            <span class="font-['Space_Grotesk'] font-medium">Instagram @nexforma.3d</span>
          </a>

          <a 
            :href="GENERAL_WHATSAPP_URL"
            target="_blank" 
            rel="noopener noreferrer"
            @click="closeMobileMenu"
            class="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 min-h-[48px] shadow-md"
          >
            <MessageSquare class="w-4 h-4 fill-current" />
            <span>Pedir Orçamento no WhatsApp</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
