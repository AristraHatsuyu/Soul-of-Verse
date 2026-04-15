<template>
    <div class="play-page">
        <audio src="static/music/game.mp3" autoplay loop hidden />
      <!-- 背景图 -->
      <img class="bg-image" src="/static/image/poembg.jpg" />
      <div class="overlay" />
  
      <!-- 倒计时前 3 秒：准备动画 -->
      <transition name="fade">
        <div v-if="countdown > 0 && !started" class="countdown-overlay">
          <transition-group name="scale-fade" tag="div">
            <span :key="countdown" class="countdown-text">{{ countdown }}</span>
          </transition-group>
        </div>
      </transition>
  
      <!-- 顶部状态栏 -->
      <div v-if="started && !gameOver" class="top-bar">
        <div>当前积分：<strong>{{ score }}</strong></div>
        <div>正确：<strong>{{ correct }}</strong> / 错误：<strong>{{ wrong }}</strong></div>
        <div>剩余时间：<strong>{{ timeLeft }}</strong>s</div>
        <div>对局次数：<strong>{{ matchCount }}</strong></div>
      </div>
  
      <!-- 主答题区 -->
      <div class="content" v-if="started && !gameOver">
        <transition name="scale-fade">
          <div v-if="visible" key="card" class="card-box" :class="{ 'show-blur': visible }">
            <h2 class="question-title">「{{ current.question }}」</h2>
            <div class="options">
              <button
                v-for="(opt, index) in shuffledOptions"
                :key="index"
                class="option-btn"
                :class="{
                  correct: showResult && opt.correct,
                  wrong: showResult && opt.clicked && !opt.correct,
                  selected: opt.clicked || (showResult && opt.correct)
                }"
                @click="selectOption(opt)"
                :disabled="showResult"
              >
                {{ opt.text }}
              </button>
            </div>
          </div>
        </transition>
      </div>
  
      <!-- 结算页 -->
      <transition name="fade">
        <div v-if="gameOver" class="result-screen">
          <div :class="['result-box', { lifted: showButtons }]">
            <h2 class="result-title">答题结束</h2>
            <p class="result-info">总积分：{{ score }}</p>
            <p class="result-info">正确题数：{{ correct }}</p>
            <p class="result-info">错误题数：{{ wrong }}</p>
            <p class="result-info">对局次数：{{ matchCount }}</p>
          </div>
          <transition name="fade">
            <div v-if="showButtons" class="result-buttons">
              <button class="main-btn" @click="restartGame">继续</button>
              <button class="main-btn" @click="navigateTo('/home')" :disabled="!canGoBack">返回</button>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
import questions from '@/assets/questions.json'
import { ref, computed, watch, onMounted } from 'vue'
import { useCookie } from '#app'

// cookie 绑定
const scoreCookie = useCookie('poem_score', { default: () => 0 })
const score = ref(scoreCookie.value)
const matchCountCookie = useCookie('poem_match_count', { default: () => 0 })
const matchCount = ref(matchCountCookie.value)

// 自动同步到 Cookie
watch(score, val => scoreCookie.value = val)
watch(matchCount, val => matchCountCookie.value = val)

const fullQuestionPool = ref([...questions])
const allQuestions = ref([])
const currentIndex = ref(0)
const correct = ref(0)
const wrong = ref(0)

const countdown = ref(3)
const started = ref(false)
const timeLeft = ref(30)
const gameOver = ref(false)
const showButtons = ref(false)
const canGoBack = ref(false)

const showResult = ref(false)
const visible = ref(true)

const current = computed(() => allQuestions.value[currentIndex.value])
const shuffledOptions = ref([])

const drawQuestions = (count = 10) => {
  const pool = [...fullQuestionPool.value]
  const result = []
  for (let i = 0; i < count && pool.length > 0; i++) {
    const index = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(index, 1)[0])
  }
  allQuestions.value = result
  currentIndex.value = 0
}

const prepareQuestion = () => {
  const q = current.value
  const opts = ['A', 'B', 'C', 'D'].map(k => ({
    text: q[k],
    correct: k === 'A',
    clicked: false
  }))
  shuffledOptions.value = opts.sort(() => Math.random() - 0.5)
  showResult.value = false
}

onMounted(() => {
  const cd = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(cd)
      drawQuestions()
      startGame()
    }
  }, 1000)
})

const startGame = () => {
  started.value = true
  prepareQuestion()
  const timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      matchCount.value++
      gameOver.value = true
      setTimeout(() => {
        showButtons.value = true
        setTimeout(() => {
          canGoBack.value = true
        }, 3000)
      }, 2000)
    }
  }, 1000)
}

