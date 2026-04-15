<template>
    <div class="final-page" :style="{ backgroundImage: `url(/static/image/${bgImage}.jpg)` }">
      <audio :src="`/static/music/${musicFile}.mp3`" autoplay loop hidden />
      <div class="overlay" />
  
      <transition name="fade-slide">
        <div class="content-box">
          <h1 class="title">{{ title }}</h1>
          <p class="description" v-html="description" />
          <button class="back-btn" @click="goHome">返回首页</button>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useCookie } from '#app'
  import { computed } from 'vue'
  
  const router = useRouter()
  const scoreCookie = useCookie('poem_score', { default: () => 0 })
  const score = scoreCookie.value
  
  const goHome = () => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
    router.push('/')
  }
  
  const level = computed(() => {
    if (score >= 120) return 'master'
    if (score >= 90) return 'torch'
    if (score >= 60) return 'guest'
    return 'lost'
  })
  
  const title = computed(() => {
    return {
      master: '诗魂主宰',
      torch: '文脉传灯',
      guest: '红尘诗客',
      lost: '残卷拾遗',
    }[level.value]
  })
  
  const description = computed(() => {
    return {
      master: `灵韵境的文脉彻底复苏，天地间诗意盎然，万千诗魂再现辉煌。你的诗作化作「九霄诗碑」，巍然屹立于苍穹，与李白、杜甫等诗坛巨匠并列，成为后人敬仰的传奇。<br>每逢月夜，诗碑流光溢彩，吟诵着千古绝句，照亮文道。<br>神州文运昌盛，诗境繁花似锦，而你已超脱凡尘，化身诗魂，镇守灵韵境，任后世才俊瞻仰，传承千年诗韵。`,
      torch: `你的努力驱散了七成瘴气，灵韵境的诗境重现昔日生机。<br>你的原创诗作被编入「灵韵境」教材，成为后代学子吟诵学习的范本，薪火相传。<br>书院大儒为你授予「文脉传灯」之称，寓意你如灯塔般引领文道复兴。每年春秋两季，书院举办盛大的诗会，吟诵你的佳作。<br>虽未能彻底修复诗魂，但你的诗篇已然成为诗境长明的灯火，启迪后人。`,
      guest: `诗境在你的努力下局部复苏，部分诗魂得以安息，然瘴气仍存。<br>你虽未能彻底拯救灵韵境，但凭借出众才华，被书院延聘为客卿，教授现代诗词技法。<br>你行走于红尘之间，以诗会友，传承古韵。<br>每当夜幕降临，书院内灯火微明，学子围坐聆听你的诗句，沉醉于千年文韵之中。<br>而你，终究是个过客，孤身于风雨飘摇的诗途之上，书写自己的诗章。`,
      lost: `你未能成功驱散瘴气，诗境的残破难以挽回，最终被吸入「断章渊」，成为永世修补诗魂的苦役。<br>周围是破碎的诗篇、残缺的字句，它们低吟着曾经的辉煌，却无法重现昔日风采。<br>你每日拾起散落的词句，试图拼凑完整的诗篇，但时间在这里失去了意义，诗魂的哭泣回荡在无尽深渊。<br>黑暗中，你看到昔日诗人留下的残卷，唯有继续书写，方能寻求解脱。`
    }[level.value]
  })
  
  const bgImage = computed(() => {
    return {
      master: 'guest_ending',
      torch: 'torch_ending',
      guest: 'master_ending',
      lost: 'lost_ending'
    }[level.value]
  })
  
  const musicFile = computed(() => bgImage.value)
  </script>
  
  <style scoped>
  .final-page {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    font-family: 'Noto Serif SC', serif;
    overflow: hidden;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(6px);
    z-index: 1;
  }
  .content-box {
    position: relative;
    z-index: 2;
    max-width: 960px;
    margin: 8vh auto;
    padding: 4rem;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(14px);
    border-radius: 20px;
    color: #fffef0;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
    animation: fadeInUp 1s ease;
  }
  .title {
    font-size: 3.2rem;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: 6px;
    color: #ffe28a;
    text-shadow: 0 0 14px #000;
  }
  .description {
    font-size: 1.2rem;
    line-height: 2;
    color: #fffc;
    text-align: justify;
  }
  .back-btn {
    margin-top: 2rem;
    padding: 14px 48px;
    font-size: 1.1rem;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid #fff;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .back-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .fade-slide-enter-active {
    transition: all 0.8s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(40px);
  }
  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  </style>