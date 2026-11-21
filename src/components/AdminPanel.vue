<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useProducts } from '../composables/useProducts'
import { 
  Lock, 
  Mail, 
  Key, 
  LogOut, 
  ArrowLeft, 
  Plus, 
  Sparkles, 
  Star, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Package, 
  AlertCircle, 
  Search, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Boxes,
  UploadCloud,
  Image as ImageIcon,
  Ruler,
  Weight,
  Loader2
} from 'lucide-vue-next'

const emit = defineEmits(['navigate'])

const { 
  products, 
  loading, 
  isLoadedFromDb, 
  updateStock, 
  toggleFeatured, 
  updatePrice, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  fetchProducts
} = useProducts()

// Auth State
const session = ref(null)
const email = ref('')
const password = ref('')
const authLoading = ref(false)
const authError = ref('')

// Check Supabase session on mount
onMounted(async () => {
  fetchProducts()
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.auth.getSession()
      session.value = data?.session || null

      supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
      })
    } catch (e) {
      console.warn('Erro ao verificar sessão Supabase:', e)
    }
  }
})

const isAuthenticated = computed(() => {
  return Boolean(session.value)
})

const handleLogin = async () => {
  authError.value = ''

  if (!isSupabaseConfigured || !supabase) {
    authError.value = 'Chaves do Supabase não configuradas no arquivo .env.local.'
    return
  }

  if (!email.value || !password.value) {
    authError.value = 'Preencha o e-mail e a senha.'
    return
  }

  authLoading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
    })

    if (error) {
      authError.value = error.message === 'Invalid login credentials' 
        ? 'E-mail ou senha inválidos.' 
        : error.message
    } else {
      session.value = data.session
      fetchProducts()
    }
  } catch (e) {
    authError.value = 'Erro ao conectar ao Supabase: ' + e.message
  } finally {
    authLoading.value = false
  }
}

const handleLogout = async () => {
  if (supabase && session.value) {
    await supabase.auth.signOut()
  }
  session.value = null
}

// Search inside admin
const adminSearch = ref('')
const filteredAdminProducts = computed(() => {
  const q = adminSearch.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(p => 
    p.name.toLowerCase().includes(q) || 
    (p.category || '').toLowerCase().includes(q) ||
    (p.materialHighlight || '').toLowerCase().includes(q)
  )
})

// Metrics
const totalStock = computed(() => products.value.reduce((acc, p) => acc + (p.stock || 0), 0))
const featuredCount = computed(() => products.value.filter(p => p.is_featured).length)
const outOfStockCount = computed(() => products.value.filter(p => p.stock === 0).length)

// Add / Edit Product Modal state
const isFormOpen = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const fileInputRef = ref(null)
const isDragging = ref(false)
const uploadingImages = ref(false)
const uploadError = ref('')

const form = ref({
  name: '',
  category: 'decoracao',
  short_description: '',
  description: '',
  height: '',
  weight: '',
  material: 'PLA Silk Premium',
  dimensions: '20 x 15 x 15 cm',
  price: 79,
  stock: 5,
  is_featured: false,
  images: [],
  image_url: ''
})

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  uploadError.value = ''
  form.value = {
    name: '',
    category: 'decoracao',
    short_description: '',
    description: '',
    height: '',
    weight: '',
    material: 'PLA Silk Premium',
    dimensions: '20 x 15 x 15 cm',
    price: 79,
    stock: 5,
    is_featured: false,
    images: [],
    image_url: ''
  }
  isFormOpen.value = true
}

const openEditModal = (product) => {
  isEditing.value = true
  editingId.value = product.id
  uploadError.value = ''
  
  const existingImages = Array.isArray(product.images) && product.images.length > 0
    ? [...product.images]
    : (product.image_url ? [product.image_url] : [])

  form.value = {
    name: product.name || '',
    category: product.category || 'decoracao',
    short_description: product.short_description || '',
    description: product.description || '',
    height: product.height || '',
    weight: product.weight || product.specs?.weight || '',
    material: product.materialHighlight || product.material || 'PLA Premium',
    dimensions: product.specs?.dimensions || 'Sob medida',
    price: product.price || 0,
    stock: product.stock || 0,
    is_featured: product.is_featured || false,
    images: existingImages,
    image_url: product.image_url || existingImages[0] || ''
  }
  isFormOpen.value = true
}

