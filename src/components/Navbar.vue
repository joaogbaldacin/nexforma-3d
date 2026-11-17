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
  isScrolled.value = window.scrollY > 30
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
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-[#0B0D10]/90 backdrop-blur-md border-b border-[#232B3B] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#hero" class="flex items-center" @click="closeMobileMenu">
          <NexFormaLogo size="normal" :show-tagline="false" />
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-8">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            class="text-sm font-medium text-[#9CA3AF] hover:text-[#00E5FF] transition-colors tracking-wide relative group py-1"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full drop-shadow-[0_0_6px_#00E5FF]"></span>
          </a>
        </nav>

        <!-- Right Side: Social & CTA -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Clean Round Instagram Icon Button -->
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-full bg-[#151921] border border-[#232B3B] hover:border-[#00E5FF] text-[#9CA3AF] hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] group"
            title="Siga a NexForma.3D no Instagram"
            aria-label="Instagram da NexForma.3D"
          >
            <Instagram class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <!-- CTA Button -->
          <button 
            type="button"
            @click="emit('open-quote')"
            class="relative group overflow-hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-[#0B0D10] bg-[#00E5FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span class="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <MessageSquare class="w-4 h-4 fill-current" />
            <span>Pedir Orçamento</span>
          </button>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center gap-2.5 md:hidden">
          <!-- Mobile Instagram Icon Button -->
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-[#151921] border border-[#232B3B] hover:border-[#00E5FF] text-[#9CA3AF] hover:text-[#00E5FF] flex items-center justify-center transition-all"
            aria-label="Instagram da NexForma.3D"
          >
            <Instagram class="w-4 h-4" />
          </a>

          <button 
            type="button"
            @click="emit('open-quote')"
            class="px-3 py-1.5 text-xs font-semibold rounded bg-[#00E5FF] text-[#0B0D10] flex items-center gap-1 cursor-pointer"
          >
            <MessageSquare class="w-3.5 h-3.5" />
            <span>Orçamento</span>
          </button>

          <button 
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg bg-[#151921] border border-[#232B3B] text-[#9CA3AF] hover:text-[#00E5FF] focus:outline-none cursor-pointer"
            aria-label="Abrir Menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5 text-[#00E5FF]" />
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
        class="md:hidden bg-[#0B0D10]/95 backdrop-blur-xl border-b border-[#232B3B] px-6 py-6 space-y-4 shadow-2xl"
      >
        <div class="flex flex-col space-y-3">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href"
            @click="closeMobileMenu"
            class="text-base font-medium text-[#F3F4F6] hover:text-[#00E5FF] py-2 border-b border-[#232B3B]/40 flex items-center justify-between"
          >
            <span>{{ link.name }}</span>
            <ChevronRight class="w-4 h-4 text-[#9CA3AF]" />
          </a>
        </div>

        <div class="pt-2 flex flex-col gap-3">
          <a 
            href="https://instagram.com/nexforma.3d" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#151921] border border-[#232B3B] text-sm text-[#9CA3AF] hover:text-[#00E5FF]"
          >
            <Instagram class="w-4 h-4 text-[#00E5FF]" />
            <span class="font-['Space_Grotesk']">Instagram @nexforma.3d</span>
          </a>

          <button 
            type="button"
            @click="() => { closeMobileMenu(); emit('open-quote'); }"
            class="w-full py-3 rounded-lg bg-[#00E5FF] text-[#0B0D10] font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
          >
            <MessageSquare class="w-4 h-4 fill-current" />
            <span>Pedir Orçamento no WhatsApp</span>
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>
