<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)

const skillGroups = [
  {
    title: '编程语言',
    icon: '💻',
    skills: ['Go（并发/反射/内存模型）', 'Python', 'TypeScript', 'Vue 3'],
  },
  {
    title: '核心框架',
    icon: '⚙️',
    skills: ['Gin', 'GORM', 'go-zero', 'RESTful API'],
  },
  {
    title: '存储与中间件',
    icon: '🗄️',
    skills: ['MySQL（索引/事务调优）', 'Redis（缓存/分布式锁）', 'NSQ（消息队列）', 'ClickHouse'],
  },
  {
    title: '系统与工具',
    icon: '☁️',
    skills: ['Linux', 'Docker', 'Git（Gerrit）', 'Nginx', 'Mermaid'],
  },
  {
    title: 'AI 工程实践',
    icon: '🤖',
    skills: ['Claude Code', 'MCP', 'AI Agent', 'Prompt 工程'],
  },
  {
    title: '架构能力',
    icon: '🏗️',
    skills: ['分层架构', '策略模式', '模板方法', '工作流引擎', '性能优化'],
  },
]
</script>

<template>
  <section class="skills" ref="root">
    <div class="skills-inner glass-card reveal">
      <h2 class="section-title gradient-text">技能栈</h2>

      <div class="groups">
        <div v-for="(group, i) in skillGroups" :key="group.title" class="skill-group reveal-left" :style="{ transitionDelay: `${i * 80}ms` }">
          <div class="group-header">
            <span class="group-icon">{{ group.icon }}</span>
            <span class="group-title">{{ group.title }}</span>
          </div>
          <div class="skill-tags">
            <span v-for="skill in group.skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.skills-inner {
  width: 100%;
  max-width: 680px;
  padding: 36px 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--accent);
}

.groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-group {
  padding: 16px;
  background: var(--tag-bg);
  border-radius: 12px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.group-icon {
  font-size: 18px;
}

.group-title {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 4px 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13px;
  transition: transform 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 600px) {
  .skills-inner {
    padding: 28px 20px;
  }
}
</style>
