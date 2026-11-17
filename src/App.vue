<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import SolutionsSection from './components/SolutionsSection.vue'
import CatalogSection from './components/CatalogSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import FooterSection from './components/FooterSection.vue'
import QuoteModal from './components/QuoteModal.vue'
import { MessageSquare } from 'lucide-vue-next'

const isQuoteModalOpen = ref(false)

const openQuote = () => {
  isQuoteModalOpen.value = true
}

const closeQuote = () => {
  isQuoteModalOpen.value = false
}

const WHATSAPP_FLOAT_URL = "https://wa.me/5514999999999?text=" + encodeURIComponent("Olá! Gostaria de conversar com a equipe da NexForma.3D sobre um projeto de impressão 3D.")
</script>

<template>
  <div class="min-h-screen bg-[#0B0D10] text-[#F3F4F6] flex flex-col font-['Inter'] relative selection:bg-[#00E5FF] selection:text-[#0B0D10]">
    
    <!-- Navbar -->
    <Navbar @open-quote="openQuote" />

    <!-- Main Content -->
    <main class="flex-grow">
      <!-- Hero Section -->
      <HeroSection @open-quote="openQuote" />

      <!-- Categories & Solutions -->
      <SolutionsSection @open-quote="openQuote" />

      <!-- Catalog Showcase -->
      <CatalogSection />

      <!-- How it Works (3 Steps) -->
      <HowItWorksSection @open-quote="openQuote" />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Interactive Quick Quote Builder Modal -->
    <QuoteModal :is-open="isQuoteModalOpen" @close="closeQuote" />

    <!-- Floating WhatsApp Action Button -->
    <a 
      :href="WHATSAPP_FLOAT_URL" 
      target="_blank" 
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 p-3.5 bg-[#00E5FF] text-[#0B0D10] font-bold rounded-full shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:shadow-[0_0_35px_rgba(0,229,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
      title="Falar no WhatsApp com a NexForma.3D"
    >
      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B0D10] opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-[#0B0D10]"></span>
      </span>
      <MessageSquare class="w-5 h-5 fill-current" />
      <span class="hidden md:inline-block pr-1 font-['Space_Grotesk'] text-sm font-extrabold tracking-wide">
        WhatsApp Orçamentos
      </span>
    </a>

  </div>
</template>
