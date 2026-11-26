import { useRef } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'

const Reveal = ({ children, className = '', delay = 0, y = 28 }) => {
  const ref = useRef(null)
  useGsapReveal(ref, { delay: delay / 1000, y })

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}

export default Reveal
