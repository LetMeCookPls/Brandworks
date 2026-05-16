'use client'

import { CSSProperties } from 'react'
import { GLASS_CONFIG } from '@/lib/liquidGlassConfig'

interface GlassWrapperProps {
  children: React.ReactNode
  cornerRadius?: number
  padding?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
  overLight?: boolean
  variant?: 'navbar' | 'card' | 'button' | 'pill' | 'mobile' | 'stats' | 'project'
  mouseContainer?: React.RefObject<HTMLElement> | null
  blurAmount?: number
}

export default function GlassWrapper({
  children,
  cornerRadius = 16,
  padding,
  className = '',
  style = {},
  onClick,
  overLight = false,
  blurAmount,
}: GlassWrapperProps) {
  // Derive blur from blurAmount (0–1 scale → px) or fall back to GLASS_CONFIG default
  const resolvedBlur = blurAmount !== undefined ? blurAmount : GLASS_CONFIG.blurAmount
  const blurPx = resolvedBlur > 0 ? `blur(${resolvedBlur * 40}px)` : 'blur(0px)'

  const glassStyle: CSSProperties = {
    borderRadius: cornerRadius,
    padding,
    background: overLight
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(255,255,255,0.04)',
    backdropFilter: blurPx,
    WebkitBackdropFilter: blurPx,
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
    ...style,
  }

  return (
    <div
      className={`glass-wrapper ${className}`}
      style={glassStyle}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
