<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)

interface Project {
  name: string
  status: '已上线' | '进行中' | '已暂停'
  description: string
  highlights: string[]
  stack: string[]
  links: { label: string; url: string }[]
}

const projects: Project[] = [
  {
    name: 'TinyURL 短链服务',
    status: '已上线',
    description:
      '基于数据库自增 ID 转 62 进制的短链服务，支持高并发跳转、缓存降级与全链路监控。',
    highlights: [
      '自增 ID 转 62 进制生成短码，可支撑约 568 亿条短链',
      'Redis Cache-aside 缓存 + 空值负缓存防穿透，Redis 故障自动降级查 DB',
      '按 IP 令牌桶限流（10 QPS），防止恶意刷量',
      'Prometheus + Grafana 监控（P99 延迟、缓存命中率、穿透率）',
      'Docker 多阶段构建，Nginx 反代 HTTPS，容器非 root 运行',
    ],
    stack: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'Prometheus', 'Grafana'],
    links: [
      { label: '在线体验', url: 'https://tinyurl.mahiro.cloud/' },
      { label: '旧版（带用户系统）', url: 'https://tinyurl.mahiro.cloud/legacy/' },
      { label: 'GitHub', url: 'https://github.com/GenJi77JYXC/tinyURL' },
    ],
  },
  {
    name: 'RA2 风格 RTS 游戏',
    status: '已暂停',
    description:
      '红警风格即时战略游戏，Go 权威服务端 + Unity 客户端，支持多人联机对战与 AI 对手。',
    highlights: [
      '权威服务端架构：所有游戏逻辑在 Go 服务端，Unity 只负责渲染与输入',
      'A* 寻路 + 单位避让系统（按格占地、预约移动、分级堵路处理）',
      '多人联机（WebSocket）+ AI 对手，AI 走与人类相同的指令管线，不作弊',
      '完整 RTS 机制：建造系统、采矿经济（矿脉/采矿车）、战斗、胜负判定',
      'ASCII 地图定义，支持 40×40 双地图与大厅选图，旋转对称保证公平',
    ],
    stack: ['Go', 'Unity (C#)', 'WebSocket', 'A* 寻路'],
    links: [
      { label: 'GitHub', url: 'https://github.com/GenJi77JYXC/ra2-go-unity' },
    ],
  },
  {
    name: 'LLM 推理网关',
    status: '进行中',
    description:
      'OpenAI 兼容协议的 LLM 推理网关，支持多上游负载均衡、熔断降级、Token 计量与语义缓存。',
    highlights: [
      '核心转发链路：SSE 流式透传、API Key 鉴权',
      '多上游健康检查 + 负载均衡 + 熔断降级',
      'Token 计量与成本管控、语义缓存（Redis 向量检索）',
      'K8s 部署 + 压测报告',
    ],
    stack: ['Go', 'Redis', 'Kubernetes', 'Docker'],
    links: [],
  },
]
</script>

<template>
  <section class="projects" ref="root">
    <div class="projects-inner">
      <h2 class="section-title gradient-text">项目展示</h2>

      <div class="project-list">
        <article
          v-for="(project, i) in projects"
          :key="project.name"
          class="project-card glass-card reveal-scale"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <header class="project-header">
            <h3 class="project-name">{{ project.name }}</h3>
            <span
              class="status-tag"
              :class="{
                online: project.status === '已上线',
                progress: project.status === '进行中',
                paused: project.status === '已暂停',
              }"
            >
              {{ project.status }}
            </span>
          </header>

          <p class="project-desc">{{ project.description }}</p>

          <ul class="highlights">
            <li v-for="h in project.highlights" :key="h">{{ h }}</li>
          </ul>

          <div class="stack-tags">
            <span v-for="s in project.stack" :key="s" class="stack-tag">{{ s }}</span>
          </div>

          <div v-if="project.links.length" class="links">
            <a
              v-for="link in project.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link-btn"
            >
              {{ link.label }} →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.projects-inner {
  width: 100%;
  max-width: 680px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--accent);
  padding: 0 4px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-card {
  padding: 28px 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(99, 102, 241, 0.15);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.project-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.status-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 600;
}
.status-tag.online {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}
.status-tag.progress {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}
.status-tag.paused {
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
}

.project-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px;
  line-height: 1.7;
}

.highlights {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.highlights li {
  font-size: 13.5px;
  color: var(--text-primary);
  padding-left: 18px;
  position: relative;
  line-height: 1.6;
}

.highlights li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.stack-tag {
  padding: 3px 10px;
  font-size: 12px;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 6px;
}

.links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: transform 0.15s ease, background 0.15s ease;
}
.link-btn:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .project-card {
    padding: 22px 18px;
  }
}
</style>
