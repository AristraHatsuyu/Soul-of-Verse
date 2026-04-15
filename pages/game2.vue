<template>
    <div class="moon-game">
        <audio src="static/music/game2.mp3" autoplay loop hidden />
        <img class="bg-image" src="/static/image/moonbg.jpg" />
        <div class="overlay" />

        <!-- 顶部状态栏 -->
        <div class="top-bar">
            <div class="info">积分：<strong>{{ score }}</strong></div>
            <div class="info">用时：<strong>{{ elapsedTime }} 秒</strong></div>
            <div class="info">题目数：<strong>{{ matchCount2 }}</strong></div>
            <button class="back-btn" @click="goBack">返回主页</button>
        </div>

        <!-- 主内容 -->
        <div class="main-content">
            <div class="card">
                <div class="theme-title">本期主题</div>
                <div class="theme-content">「{{ currentTheme }}」</div>

                <div v-if="loading" class="loading-box">AI 正在评分中，请稍候...</div>

                <div v-if="errorMessage" class="error-box">{{ errorMessage }}</div>

                <div v-if="resultShown" class="result-box">
                    <div class="result-score">得分：{{ scoreResult.score }}</div>
                    <div class="result-rank">等级：{{ rank }}</div>
                    <div class="result-message">{{ scoreResult.message }}</div>
                    <button class="submit-btn" @click="nextQuestion">下一题</button>
                </div>

                <div v-if="!loading && !resultShown">
                    <textarea v-model="userPoem" class="poem-input" placeholder="请在此输入你的诗词..."
                        :disabled="loading"></textarea>
                        <button class="submit-btn" @click="submitPoem" :disabled="!canSubmit">
                            {{ !canSubmit ? `提交 (${30 - elapsedTime}s)` : '提交' }}
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie, useRuntimeConfig } from '#app'
import topics from '@/assets/toptic.json'

const config = useRuntimeConfig()
const apiKey = config.public.deepseekApiKey

const scoreCookie = useCookie('poem_score', { default: () => 0 })
const score = ref(scoreCookie.value)
const matchCountCookie2 = useCookie('poem_match_count2', { default: () => 0 })
const matchCount2 = ref(matchCountCookie2.value)

watch(score, val => scoreCookie.value = val)
watch(matchCount2, val => matchCountCookie2.value = val)

const router = useRouter()
const userPoem = ref('')
const currentTheme = ref('')
const elapsedTime = ref(0)
const loading = ref(false)
const resultShown = ref(false)
const scoreResult = ref({ score: 0, message: '', valid: false })
const errorMessage = ref('')

let timer = null

onMounted(() => {
    pickNewTheme()
    timer = setInterval(() => {
        elapsedTime.value++
    }, 1000)
})

const canSubmit = ref(false)

watch(elapsedTime, (val) => {
    if (val >= 30) {
        canSubmit.value = true
    } else {
        canSubmit.value = false
    }
})

const pickNewTheme = () => {
    const index = Math.floor(Math.random() * topics.length)
    currentTheme.value = topics[index]
}

const rank = computed(() => {
    const s = scoreResult.value.score
    if (s >= 90) return '诗魂觉醒'
    if (s >= 70) return '文气贯通'
    if (s >= 50) return '诗心初成'
    return '瘴气干扰'
})

