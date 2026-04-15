<template>
    <div class="rule-page">
        <audio src="static/music/rule.mp3" autoplay loop hidden />
      <!-- 背景 -->
      <img class="bg-image" src="/static/image/poembg.jpg" alt="背景图" />
      <div class="overlay" />
  
      <div class="content">
        <h1 class="title">规 则</h1>
  
        <div class="rules">
          <p class="rule-item">
            <strong>1.</strong> AI随机从诗词库中生成 <strong>10句古诗</strong>（仅出上句或下句），<br />
            玩家需在 <strong>30秒内</strong> 对出正确对应的下一句 / 上一句。
          </p>
          <p class="rule-item">
            <strong>2. 积分机制：</strong><br />
            答对1题：<strong>+10分</strong>（基础分）<br />
            连续答对3题：<strong>额外+5分</strong>（文脉共鸣奖励）<br />
            答错1题：<strong>-3分</strong>（触发「瘴气反噬」）
          </p>
        </div>
  
        <button class="start-btn" @click="navigateTo('game')">开始挑战</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const startGame = () => {
    router.push('/poemlink/play') // 替换为你的正式游戏页面
  }
  </script>
  
  <style scoped>
  .rule-page {
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
    backdrop-filter: blur(3px);
    z-index: 1;
  }
  
  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    padding: 80px 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 960px;
  }
  
  .title {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: #ffefb0;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    letter-spacing: 1rem;
  }
  
  .rules {
    font-size: 1.5rem;
    line-height: 2.6rem;
    color: #fdfdfd;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    white-space: pre-line;
  }
  
  .rule-item {
    margin-bottom: 2rem;
  }
  
  /* 开始按钮 */
  .start-btn {
    margin-top: 3rem;
    padding: 16px 48px;
    font-size: 1.6rem;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    background: linear-gradient(to right, #fceabb, #f8b500);
    color: #4b3000;
    box-shadow: 0 0 20px rgba(255, 220, 140, 0.6);
    transition: 0.3s;
    align-self: flex-start;
  }
  
  .start-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 28px rgba(255, 220, 140, 0.9);
  }
  </style>