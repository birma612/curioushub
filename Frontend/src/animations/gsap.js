import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function setupGsap() {
  if (registered || typeof window === 'undefined') return gsap
  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  registered = true
  return gsap
}

export { gsap, ScrollTrigger }
