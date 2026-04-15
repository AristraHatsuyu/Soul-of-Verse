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
</style>
