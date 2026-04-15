<template>
    <client-only>
        <transition name="fade">
            <div v-if="started">
                <NuxtPage class="pages" />
            </div>
            <StartPage v-else />
        </transition>
        <transition name="fade">
            <div class="start-page" v-if="!canReveal">
                <img class="start-logom" src="@/public/static/image/logo.png" />
            </div>
        </transition>
        <div class="bottomleft-text" :style="{ opacity: hidversion }">CNFLYARISWEB1.0.0_D250319_A1032</div>
    </client-only>
</template>

<script setup lang="ts">
const started = ref(false)
const hidversion = ref(0)
const hidmlogo = ref(true)

const route = useRoute()

const canReveal = computed(() => route.path !== '/' ? true : hidmlogo.value)

onMounted(() => {
  if (route.path !== '/') {
    // 如果不是根目录，直接显示主页面
    started.value = true
    hidmlogo.value = true
    hidversion.value = 0
  } else {
    // 是根目录，正常播放动画
    setTimeout(() => {
      started.value = true
    }, 11000)
    setTimeout(() => {
      hidmlogo.value = false
    }, 8800)
    setTimeout(() => {
      hidversion.value = 1
    }, 9500)
  }
})
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    background-color: #000000;
}

.info-card {
    background: #ffffff;
    box-shadow: 0 11px 34px 0 rgb(0 0 0 / 5%);
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 10px 0 10px;
    margin: 20px 0 0 20px;
}

.start-page {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

.bottomleft-text {
    position: fixed;
    bottom: 5px;
    left: 30px;
    z-index: 9999999999999;
    color: #ffffffbc;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    transition: .8s;
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s; /* 控制动画时间和效果 */
}
.fade-enter-from, .fade-leave-to {
    opacity: 0; /* 初始和结束的透明度 */
}
.fade-enter-to, .fade-leave-from {
    opacity: 1; /* 中间状态的透明度 */
}

/* Global utilities - replacing Tailwind CSS */

/* Layout utilities */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.top-0 { top: 0; }
.left-0 { left: 0; }

/* Size utilities */
.w-screen { width: 100vw; }
.h-screen { height: 100vh; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.max-w-3xl { max-width: 48rem; }
.max-w-\[40rem\] { max-width: 40rem; }
.h-40 { height: 10rem; }
.w-\[8px\] { width: 8px; }

/* Overflow and appearance */
.overflow-hidden { overflow: hidden; }
.object-cover { object-fit: cover; }

/* Display and flex */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }

/* Spacing */
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.mt-8 { margin-top: 2rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }

/* Text properties */
.text-center { text-align: center; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.font-serif { font-family: serif; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.leading-relaxed { line-height: 1.625; }
.whitespace-pre-line { white-space: pre-line; }

/* Colors */
.bg-black { background-color: #000; }
.bg-yellow-500 { background-color: #eab308; }
.hover\:bg-yellow-600:hover { background-color: #ca8a04; }
.text-white { color: #fff; }
.text-black { color: #000; }
.text-yellow-300 { color: #fcd34d; }
.text-gray-200 { color: #e5e7eb; }
.border-white\/\[0\.08\] { border-color: rgba(255, 255, 255, 0.08); }

/* Background opacity */
.bg-opacity-50 { opacity: 0.5; }

/* Border and radius */
.border { border-width: 1px; border-style: solid; border-color: currentColor; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-2xl { border-radius: 1rem; }

/* Shadows */
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.drop-shadow-lg { filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)); }

/* Z-index */
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-50 { z-index: 50; }

/* Transitions */
.transition { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.duration-300 { transition-duration: 300ms; }
.duration-500 { transition-duration: 500ms; }
.will-change-transform { will-change: transform; }

/* Custom background colors for TextRevealCard */
.bg-\[\#1d1c20\] { background-color: #1d1c20; }

/* Special effects */
.bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
.from-transparent { --tw-gradient-stops: transparent; }
.via-neutral-800 { --tw-gradient-stops: #262626; }
.to-transparent { --tw-gradient-stops: transparent; }

/* Mask image */
.bg-gradient-to-b.from-transparent.via-neutral-800.to-transparent {
    background-image: linear-gradient(to bottom, transparent 0%, #262626 50%, transparent 100%);
}

/* Responsive utilities */
@media (min-width: 640px) {
    .sm\:p-6 { padding: 1.5rem; }
}

@media (min-width: 768px) {
    .md\:p-8 { padding: 2rem; }
    .md\:text-5xl { font-size: 3rem; line-height: 1; }
    .md\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
}
</style>
