import { useLayoutEffect } from 'react'
import { gsap, setupGsap } from '../animations/gsap'

export function useGsapReveal(ref, options = {}) {
  useLayoutEffect(() => {
    const el = ref?.current
    if (!el) return
    setupGsap()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(el, { autoAlpha: 1, y: 0, x: 0, scale: 1, clearProps: 'transform,filter' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: options.y ?? 28, filter: 'blur(6px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 85%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [ref, options.delay, options.duration, options.ease, options.start, options.y])
}
