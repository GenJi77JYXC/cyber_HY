<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)

const highlights = [
  { icon: '🎯', title: '方向', desc: 'Go 后端 / 分布式系统 / AI 工程' },
  { icon: '⚡', title: '擅长', desc: '高并发 / 缓存 / 消息队列' },
  { icon: '🤖', title: 'AI 实践', desc: 'Claude Code / MCP / AI Agent' },
  { icon: '🎮', title: '爱好', desc: 'Game & Coding' },
]
</script>

<template>
  <section class="about" ref="root">
    <div class="about-inner glass-card reveal">
      <h2 class="section-title gradient-text">关于我</h2>

      <p class="bio">
        你好，我是 GenJi，一名 Go 后端开发者。熟悉高并发分布式系统设计，
        擅长 Go 并发编程、GORM/MySQL 调优、Redis 缓存与分布式锁、NSQ 消息队列，
        以及基于策略模式、工作流引擎的业务架构设计。日常使用 Claude Code / MCP
        辅助代码阅读、测试生成与问题排查，也喜欢把想法变成可运行的产品。
      </p>

      <div class="highlights">
        <div v-for="h in highlights" :key="h.title" class="highlight-item reveal-scale">
          <span class="h-icon">{{ h.icon }}</span>
          <div class="h-content">
            <span class="h-title">{{ h.title }}</span>
            <span class="h-desc">{{ h.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.about-inner {
  width: 100%;
  max-width: 680px;
  padding: 36px 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--accent);
}

.bio {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-primary);
  margin: 0 0 28px;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  background: var(--tag-bg);
  border-radius: 12px;
}

.h-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.h-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.h-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.h-desc {
  font-size: 13px;
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .about-inner {
    padding: 28px 20px;
  }
}
</style>