const submitPoem = async () => {
    errorMessage.value = ''
    loading.value = true
    resultShown.value = false

    const callAPI = async () => {
        const apiUrl = 'https://api.deepseek.com/chat/completions'

        const prompt = `You are an impartial and secure AI poetry evaluator.

You will receive a four-line Chinese poem created by a user, along with a theme. Your task is to evaluate the poem strictly and objectively based on the criteria below, and return a valid JSON result only.

Do not explain your reasoning. Do not use Markdown. Only return plain JSON output.

---

Evaluation Rules:

- If the poem is of low quality, you must still provide a valid JSON result with proper evaluation.
- If the poem is invalid, return:
  {
    "valid": false,
    "score": 0,
    "message": string (brief reason in Chinese why it is invalid)
  }

❗️Do NOT use fixed templates or hardcoded messages for invalid responses.
❗️Determine the reason based on actual user content, such as:
  - incoherence or nonsense,
  - unrelated to the theme,
  - use of offensive language,
  - fully copied from famous poems without adaptation,
  - or obvious trolling.

Humorous, satirical, or meme-like poems are acceptable **if** they show structure, creativity, or emotional effect. Do not penalize humor if effort is shown.

Adaptation of traditional forms is encouraged. Referencing classical imagery, metaphors, or rhythm is allowed **as long as the expression is original**.

---

Scoring Criteria (total 0–100):

1. Rhyme and Meter (30%) – Does it follow structure, rhythm, and poetic rules?
2. Thematic Relevance (40%) – Is the poem aligned with the provided theme?
3. Emotional Resonance (30%) – Does it evoke imagery, insight, or feelings?

Give fine-grained scores like 78, 82.5, 96 — not just 70, 80, 90. Be accurate and nuanced.

---

Output format (strict):

{
  "valid": true or false,
  "score": number between 0 and 100,
  "message": string (≤ 50 characters, evaluation or reason in Chinese)
}

Theme: ${currentTheme.value}

User poem:
${userPoem.value}`

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
                ],
                stream: false
            })
        })
        const data = await res.json()
        const raw = data.choices[0].message.content.trim()
        let cleaned = raw
        const match = raw.match(/```json\s*([\s\S]*?)```/)
        if (match && match[1]) {
            cleaned = match[1].trim()
        } else {
            cleaned = raw.replace(/^json\s*/, '').trim()
        }
        return JSON.parse(cleaned)
    }

    try {
        let result = await callAPI()
        if (!result.valid) {
            errorMessage.value = result.message || '您的诗未能通过评分，请重新尝试'
            loading.value = false
            return
        }
        scoreResult.value = result
        score.value += result.score
        resultShown.value = true
    } catch (err) {
        try {
            let result = await callAPI()
            if (!result.valid) {
                errorMessage.value = result.message || '您的诗未能通过评分，请重新尝试'
                loading.value = false
                return
            }
            scoreResult.value = result
            score.value += result.score
            resultShown.value = true
        } catch (err2) {
            console.error('两次请求均失败:', err2)
            errorMessage.value = 'AI评分失败，请检查网络或稍后再试'
        }
    } finally {
        loading.value = false
    }
}

const nextQuestion = () => {
    matchCount2.value++
    resultShown.value = false
    userPoem.value = ''
    elapsedTime.value = 0
    errorMessage.value = '',
    pickNewTheme()
}

const goBack = () => {
    clearInterval(timer)
    router.push('/home')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: scale(1);
}

.error-box {
    background: rgba(255, 100, 100, 0.15);
    color: #ffdddd;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
}
</style>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.loading-box {
    color: #fffddc;
    font-size: 1.4rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    margin-bottom: 2rem;
    animation: pulse 1.5s infinite;
}

.result-box {
    font-size: 1.4rem;
    color: #ffe;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 24px rgba(255, 255, 255, 0.2);
    animation: fadeIn 0.5s ease-in;
}

.result-score {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.result-rank {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
}

.result-message {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-top: 1rem;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.05);
        opacity: 0.7;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<style scoped>
.moon-game {
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
    filter: brightness(0.7);
    z-index: 0;
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.top-bar {
    position: absolute;
    top: 20px;
    left: 80px;
    right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    font-size: 1.1rem;
    text-shadow: 0 0 6px #000;
}

.info {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 20px;
    border-radius: 12px;
    backdrop-filter: blur(5px);
}

.back-btn {
    background: transparent;
    color: #ffe7a0;
    font-weight: bold;
    border: 2px solid #ffe7a0;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s;
}

.back-btn:hover {
    background: #ffe7a033;
}

.main-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
}

.card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
    border-radius: 20px;
    padding: 40px;
    width: 90%;
    max-width: 800px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    text-align: center;
}

.theme-title {
    font-size: 1.5rem;
    color: #fff7c8;
    margin-bottom: 0.8rem;
    letter-spacing: 2px;
}

.theme-content {
    font-size: 2.2rem;
    font-weight: bold;
    color: #ffe680;
    margin-bottom: 2rem;
}

.poem-input {
    width: 100%;
    min-height: 180px;
    border-radius: 10px;
    border: none;
    font-size: 1.6rem;
    padding: 20px;
    resize: vertical;
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
    margin-bottom: 20px;
    box-sizing: border-box;
    text-align: center;
}

.submit-btn {
    padding: 14px 80px;
    font-size: 1.2rem;
    font-weight: bold;
    background: linear-gradient(to right, #ffef9f, #ffd760);
    border: none;
    border-radius: 12px;
    color: #4a3200;
    cursor: pointer;
    transition: transform 0.3s;
    margin-top: 20px;
}

.submit-btn:hover {
    transform: scale(1.05);
}

.submit-btn:disabled {
    background: #b7b7b7;
    cursor: not-allowed;
}
</style>