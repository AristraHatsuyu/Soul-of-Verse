<template>
    <div class="end-screen">
        <audio src="static/music/rule3.mp3" autoplay loop hidden />
      <img class="bg-image" src="/static/image/rulej.jpg" />
      <div class="overlay" />
  
      <div class="container">
        <!-- 左侧内容 -->
        <div class="left-panel">
          <div class="section">
            <h2 class="section-title">风华诗榜</h2>
            <div class="result-intro">
              两轮诗词创作已完成，灵韵境将根据你的原创诗评进行最终评定。
            </div>
          </div>
  
          <div class="section rule">
            <h3 class="section-subtitle">等级判定规则</h3>
            <div class="round-count">
              对局统计：<strong>锦绣诗链 {{ matchCount1 }} 局</strong> / <strong>吟霜赋月 {{ matchCount2 }} 局</strong>
            </div>
            <ul class="rule-list">
              <li><strong>120-130分：</strong>诗魂主宰 —— 灵韵境文脉完全修复，诗作化作九霄诗碑。</li>
              <li><strong>90-119分：</strong>文脉传灯 —— 诗境瘴气消退七成，诗作被收录为教材。</li>
              <li><strong>60-89分：</strong>红尘诗客 —— 成为书院客卿，传授现代诗词技法。</li>
              <li><strong>低于60分：</strong>残卷拾遗 —— 被吸入断章渊，修补诗魂。</li>
            </ul>
          </div>
  
          <button class="back-btn" @click="goFinal">揭晓最终评定</button>
        </div>
  
        <!-- 右侧标题 -->
        <div class="right-title">
          <div class="vertical-title">
            <div>风</div>
            <div>华</div>
            <div>诗</div>
            <div>榜</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useCookie } from '#app'
  
  const router = useRouter()
  const goFinal = () => {
    router.push('/final')
  }
  
  const matchCount1 = useCookie('poem_match_count', { default: () => 0 })
  const matchCount2 = useCookie('poem_match_count2', { default: () => 0 })
  </script>
  
  <style scoped>
  .end-screen {
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
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 4vh 5vw;
    box-sizing: border-box;
  }
  .left-panel {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  .right-title {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffeaaa;
    font-size: 3.8rem;
    font-weight: bold;
    line-height: 1.4;
    letter-spacing: 0.2rem;
    text-shadow: 0 0 12px #000;
  }
  .vertical-title div {
    line-height: 1.6;
  }
  .section-title {
    font-size: 2.4rem;
    font-weight: bold;
    color: #fff3d7;
    margin-bottom: 1rem;
  }
  .result-intro {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #fffc;
  }
  .section-subtitle {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: #ffd;
  }
  .round-count {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    color: #fffbdc;
  }
  .rule-list {
    list-style: none;
    padding: 0;
    line-height: 1.8;
    color: #eee;
    font-size: 0.95rem;
  }
  .back-btn {
    margin-top: auto;
    padding: 12px 36px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    color: #fff9dc;
    border: 2px solid #fff9dc;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .back-btn:hover {
    background: #fff9dc11;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  </style>