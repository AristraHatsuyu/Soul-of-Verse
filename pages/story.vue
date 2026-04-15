<template>
  <div class="relative w-screen h-screen overflow-hidden bg-black text-white font-serif">
    <audio src="static/music/intro.mp3" autoplay loop hidden />
    <!-- 背景图 -->
    <img
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
      src="/static/image/storybg.jpg"
      alt="背景图"
    />

    <!-- 遮罩 -->
    <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

    <!-- 文本内容 -->
    <div class="relative z-20 flex flex-col justify-center items-center h-full px-6 text-center space-y-6">
      <!-- 标题 -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: -50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1 } }"
        class="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg"
      >
        灵韵境 · 序章
      </h1>

      <!-- 打字机效果 -->
      <p class="max-w-3xl text-lg md:text-xl leading-relaxed text-gray-200 whitespace-pre-line font-medium transition-all duration-500">
        <FlipWords :words="storyText"></FlipWords>
      </p>

      <!-- 按钮 -->
      <button
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 4 } }"
        class="mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-2xl shadow-xl transition duration-300"
        @click="navigateTo('/home')"
      >
        进入灵韵境
      </button>
    </div>
  </div>
</template>

<script setup>

const storyText = ref(`在浩瀚宇宙的裂隙间，存在一个由诗魂之力凝聚的平行世界——「灵韵境」。这里由历代文人墨客的才情所化，山川河流皆以诗为骨，日月星辰皆以词为魄。然而随着现代文明对传统文化的遗忘，"遗忘之瘴"正逐渐侵蚀诗境，唯有唤醒沉睡的诗魂、重燃创作之火，方能拯救这个濒临崩塌的文学秘境。\n
墨色浸染天际的刹那，你坠入了「灵韵境」——这片由千年诗魂铸就的秘境正被遗忘吞噬。李白的银河碎成残句，苏轼的竹杖锈满乱码，黑蛟般的瘴气啃食着《诗经》的根系。你腕间震颤的「玲珑砚」揭开宿命：作为被文脉选中的守韵人，须以诗词为刃，在AI构筑的盛唐残月、魏晋烽烟中重燃文明之火。`)

</script>