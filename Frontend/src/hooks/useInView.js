import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.unobserve(entry.target)
        } else if (options.once === false) {
          setInView(false)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options.once, options.rootMargin, options.threshold])

  return [ref, inView]
}
