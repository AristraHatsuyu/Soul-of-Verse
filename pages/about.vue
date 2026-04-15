<template>
    <div class="about-page">
      <img class="bg-image" src="/static/image/about.jpg" alt="关于背景" />
      <audio src="/static/music/about.mp3" autoplay loop hidden />
  
      <div class="credit-box">
        <h2 class="credit-title">项目制作组</h2>
        <ul class="credit-list">
          <li>剧情编撰：R. Wang</li>
          <li>技术开发：Aristra</li>
          <li>艺术设计：Z. Wang</li>
        </ul>
      </div>
  
      <button class="back-btn" @click="goBack">返回主页</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goBack = () => {
    router.push('/home')
  }
  </script>
  
  <style scoped>
  .about-page {
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
    z-index: 0;
    filter: brightness(0.7);
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    z-index: 1;
  }
  
  .credit-box {
    position: absolute;
    bottom: 40px;
    left: 40px;
    background: rgba(255, 255, 255, 0.07);
    padding: 30px 40px;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.3);
    z-index: 2;
    animation: fadeInUp 1.2s ease;
  }
  
  .credit-title {
    font-size: 1.8rem;
    color: #ffe9aa;
    margin-bottom: 16px;
    letter-spacing: 2px;
    text-shadow: 0 0 8px #000;
  }
  
  .credit-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    line-height: 2.2;
    color: #fffce0;
    text-shadow: 0 0 4px #000;
  }
  
  .back-btn {
    position: absolute;
    top: 30px;
    left: 30px;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.15);
    color: #fffdd0;
    border: 2px solid #fff5c0;
    border-radius: 12px;
    backdrop-filter: blur(6px);
    cursor: pointer;
    z-index: 3;
    transition: all 0.3s ease;
  }
  
  .back-btn:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  