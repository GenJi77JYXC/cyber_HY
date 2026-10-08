<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'genji-theme'
const theme = ref<Theme>('dark')

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
  theme.value = t
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved)
    return
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
}

function toggleTheme() {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  localStorage.setItem(STORAGE_KEY, next)
}

watch(theme, (t) => {
  localStorage.setItem(STORAGE_KEY, t)
})

onMounted(initTheme)
</script>

<template>
  <div class="app">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <!-- 主题切换 -->
    <button class="theme-toggle" @click="toggleTheme" :title="theme === 'dark' ? '切换到浅色' : '切换到深色'">
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </button>

    <main class="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} GenJi77JYXC · Built with Vue 3 + Vite</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 背景渐变光斑 */
.bg-decoration {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}
.blob-1 {
  width: 400px;
  height: 400px;
  background: #6366f1;
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}
.blob-2 {
  width: 350px;
  height: 350px;
  background: #a855f7;
  bottom: -80px;
  left: -80px;
  animation: float 25s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

.main {
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  font-size: 18px;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--shadow);
}
.theme-toggle:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);
}

.footer {
  text-align: center;
  padding: 24px 20px 40px;
  color: var(--text-secondary);
  font-size: 13px;
}

.footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .theme-toggle {
    top: 14px;
    right: 14px;
    width: 40px;
    height: 40px;
  }
}
</style>
