<template>
    <div class="bg-b">
        <div class="start-page">
            <img class="start-logo" :style="{ opacity: hidlogo }" src="@/public/static/image/Aristra.svg" />
            <div class="bottom-text" :style="{ opacity: hidtext }">
                <div>抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当，适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。</div>
                <div>Copyright &copy; 2025 Aristra. All Rights Reserved.&nbsp;&nbsp;北京师大二附中2026届10班 版权所有</div>
            </div>
        </div>
        <div class="start-page middle-text">
            <div style="font-size: 30px; line-height: 30px; margin-bottom: 30px; transition: .8s;" :style="{ opacity: hidtexta }">警告: 游戏前详阅</div>
            <div style="transition: .8s;" :style="{ opacity: hidtextb }">有极少数的人在观看一些视觉影像时可能会突然癫痫发作，这些影像包括电子游戏中出现的闪光</div>
            <div style="transition: .8s;" :style="{ opacity: hidtextb }">或图形。在进行电子游戏时，这些人可能会出现癫痫症状。甚至连不具有癫痫史的人，也可能在</div>
            <div style="transition: .8s;" :style="{ opacity: hidtextb }">进行电子游戏时，出现类似癫痫症状。如果您或您的家人有癫痫史，请在进行游戏之前先和医生</div>
            <div style="transition: .8s;" :style="{ opacity: hidtextb }">咨询。如果您在游玩电子游戏时出现以下症状，包括眼睛疼痛、视觉异常、偏头痛、痉挛或意识</div>
            <div style="transition: .8s;" :style="{ opacity: hidtextb }">障碍(诸如昏迷)等，请立即中止游戏，并且请您于再次进行本游戏之前咨询您的医生。</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const hidlogo = ref(1);
const hidtext = ref(0);
const hidtexta = ref(0);
const hidtextb = ref(0);
setTimeout(() => {
    hidtext.value = 1
}, 2800);
setTimeout(() => {
    hidlogo.value = 0
    setTimeout(() => {
        hidtext.value = 0
    }, 300);
}, 4200);
setTimeout(() => {
    hidtexta.value = 1
    setTimeout(() => {
        hidtextb.value = 1
    }, 300);
}, 5500);
setTimeout(() => {
    hidtexta.value = 0
    hidtextb.value = 0
}, 7800);
</script>

<style>
.bg-b {
    background-color: #111;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.start-logo {
    height: 10vh;
    transition: .8s;
}

.start-logom {
    height: 50vh;
    transition: .8s;
}

.bottom-text {
    position: fixed;
    bottom: 15px;
    color: #ddd;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    transition: .8s;
}

.middle-text {
    color: #ddd;
    font-size: 20px;
    line-height: 26px;
    transition: .8s;
}

.hidden {
    opacity: 0;
}
</style>