const triggerFileInput = () => {
  if (uploadingImages.value) return
  if (form.value.images.length >= 6) {
    alert('Limite máximo de 6 fotos por produto já atingido.')
    return
  }
  fileInputRef.value?.click()
}

const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

const processFiles = async (files) => {
  uploadError.value = ''
  const validFiles = files.filter(f => f.type.startsWith('image/'))
  if (validFiles.length === 0) return

  const remaining = 6 - form.value.images.length
  if (remaining <= 0) {
    uploadError.value = 'Limite máximo de 6 fotos por produto já atingido.'
    return
  }

  const filesToUpload = validFiles.slice(0, remaining)
  uploadingImages.value = true

  for (const file of filesToUpload) {
    if (file.size > 10 * 1024 * 1024) {
      uploadError.value = `O arquivo "${file.name}" excede 10MB.`
      continue
    }

    try {
      if (isSupabaseConfigured && supabase) {
        const fileExt = file.name.split('.').pop().toLowerCase()
        const randomStr = Math.random().toString(36).substring(2, 9)
        const fileName = `${Date.now()}-${randomStr}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadErr) {
          console.warn('[Supabase Storage] Fallback local para imagem:', uploadErr.message)
          uploadError.value = `Nota do Storage: ${uploadErr.message}. Carregada em modo local.`
          const localUrl = await readFileAsDataUrl(file)
          form.value.images.push(localUrl)
        } else {
          const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath)
          if (data?.publicUrl) {
            form.value.images.push(data.publicUrl)
          }
        }
      } else {
        const localUrl = await readFileAsDataUrl(file)
        form.value.images.push(localUrl)
      }
    } catch (err) {
      console.error('Erro no upload de foto:', err)
      uploadError.value = `Erro ao enviar ${file.name}: ${err.message}`
    }
  }

  // Ensure first image is the cover
  form.value.image_url = form.value.images[0] || ''
  uploadingImages.value = false
}

const handleFileSelect = async (e) => {
  const files = Array.from(e.target.files || [])
  await processFiles(files)
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const handleDrop = async (e) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  await processFiles(files)
}

const removeImage = (index) => {
  form.value.images.splice(index, 1)
  form.value.image_url = form.value.images[0] || ''
}

const setCoverImage = (index) => {
  if (index <= 0 || index >= form.value.images.length) return
  const img = form.value.images.splice(index, 1)[0]
  form.value.images.unshift(img)
  form.value.image_url = form.value.images[0] || ''
}

const handleSaveProduct = async () => {
  if (!form.value.name.trim()) return

  const coverImage = form.value.images[0] || form.value.image_url || ''
  const payload = {
    name: form.value.name.trim(),
    category: form.value.category,
    short_description: form.value.short_description?.trim() || '',
    description: form.value.description?.trim() || '',
    height: form.value.height?.trim() || '',
    weight: form.value.weight?.trim() || '',
    materialHighlight: form.value.material,
    material: form.value.material,
    dimensions: form.value.height ? `${form.value.height} (Altura)` : form.value.dimensions,
    price: parseFloat(form.value.price) || 0,
    stock: parseInt(form.value.stock) || 0,
    is_featured: form.value.is_featured,
    images: [...form.value.images],
    image_url: coverImage
  }

  if (isEditing.value && editingId.value) {
    await updateProduct(editingId.value, payload)
  } else {
    await addProduct(payload)
  }

  isFormOpen.value = false
}

const handleDelete = async (product) => {
  if (confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
    await deleteProduct(product.id)
  }
}

// Inline price edit
const editingPriceId = ref(null)
const tempPrice = ref(0)

const startEditPrice = (product) => {
  editingPriceId.value = product.id
  tempPrice.value = product.price || 0
}

const savePrice = async (id) => {
  await updatePrice(id, parseFloat(tempPrice.value) || 0)
  editingPriceId.value = null
}
</script>

<template>
  <div class="min-h-screen bg-[#111726] text-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8">
    
    <!-- 1. TELA DE LOGIN (quando não autenticado) -->
    <div v-if="!isAuthenticated" class="max-w-md mx-auto pt-10 sm:pt-16">
      
      <!-- Back button -->
      <button 
        type="button" 
        @click="emit('navigate', 'home')"
        class="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Voltar para o site</span>
      </button>

      <div class="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/50">
        
        <!-- Header -->
        <div class="text-center space-y-2 mb-8">
          <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mx-auto">
            <Lock class="w-6 h-6" />
          </div>
          <h2 class="text-2xl font-bold font-['Space_Grotesk'] text-white">
            Acesso Administrativo
          </h2>
          <p class="text-xs text-slate-400">
            Painel de controle interno da <strong>NexForma.3D</strong>
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-['JetBrains_Mono']">
              E-mail
            </label>
            <div class="relative">
              <Mail class="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                v-model="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                required
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-['JetBrains_Mono']">
              Senha
            </label>
            <div class="relative">
              <Key class="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                v-model="password"
                type="password"
                placeholder="••••••••"
                required
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <!-- Error Alert -->
          <div v-if="authError" class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle class="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{{ authError }}</span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authLoading"
            class="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span v-if="authLoading">Autenticando...</span>
            <span v-else>Entrar no Painel</span>
          </button>
        </form>

      </div>
    </div>

    <!-- 2. DASHBOARD ADMINISTRATIVO (quando autenticado) -->
    <div v-else class="max-w-7xl mx-auto space-y-8">
      
      <!-- Top Action Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md">
        
        <div class="flex items-center gap-3">
          <button 
            type="button" 
            @click="emit('navigate', 'home')"
            class="p-2 rounded-xl bg-slate-900/80 border border-slate-700/50 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Voltar ao site"
          >
            <ArrowLeft class="w-5 h-5" />
          </button>
          
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
                Painel Administrativo
              </h1>
              <span 
                class="px-2.5 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] border bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              >
                Supabase Conectado
              </span>
            </div>
            <p class="text-xs text-slate-400">
              Gerencie estoque em tempo real, preços, destaques e novos modelos.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            @click="openAddModal"
            class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-all"
          >
            <Plus class="w-4 h-4" />
            <span>Novo Produto</span>
          </button>

          <button
            type="button"
            @click="handleLogout"
            class="px-3.5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/50 hover:border-red-400/50 text-slate-300 hover:text-red-400 text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut class="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>

      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div class="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Cadastrados</span>
            <Package class="w-4 h-4 text-cyan-400" />
          </div>
          <p class="text-2xl font-bold font-['Space_Grotesk'] text-white">
            {{ products.length }}
          </p>
          <span class="text-[10px] text-slate-500">Modelos no catálogo</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span>Destaques da Semana</span>
            <Star class="w-4 h-4 text-amber-400 fill-current" />
          </div>
          <p class="text-2xl font-bold font-['Space_Grotesk'] text-amber-400">
            {{ featuredCount }}
          </p>
          <span class="text-[10px] text-slate-500">Exibidos na Home</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span>Estoque Físico Total</span>
            <Boxes class="w-4 h-4 text-emerald-400" />
          </div>
          <p class="text-2xl font-bold font-['Space_Grotesk'] text-emerald-400">
            {{ totalStock }} un.
          </p>
          <span class="text-[10px] text-slate-500">Prontos para envio</span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
          <div class="flex items-center justify-between text-slate-400 text-xs">
            <span>Sob Encomenda</span>
            <AlertCircle class="w-4 h-4 text-cyan-400" />
          </div>
          <p class="text-2xl font-bold font-['Space_Grotesk'] text-slate-300">
            {{ outOfStockCount }}
          </p>
          <span class="text-[10px] text-slate-500">Estoque zero (produção 48h)</span>
        </div>

      </div>

      <!-- Products Management Table / List -->
      <div class="rounded-3xl bg-slate-800/70 border border-slate-700/60 overflow-hidden shadow-xl">
        
        <!-- Table Header & Search -->
        <div class="p-5 sm:p-6 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold font-['Space_Grotesk'] text-white">
              Lista de Produtos & Estoque
            </h3>
            <p class="text-xs text-slate-400">
              Ajuste quantidades ou ative os Destaques com 1 clique.
            </p>
          </div>

          <div class="relative w-full sm:w-72">
            <Search class="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              v-model="adminSearch"
              type="text"
              placeholder="Buscar modelo..."
              class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/50 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <!-- Products List -->
        <div class="divide-y divide-slate-700/40 overflow-x-auto">
          <div 
            v-for="p in filteredAdminProducts" 
            :key="p.id"
            class="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-700/20 transition-colors"
          >
            <!-- Product Info -->
            <div class="flex items-center gap-3.5 flex-1 min-w-[240px]">
              <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shrink-0 overflow-hidden text-cyan-400">
                <img v-if="p.image_url" :src="p.image_url" :alt="p.name" class="w-full h-full object-cover" />
                <Package v-else class="w-6 h-6" />
              </div>

              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-bold text-sm sm:text-base text-white">
                    {{ p.name }}
                  </h4>
                  <span class="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-700/50">
                    {{ p.categoryLabel || p.category }}
                  </span>
                </div>
                <p class="text-xs text-slate-400 line-clamp-1 max-w-md">
                  {{ p.description }}
                </p>
              </div>
            </div>

            <!-- Quick Controls Cluster -->
            <div class="flex items-center gap-4 sm:gap-6 flex-wrap self-end md:self-auto">
              
              <!-- 1. Star / Featured Toggle -->
              <button
                type="button"
                @click="toggleFeatured(p.id)"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all active:scale-95"
                :class="p.is_featured 
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-900/60 border-slate-700/50 text-slate-500 hover:text-slate-300'"
                :title="p.is_featured ? 'Remover dos Destaques da Home' : 'Destacar na Página Inicial'"
              >
                <Star class="w-3.5 h-3.5" :class="{ 'fill-current': p.is_featured }" />
                <span class="hidden sm:inline">{{ p.is_featured ? 'Destaque' : 'Comum' }}</span>
              </button>

              <!-- 2. Stock Controls (- / +) -->
              <div class="flex items-center gap-2 bg-slate-900/80 border border-slate-700/50 rounded-xl p-1">
                <button
                  type="button"
                  @click="updateStock(p.id, -1)"
                  class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs cursor-pointer active:scale-95"
                  title="Diminuir estoque"
                >
                  -
                </button>
                
                <span class="text-xs font-bold font-['Space_Grotesk'] px-2 min-w-[50px] text-center" :class="p.stock > 0 ? 'text-emerald-400' : 'text-slate-500'">
                  {{ p.stock }} un.
                </span>

                <button
                  type="button"
                  @click="updateStock(p.id, 1)"
                  class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center justify-center font-bold text-xs cursor-pointer active:scale-95"
                  title="Aumentar estoque"
                >
                  +
                </button>
              </div>

              <!-- 3. Price Quick Edit -->
              <div class="min-w-[110px] text-right">
                <div v-if="editingPriceId === p.id" class="flex items-center gap-1">
                  <input 
                    v-model="tempPrice" 
                    type="number" 
                    step="0.5" 
                    class="w-16 px-1.5 py-1 text-xs bg-slate-900 rounded border border-cyan-400 text-white text-right"
                  />
                  <button @click="savePrice(p.id)" class="p-1 text-emerald-400 hover:text-emerald-300">
                    <Check class="w-3.5 h-3.5" />
                  </button>
                  <button @click="editingPriceId = null" class="p-1 text-slate-500 hover:text-slate-300">
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div v-else @click="startEditPrice(p)" class="cursor-pointer group flex items-center justify-end gap-1">
                  <span class="text-sm font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-400 transition-colors">
                    {{ p.priceValue }}
                  </span>
                  <Edit3 class="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                </div>
              </div>

              <!-- 4. Edit & Delete Action Buttons -->
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  @click="openEditModal(p)"
                  class="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-700/40 transition-colors cursor-pointer"
                  title="Editar dados completos"
                >
                  <Edit3 class="w-4 h-4" />
                </button>

                <button
                  type="button"
                  @click="handleDelete(p)"
                  class="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-700/40 transition-colors cursor-pointer"
                  title="Excluir produto"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- 3. MODAL DE CADASTRO / EDIÇÃO DE PRODUTO -->
    <div 
      v-if="isFormOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B0D10]/85 backdrop-blur-md overflow-y-auto"
    >
      <div class="relative w-full max-w-2xl rounded-3xl bg-slate-800 border border-slate-700/60 shadow-2xl p-5 sm:p-8 space-y-5 my-8 max-h-[92vh] overflow-y-auto">
        
        <div class="flex items-center justify-between border-b border-slate-700/50 pb-4 sticky top-0 bg-slate-800 z-10">
          <div>
            <h3 class="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-white">
              {{ isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto' }}
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              Preencha os dados e fotos do produto para a vitrine e catálogo.
            </p>
          </div>
          <button 
            type="button" 
            @click="isFormOpen = false"
            class="text-slate-400 hover:text-white cursor-pointer p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleSaveProduct" class="space-y-4">
          
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
              Nome do Modelo / Produto *
            </label>
            <input 
              v-model="form.name"
              type="text" 
              required
              placeholder="Ex: Luminária Voronoi LED"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                Categoria
              </label>
              <select 
                v-model="form.category"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="decoracao">Decoração & Design</option>
                <option value="presentes">Presentes & Colecionáveis</option>
                <option value="tecnicas">Peças Técnicas</option>
                <option value="setup">Setup & Utilidades</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                Preço (R$)
              </label>
              <input 
                v-model="form.price"
                type="number"
                step="0.5"
                placeholder="79.00"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                Estoque Inicial (un.)
              </label>
              <input 
                v-model="form.stock"
                type="number"
                min="0"
                placeholder="5"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                Material Recomendado
              </label>
              <input 
                v-model="form.material"
                type="text"
                placeholder="PLA Silk / PETG / Resina 8K"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <!-- Especificações Físicas (Altura e Peso) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-700/40">
            <div>
              <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                <Ruler class="w-3.5 h-3.5 text-cyan-400" />
                <span>Altura (cm)</span>
              </label>
              <input 
                v-model="form.height"
                type="text" 
                placeholder="Ex: 9,5 cm"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase mb-1 font-['JetBrains_Mono']">
                <Weight class="w-3.5 h-3.5 text-cyan-400" />
                <span>Peso (g)</span>
              </label>
              <input 
                v-model="form.weight"
                type="text" 
                placeholder="Ex: 135 g"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <!-- Descrição Breve -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-300 uppercase font-['JetBrains_Mono']">
                Descrição Breve (Card da Vitrine)
              </label>
              <span class="text-[10px] text-slate-500 font-['JetBrains_Mono']">1 a 2 linhas para os cards</span>
            </div>
            <textarea 
              v-model="form.short_description"
              rows="2"
              placeholder="Resumo curto exibido no card do catálogo..."
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
            ></textarea>
          </div>

          <!-- Descrição Completa -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-300 uppercase font-['JetBrains_Mono']">
                Descrição Completa do Produto
              </label>
              <span class="text-[10px] text-slate-500 font-['JetBrains_Mono']">Exibida ao abrir o modal de detalhes</span>
            </div>
            <textarea 
              v-model="form.description"
              rows="4"
              placeholder="Detalhes completos, benefícios, itens inclusos e especificações técnicas exibidas ao abrir o produto..."
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/50 text-sm text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <!-- Upload de até 6 Imagens (Supabase Storage) -->
          <div class="space-y-2.5 pt-1">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase font-['JetBrains_Mono']">
                <ImageIcon class="w-3.5 h-3.5 text-cyan-400" />
                <span>Fotos do Produto (Até 6 Imagens)</span>
              </label>
              <span 
                class="text-xs font-['JetBrains_Mono'] font-semibold px-2 py-0.5 rounded-full"
                :class="form.images.length === 6 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-900 text-cyan-400 border border-slate-700/50'"
              >
                {{ form.images.length }}/6 imagens
              </span>
            </div>

            <!-- Hidden input for file picker -->
            <input 
              ref="fileInputRef" 
              type="file" 
              accept="image/*" 
              multiple 
              class="hidden" 
              @change="handleFileSelect"
            />

            <!-- Drag & Drop Zone -->
            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
              class="p-5 sm:p-6 rounded-2xl border-2 border-dashed transition-all duration-200 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group select-none"
              :class="[
                isDragging 
                  ? 'border-cyan-400 bg-cyan-500/10' 
                  : form.images.length >= 6 
                    ? 'border-slate-700/40 bg-slate-900/30 opacity-60 cursor-not-allowed' 
                    : 'border-slate-700/60 bg-slate-900/50 hover:border-cyan-400/60 hover:bg-slate-900/80'
              ]"
            >
              <div v-if="uploadingImages" class="flex flex-col items-center gap-2 text-cyan-400">
                <Loader2 class="w-8 h-8 animate-spin" />
                <span class="text-xs font-medium">Enviando imagens para o Supabase Storage...</span>
              </div>
              <template v-else>
                <div class="w-11 h-11 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <UploadCloud class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-semibold text-white">
                    {{ form.images.length >= 6 ? 'Limite máximo de 6 fotos atingido' : 'Clique ou arraste as fotos aqui' }}
                  </p>
                  <p class="text-[11px] text-slate-400 mt-0.5">
                    Selecione direto das pastas do computador (PNG, JPG, WEBP - fotos 1:1 recomendadas)
                  </p>
                </div>
              </template>
            </div>

            <!-- Error message if any -->
            <div v-if="uploadError" class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle class="w-4 h-4 shrink-0" />
              <span>{{ uploadError }}</span>
            </div>

            <!-- Preview Grid of Uploaded Images -->
            <div v-if="form.images.length > 0" class="space-y-2 pt-1">
              <div class="text-[11px] text-slate-400 font-['JetBrains_Mono'] flex items-center justify-between">
                <span>Clique na estrela para definir a foto como Capa Principal (índice 0):</span>
              </div>

              <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                <div 
                  v-for="(imgUrl, idx) in form.images" 
                  :key="idx"
                  class="relative aspect-square rounded-xl overflow-hidden border-2 bg-slate-900 group"
                  :class="idx === 0 ? 'border-cyan-400 ring-2 ring-cyan-400/30' : 'border-slate-700/60 hover:border-slate-500'"
                >
                  <img 
                    :src="imgUrl" 
                    :alt="'Foto ' + (idx + 1)" 
                    class="w-full h-full object-cover"
                  />

                  <!-- Capa Badge -->
                  <div 
                    v-if="idx === 0"
                    class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] font-['Space_Grotesk'] flex items-center gap-0.5 shadow-md"
                  >
                    <Star class="w-2.5 h-2.5 fill-current" />
                    <span>CAPA</span>
                  </div>

                  <!-- Hover Action Overlay -->
                  <div class="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                    <div class="flex items-center justify-end">
                      <button 
                        type="button" 
                        @click.stop="removeImage(idx)"
                        class="p-1 rounded bg-red-500/80 hover:bg-red-500 text-white transition-colors cursor-pointer"
                        title="Remover foto"
                      >
                        <Trash2 class="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div v-if="idx > 0">
                      <button 
                        type="button" 
                        @click.stop="setCoverImage(idx)"
                        class="w-full py-1 px-1 rounded bg-slate-800 hover:bg-cyan-500 text-white hover:text-slate-950 font-bold text-[9px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="Definir como primeira imagem (capa)"
                      >
                        <Star class="w-2.5 h-2.5" />
                        <span>Tornar Capa</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="flex items-center gap-2 pt-2 border-t border-slate-700/40">
            <input 
              v-model="form.is_featured"
              id="is_featured"
              type="checkbox"
              class="w-4 h-4 rounded text-cyan-400 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <label for="is_featured" class="text-xs text-slate-300 cursor-pointer select-none">
              Exibir como <strong>Destaque da Semana</strong> na Página Inicial
            </label>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-700/50 sticky bottom-0 bg-slate-800 pb-1">
            <button
              type="button"
              @click="isFormOpen = false"
              class="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer border border-slate-700/50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="uploadingImages"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-2 transition-all"
            >
              <Check class="w-4 h-4" />
              <span>{{ isEditing ? 'Salvar Alterações' : 'Cadastrar Produto' }}</span>
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>
</template>
