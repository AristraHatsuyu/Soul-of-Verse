<template>
    <div class="poemlink-page">
        <audio src="static/music/poem.mp3" autoplay loop hidden />
      <!-- 背景图 -->
      <img class="bg-image" src="/static/image/poembg.jpg" alt="背景图" />
  
      <!-- 遮罩层 -->
      <div class="overlay" />
  
      <!-- 内容布局 -->
      <div class="content-wrapper">
        <!-- 左侧玩法介绍 -->
        <div class="left-panel">
          <h2 class="subtitle">玩法介绍</h2>
          <p class="description">
            瘴气最浓处，破碎的诗魂凝结成一座「断章渊」。渊底盘踞着以遗忘为食的「噬句虬龙」，<br/>
            它每吞噬一句诗，龙鳞便多一道错乱的平仄。<br/><br/>
            欲斩此孽，唯有用「飞龙衔诗阵」——这是灵韵境失传的秘术：<br/>
            玩家需踏着悬浮的诗碑跃入龙腹，与历代文人残魂接力吟诵。
          </p>

            <button class="start-btn" @click="navigateTo('rule')">继续</button>
        </div>
  
        <!-- 右侧竖排标题 -->
        <div class="right-title">
          <div class="vertical-title">
            <span v-for="(char, i) in titleChars" :key="i" class="title-char">
              {{ char }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const titleChars = ['锦', '绣', '诗', '链']
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&display=swap');
  
  .poemlink-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
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
  
  .content-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
    padding: 60px 80px;
    justify-content: space-between;
    align-items: center;
  }
  
  /* 左侧内容 */
  .left-panel {
    width: 70%;
    max-width: 800px;
  }
  
  .subtitle {
    font-size: 2.6rem;
    margin-bottom: 1.6rem;
    color: #ffe8b3;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }
  
  .description {
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: #f5f5f5;
    white-space: pre-line;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
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
  
  /* 右侧竖排标题 */
  .right-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
  }
  
  .vertical-title {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 4.8rem;
    color: #ffe7a1;
    text-shadow: 0 0 12px #000;
    animation: float 4s ease-in-out infinite;
  }
  
  .title-char {
    margin: 0.4rem;
    transition: transform 0.3s, color 0.3s;
  }
  .title-char:hover {
    transform: scale(1.25);
    color: #ffd78a;
  }
  
  /* 小动效 */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  </style>