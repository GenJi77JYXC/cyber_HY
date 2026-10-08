<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const taglines = [
  'Go 后端开发者',
  '高并发分布式系统',
  'AI 工程实践者',
  'Game & Coding',
]

const displayed = ref('')
const taglineIndex = ref(0)
const charIndex = ref(0)
const deleting = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function type() {
  const current = taglines[taglineIndex.value]

  if (!deleting.value) {
    displayed.value = current.slice(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === current.length) {
      deleting.value = true
      timer = setTimeout(type, 1800)
      return
    }
    timer = setTimeout(type, 100)
  } else {
    displayed.value = current.slice(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      deleting.value = false
      taglineIndex.value = (taglineIndex.value + 1) % taglines.length
    }
    timer = setTimeout(type, 50)
  }
}

onMounted(() => {
  type()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const socials = [
  { name: '邮箱', icon: '📧', url: 'mailto:genji77@qq.com' },
  { name: 'CSDN', icon: '📝', url: 'https://blog.csdn.net/GenJi_JYXC' },
  { name: 'GitHub', icon: '💻', url: 'https://github.com/GenJi77JYXC?tab=repositories' },
]
</script>

<template>
  <section class="hero">
    <div class="hero-inner glass-card">
      <img src="/avatar.jpg" alt="头像" class="avatar" />

      <h1 class="name gradient-text">GenJi77JYXC</h1>

      <p class="tagline">
        {{ displayed }}<span class="cursor">|</span>
      </p>

      <div class="socials">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          :title="s.name"
        >
          <span class="social-icon">{{ s.icon }}</span>
          <span class="social-name">{{ s.name }}</span>
        </a>
      </div>

      <div class="qr-block">
        <img src="/qrcode.jpg" alt="公众号二维码" class="qr" loading="lazy" />
        <p class="qr-text">扫码关注我的公众号</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  padding: 48px 24px 24px;
}

.hero-inner {
  width: 100%;
  max-width: 680px;
  padding: 40px 32px;
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.avatar {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
  box-shadow: 0 0 24px rgba(99, 102, 241, 0.3);
  margin-bottom: 20px;
}

.name {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.tagline {
  font-size: 18px;
  color: var(--text-secondary);
  min-height: 28px;
  margin: 0 0 28px;
}

.cursor {
  color: var(--accent);
  font-weight: 300;
  margin-left: 2px;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 999px;
  font-size: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.social-icon {
  font-size: 16px;
}

.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.qr-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 600px) {
  .hero-inner {
    padding: 28px 20px;
  }
  .name {
    font-size: 26px;
  }
  .tagline {
    font-size: 16px;
  }
}
</style>
