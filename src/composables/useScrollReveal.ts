import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * 滚动触发动画：监听 root 下所有带 reveal 类的元素，进入视口时添加 is-visible
 */
export function useScrollReveal(root: Ref<HTMLElement | null>, threshold = 0.12) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const els = root.value?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    els?.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
