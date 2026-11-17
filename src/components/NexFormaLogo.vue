<script setup>
defineProps({
  size: {
    type: String,
    default: 'normal' // 'small', 'normal', 'large'
  },
  showTagline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex items-center gap-3 select-none group cursor-pointer">
    <!-- Isometric Layered Cube SVG Icon -->
    <div 
      class="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
      :class="size === 'large' ? 'w-12 h-12' : size === 'small' ? 'w-8 h-8' : 'w-10 h-10'"
    >
      <svg 
        class="w-full h-full drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]"
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Layer 3: Base Layer -->
        <path 
          d="M24 38 L38 30 L38 33.5 L24 41.5 L10 33.5 L10 30 Z" 
          fill="#111620" 
          stroke="#00E5FF" 
          stroke-width="1.6" 
          stroke-linejoin="round"
          class="transition-all duration-300 group-hover:opacity-100"
          opacity="0.8"
        />

        <!-- Layer 2: Mid Layer -->
        <path 
          d="M24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 L10 21 Z" 
          fill="#151C28" 
          stroke="#00E5FF" 
          stroke-width="1.6" 
          stroke-linejoin="round"
          class="transition-all duration-300"
          opacity="0.9"
        />

        <!-- Layer 1: Top Isometric Cap -->
        <!-- Top Face -->
        <path 
          d="M24 8 L38 16 L24 24 L10 16 Z" 
          fill="#1A2434" 
          stroke="#00E5FF" 
          stroke-width="1.8" 
          stroke-linejoin="round"
        />
        <!-- Left Face -->
        <path 
          d="M10 16 L24 24 L24 27.5 L10 19.5 Z" 
          fill="#131A26" 
          stroke="#00E5FF" 
          stroke-width="1.8" 
          stroke-linejoin="round"
        />
        <!-- Right Face -->
        <path 
          d="M24 24 L38 16 L38 19.5 L24 27.5 Z" 
          fill="#0D121B" 
          stroke="#00E5FF" 
          stroke-width="1.8" 
          stroke-linejoin="round"
        />

        <!-- Center Laser Focus Point -->
        <circle cx="24" cy="16" r="2" fill="#00E5FF" class="animate-pulse" />
      </svg>
    </div>

    <!-- Text Portion -->
    <div class="flex flex-col">
      <div class="flex items-baseline tracking-wider font-extrabold text-[#F3F4F6] font-['Space_Grotesk'] leading-none">
        <span :class="size === 'large' ? 'text-2xl' : size === 'small' ? 'text-lg' : 'text-xl'">
          NEXFORMA
        </span>
        <span 
          class="text-[#00E5FF] font-black drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]"
          :class="size === 'large' ? 'text-2xl' : size === 'small' ? 'text-lg' : 'text-xl'"
        >
          .3D
        </span>
      </div>
      <span 
        v-if="showTagline" 
        class="text-[10px] tracking-widest uppercase text-[#9CA3AF] font-['JetBrains_Mono'] mt-1"
      >
        Fabricação Digital
      </span>
    </div>
  </div>
</template>
