'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface HoverSplitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: string
  rel?: string
  staggerDelay?: number
  duration?: number
  ease?: string
  onClick?: () => void
}

export default function HoverSplitText({
  text,
  className = '',
  style = {},
  href,
  target,
  rel,
  staggerDelay = 0.018,
  duration = 0.40,
  ease = 'power2.inOut',
  onClick,
}: HoverSplitTextProps) {
  const wrapRef = useRef<HTMLElement>(null)
  const topRef  = useRef<HTMLDivElement>(null)
  const botRef  = useRef<HTMLDivElement>(null)
  const chars   = text.split('')

  useGSAP(() => {
    if (!wrapRef.current || !topRef.current || !botRef.current) return
    const topSpans = topRef.current.querySelectorAll('span')
    const botSpans = botRef.current.querySelectorAll('span')
    const tl = gsap.timeline({ paused: true })
    tl.to(topSpans, { y: '-100%', duration, ease, stagger: staggerDelay }, 0)
    tl.to(botSpans, { y: '0%',    duration, ease, stagger: staggerDelay }, 0)
    const el = wrapRef.current
    const onEnter = () => tl.play()
    const onLeave = () => tl.reverse()
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, { scope: wrapRef })

  const charSpan = (char: string, i: number, prefix: string, extraStyle?: React.CSSProperties) => (
    <span key={`${prefix}-${i}`} style={{
      display: 'inline-block',
      willChange: 'transform',
      whiteSpace: char === ' ' ? 'pre' : 'normal',
      ...extraStyle,
    }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  )

  const Tag: any = href ? 'a' : 'span'

  return (
    <Tag
      ref={wrapRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
        cursor: href || onClick ? 'pointer' : 'default',
        textDecoration: 'none',
        ...style,
      }}
    >
      <div ref={topRef} style={{ display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
        {chars.map((c, i) => charSpan(c, i, 'top'))}
      </div>
      <div ref={botRef} style={{ display:'flex', flexWrap:'nowrap', whiteSpace: 'nowrap', position:'absolute', top:0, left:0 }}>
        {chars.map((c, i) => charSpan(c, i, 'bot', { transform: 'translateY(100%)' }))}
      </div>
    </Tag>
  )
}
