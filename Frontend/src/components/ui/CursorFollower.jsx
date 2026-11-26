import { useEffect, useRef } from 'react'
import { gsap, setupGsap } from '../../animations/gsap'

const CursorFollower = () => {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    setupGsap()
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const moveOuterX = gsap.quickTo(outer, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveOuterY = gsap.quickTo(outer, 'y', { duration: 0.55, ease: 'power3.out' })
    const moveInnerX = gsap.quickTo(inner, 'x', { duration: 0.18, ease: 'power3.out' })
    const moveInnerY = gsap.quickTo(inner, 'y', { duration: 0.18, ease: 'power3.out' })

    let visible = false
    const show = () => {
      if (visible) return
      visible = true
      gsap.to([outer, inner], { autoAlpha: 1, duration: 0.25, overwrite: 'auto' })
    }

    const onMove = (e) => {
      show()
      moveOuterX(e.clientX)
      moveOuterY(e.clientY)
      moveInnerX(e.clientX)
      moveInnerY(e.clientY)
    }

    const onLeave = () => {
      visible = false
      gsap.to([outer, inner], { autoAlpha: 0, duration: 0.25, overwrite: 'auto' })
    }

    const onOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      if (target) {
        gsap.to(outer, { scale: 1.8, opacity: 0.35, duration: 0.3, ease: 'power2.out' })
        gsap.to(inner, { scale: 0.6, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      if (target) {
        gsap.to(outer, { scale: 1, opacity: 0.22, duration: 0.3, ease: 'power2.out' })
        gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onDown = () => gsap.to(outer, { scale: 1.35, duration: 0.15, ease: 'power2.out' })
    const onUp = () => gsap.to(outer, { scale: 1, duration: 0.2, ease: 'power2.out' })

    gsap.set([outer, inner], { xPercent: -50, yPercent: -50, autoAlpha: 0 })
    gsap.set(outer, { opacity: 0.22 })

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block" aria-hidden="true">
      <div
        ref={outerRef}
        className="absolute left-0 top-0 h-20 w-20 rounded-full border border-white/20 bg-accent/15 blur-xl"
        style={{ willChange: 'transform, opacity' }}
      />
      <div
        ref={innerRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,45,45,0.9)]"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

export default CursorFollower
