<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import HomeHighlights from './components/HomeHighlights.vue'
import SolutionsSection from './components/SolutionsSection.vue'
import CatalogSection from './components/CatalogSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import FooterSection from './components/FooterSection.vue'
import QuoteModal from './components/QuoteModal.vue'
import AdminPanel from './components/AdminPanel.vue'
import { useProducts } from './composables/useProducts'
import { MessageSquare } from 'lucide-vue-next'

const { fetchProducts } = useProducts()

const isQuoteModalOpen = ref(false)
// Tab navigation state — 'home' | 'solucoes' | 'catalogo' | 'como-funciona' | 'admin'
const activeTab = ref('home')
// Pre-selected catalog category when navigating from Solutions cards or highlights
const catalogInitialCategory = ref('todos')

const openQuote = () => {
  isQuoteModalOpen.value = true
}

const closeQuote = () => {
  isQuoteModalOpen.value = false
}

// Navigate to an independent tab and smoothly scroll to top
const navigateTo = (tab, category = 'todos') => {
  activeTab.value = tab
  catalogInitialCategory.value = category
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Check URL parameters on mounted for admin access
onMounted(() => {
  fetchProducts()
  
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.get('admin') === 'true' || window.location.hash === '#admin') {
    activeTab.value = 'admin'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const WHATSAPP_FLOAT_URL = "https://wa.me/5519989690055?text=" + encodeURIComponent("Olá! Vim pelo site da NexForma.3D e gostaria de solicitar um orçamento sob medida.")
</script>

<template>
  <div class="min-h-screen bg-[#111726] text-[#F3F4F6] flex flex-col font-['Inter'] relative selection:bg-cyan-500/40 selection:text-white overflow-x-hidden">
    
    <!-- Navbar: visible only on public customer-facing tabs -->
    <Navbar
      v-if="activeTab !== 'admin'"
      :active-tab="activeTab"
      @open-quote="openQuote"
      @navigate="navigateTo"
    />

    <!-- Main Content: conditional tab rendering (4 public tabs + 1 admin panel) -->
    <main class="flex-grow">

      <!-- TAB 1: Início (home) — Landing page completa de alta conversão -->
      <template v-if="activeTab === 'home'">
        <HeroSection @open-quote="openQuote" @navigate="navigateTo" />
        <HomeHighlights @open-quote="openQuote" @navigate="navigateTo" />
      </template>

      <!-- TAB 2: Soluções (solucoes) — Exclusiva do portfólio multidisciplinar -->
      <template v-else-if="activeTab === 'solucoes'">
        <div class="pt-16 sm:pt-20 bg-[#172033]">
          <SolutionsSection @open-quote="openQuote" @navigate="navigateTo" />
        </div>
      </template>

      <!-- TAB 3: Catálogo (catalogo) — Vitrine com busca e filtros interativos -->
      <template v-else-if="activeTab === 'catalogo'">
        <div class="pt-16 sm:pt-20 bg-[#111726]">
          <CatalogSection :initial-category="catalogInitialCategory" />
        </div>
      </template>

      <!-- TAB 4: Como Funciona (como-funciona) — Passo a passo e garantias -->
      <template v-else-if="activeTab === 'como-funciona'">
        <div class="pt-16 sm:pt-20 bg-[#131A2B]">
          <HowItWorksSection @open-quote="openQuote" />
        </div>
      </template>

      <!-- TAB 5: Painel Administrativo Restrito (admin) -->
      <template v-else-if="activeTab === 'admin'">
        <AdminPanel @navigate="navigateTo" />
      </template>

    </main>

    <!-- Footer with tab navigation (visible on public tabs) -->
    <FooterSection v-if="activeTab !== 'admin'" @navigate="navigateTo" />

    <!-- Interactive Quick Quote Builder Modal -->
    <QuoteModal :is-open="isQuoteModalOpen" @close="closeQuote" />

    <!-- Floating WhatsApp Action Button (visible on public tabs) -->
    <a 
      v-if="activeTab !== 'admin'"
      :href="WHATSAPP_FLOAT_URL" 
      target="_blank" 
      rel="noopener noreferrer"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2 p-3 sm:p-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 hover:scale-105 active:scale-95 transition-all duration-300"
      title="Falar no WhatsApp com a NexForma.3D"
      aria-label="Falar no WhatsApp com a NexForma.3D"
    >
      <MessageSquare class="w-5 h-5 fill-current" />
      <span class="hidden md:inline-block pr-1 font-['Space_Grotesk'] text-sm font-extrabold tracking-wide">
        WhatsApp Orçamentos
      </span>
    </a>

  </div>
</template>
