<template>
    <div class="mode-page">
        <audio src="static/music/rule2.mp3" autoplay loop hidden />
      <img class="bg-image" src="/static/image/moonbg.jpg" />
      <div class="overlay" />
  
      <div class="layout">
        <!-- 左侧规则内容 -->
        <div class="intro">
          <div class="intro-box">
            <h2 class="intro-title">规则</h2>
            <div class="intro-text">
              <p>1. AI随机生成一个 <strong>诗词主题</strong>（如「孤舟听雨」「边塞烽烟」），玩家需在5分钟内创作一首符合主题的 <strong>四句诗</strong>（可自由选择绝句、律诗或词牌）。</p>
              <p>2. AI评分维度：</p>
              <ul>
                <li>押韵格律（30%）：平仄、对仗、词牌格式</li>
                <li>意境契合（40%）：主题关联度、意象创新性</li>
                <li>情感共鸣（30%）：AI情感模型分析诗句感染力</li>
              </ul>
              <p>3. 积分机制：</p>
              <ul>
                <li>90-100分：+30分（诗魂觉醒）</li>
                <li>70-89分：+20分（文气贯通）</li>
                <li>50-69分：+10分（诗心初成）</li>
                <li>低于50分：+5分（瘴气干扰）</li>
              </ul>
            </div>
            <button class="continue-btn" @click="navigateTo('/game2')">开始游戏</button>
          </div>
        </div>
  
        <!-- 右侧竖向标题 -->
        <div class="title-box">
          <div class="vertical-title">吟霜赋月</div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .mode-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    font-family: 'Noto Serif SC', serif;
  }
  
  .bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    filter: brightness(0.7);
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  .layout {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 5vw;
  }
  
  .intro {
    width: 60%;
  }
  
  .intro-box {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    max-width: 700px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
  
  .intro-title {
    font-size: 2rem;
    color: #fffac7;
    margin-bottom: 1rem;
    border-bottom: 2px solid #fff3b0;
    padding-bottom: 0.5rem;
  }
  
  .intro-text {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #ffffffdd;
    margin-bottom: 30px;
  }
  .intro-text ul {
    margin-left: 1rem;
    padding-left: 1rem;
    list-style: disc;
  }
  
  .continue-btn {
    padding: 14px 32px;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 12px;
    background: linear-gradient(to right, #ffe478, #ffd34d);
    color: #2d1d00;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .continue-btn:hover {
    transform: scale(1.05);
  }
  
  .title-box {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 3.2rem;
    font-weight: bold;
    color: #fff5c0;
    text-shadow: 0 0 10px #000;
  }
  </style>
  