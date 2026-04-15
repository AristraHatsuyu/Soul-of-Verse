<template>
    <div class="mode-page">
        <audio src="static/music/moonverse.mp3" autoplay loop hidden />
      <img class="bg-image" src="/static/image/moonbg.jpg" />
      <div class="overlay" />
  
      <div class="layout">
        <!-- 左侧介绍内容 -->
        <div class="intro">
          <div class="intro-box">
            <p class="intro-text">
              「残卷泽」深处，瘴气将诗境腐蚀成一片苍白沼泽，每处涟漪皆是被遗忘的未竟之诗。你手持「临境笔」踏入其中，AI幻化的「万象诗匣」轰然开启——这是诗魂试炼的终极战场：玩家需以原创诗词为刃，劈开混沌，重织文脉。
            </p>
            <button class="continue-btn" @click="navigateTo('/rule2')">继续</button>
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
    width: 80%;
  }
  
  .intro-box {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    max-width: 700px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
  
  .intro-text {
    font-size: 1.6rem;
    line-height: 2.2rem;
    color: #ffffffdd;
    margin-bottom: 30px;
  }
  
  .continue-btn {
    padding: 14px 32px;
    font-size: 1.6rem;
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
    font-size: 4rem;
    font-weight: bold;
    color: #fff5c0;
    text-shadow: 0 0 10px #000;
  }
  </style>