const selectOption = (opt) => {
  opt.clicked = true
  showResult.value = true
  if (opt.correct) {
    score.value += 10
    correct.value += 1
  } else {
    score.value -= 3
    wrong.value += 1
  }
  setTimeout(() => {
    visible.value = false
    setTimeout(() => {
      currentIndex.value++
      if (currentIndex.value < allQuestions.value.length) {
        prepareQuestion()
        visible.value = true
      } else {
        matchCount.value++
        gameOver.value = true
        setTimeout(() => {
          showButtons.value = true
          setTimeout(() => {
            canGoBack.value = true
          }, 3000)
        }, 2000)
      }
    }, 400)
  }, 600)
}

const restartGame = () => {
  gameOver.value = false
  showButtons.value = false
  canGoBack.value = false
  timeLeft.value = 30
  visible.value = true
  drawQuestions()
  started.value = true
  prepareQuestion()
  const timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      matchCount.value++
      gameOver.value = true
      setTimeout(() => {
        showButtons.value = true
        setTimeout(() => {
          canGoBack.value = true
        }, 3000)
      }, 2000)
    }
  }, 1000)
}

watch(currentIndex, () => {
  if (current.value) prepareQuestion()
}, { immediate: true })
</script>
  
  
  <style scoped>
  .play-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    overflow: hidden;
  }
  
  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.75);
    z-index: 0;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1;
  }
  
  .top-bar {
    position: absolute;
    top: 50px;
    left: 50px;
    right: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    z-index: 5;
    color: #fffadf;
    text-shadow: 0 0 8px #000;
  }
  
  .content {
    position: relative;
    z-index: 5;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10vw;
  }
  
  .card-box {
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 700px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(12px);
    transition: all 0.5s ease;
  }
  
  .question-title {
    font-size: 2.8rem;
    margin-bottom: 2.5rem;
    color: #ffe9ad;
    text-shadow: 0 0 10px #000;
    text-align: center;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
  
  .option-btn {
    background: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    border: 4px solid transparent;
    font-size: 1.6rem;
    padding: 18px 24px;
    border-radius: 16px;
    color: #fff;
    box-sizing: border-box;
    transition: all 0.25s ease;
    cursor: pointer;
    backdrop-filter: blur(4px);
  }
  
  .option-btn:hover {
    transform: scale(1.03);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  }
  
  .option-btn.correct.selected {
    background: rgba(0, 255, 128, 0.2);
    border-color: #00ff99;
    box-shadow: 0 0 14px rgba(0, 255, 128, 0.3);
    border-width: 4px;
  }
  
  .option-btn.wrong.selected {
    background: rgba(255, 50, 50, 0.2);
    border-color: #ff5555;
    box-shadow: 0 0 14px rgba(255, 50, 50, 0.3);
    border-width: 4px;
  }
  
  .countdown-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .countdown-text {
    font-size: 6rem;
    font-weight: bold;
    color: #fff8c9;
    text-shadow: 0 0 15px #ffda79;
  }
  
  .scale-fade-enter-active, .scale-fade-leave-active {
    transition: all 1s ease;
  }
  .scale-fade-enter-from, .scale-fade-leave-to {
    opacity: 0;
    transform: scale(2);
  }
  .scale-fade-enter-to, .scale-fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  
  .result-screen {
    position: absolute;
    inset: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .result-box {
    text-align: center;
    transition: all 0.6s ease;
    position: absolute;
  }
  .result-box.lifted {
    transform: translateY(-80px);
  }
  
  .result-title {
    font-size: 3rem;
    color: #ffd976;
    margin-bottom: 20px;
  }
  .result-info {
    font-size: 1.5rem;
    color: #fffadf;
    margin: 10px 0;
  }
  
  .result-buttons {
    margin-top: 320px;
    display: flex;
    gap: 50px;
  }
  
  .main-btn {
    font-size: 1.4rem;
    padding: 14px 70px;
    border-radius: 12px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(to right, #ffe27a, #ffc400);
    color: #4a3900;
    box-shadow: 0 0 8px rgba(255, 228, 134, 0.4);
    transition: 0.3s;
  }
  .main-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 0 14px rgba(255, 220, 100, 0.8);
  }
  .main-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .fade-slide-enter-active,
  .fade-slide-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .scale-fade-enter-active,
  .scale-fade-leave-active {
    transition: all 0.4s ease;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to,
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-slide-enter-to,
  .fade-slide-leave-from,
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .scale-fade-enter-from,
  .scale-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  .scale-fade-enter-to,
  .scale-fade-leave-from{
    opacity: 1;
    transform: scale(1);
  }
  </style>
  