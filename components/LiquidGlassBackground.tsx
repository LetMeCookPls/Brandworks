'use client'

import React, { useId } from 'react'

// Each slab definition: left position (%), width (%), height (%), top offset (%)
const SLABS = [
  { left: 0,    w: 5.2,  h: 88,  top: 0   },
  { left: 4.8,  w: 4.8,  h: 100, top: 0   },
  { left: 9.2,  w: 5.0,  h: 82,  top: 4   },
  { left: 13.8, w: 4.6,  h: 95,  top: 0   },
  { left: 18.0, w: 5.2,  h: 78,  top: 6   },
  { left: 22.8, w: 4.8,  h: 100, top: 0   },
  { left: 27.2, w: 5.0,  h: 86,  top: 2   },
  { left: 31.8, w: 4.6,  h: 92,  top: 0   },
  { left: 36.0, w: 5.2,  h: 80,  top: 5   },
  { left: 40.8, w: 4.8,  h: 100, top: 0   },
  { left: 45.2, w: 5.0,  h: 84,  top: 3   },
  { left: 49.8, w: 4.6,  h: 96,  top: 0   },
  { left: 54.0, w: 5.2,  h: 76,  top: 7   },
  { left: 58.8, w: 4.8,  h: 100, top: 0   },
  { left: 63.2, w: 5.0,  h: 88,  top: 2   },
  { left: 67.8, w: 4.6,  h: 90,  top: 0   },
  { left: 72.0, w: 5.2,  h: 82,  top: 4   },
  { left: 76.8, w: 4.8,  h: 100, top: 0   },
  { left: 81.2, w: 5.0,  h: 78,  top: 6   },
  { left: 85.8, w: 9.2,  h: 94,  top: 0   },
]

function GlassSlab({
  left, w, h, top, filterId,
}: { left: number; w: number; h: number; top: number; filterId: string }) {
  // Real dimensions for the SVG displacement map
  // Must match the actual rendered size for correct distortion
  const svgW = w * 14   // approximate px width at 1400px viewport
  const svgH = h * 4    // approximate px height

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${w}%`,
        height: `${h}%`,
        // The outer wrapper gets the backdrop blur
        backdropFilter: 'blur(0.5px)',
        WebkitBackdropFilter: 'blur(0.5px)',
      }}
    >
      {/* LAYER 1: The actual liquid glass distortion using SVG filter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '2px',
          background: 'rgba(255, 255, 255, 0.01)',
          // Apply the SVG displacement filter to whatever is BEHIND the element
          backdropFilter: `blur(8px) url(#${filterId})`,
          WebkitBackdropFilter: `blur(8px) url(#${filterId})`,
        }}
      >
        {/* Inline SVG filter definition */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            inset: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
            >
              {/* Displacement map image — gradient that drives the refraction */}
              <feImage
                href={`data:image/svg+xml,
                  <svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="%230000"/>
                        <stop offset="100%" stop-color="red"/>
                      </linearGradient>
                      <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="%230000"/>
                        <stop offset="100%" stop-color="blue"/>
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="${svgW}" height="${svgH}" fill="black"/>
                    <rect x="0" y="0" width="${svgW}" height="${svgH}"
                      rx="${svgH}" fill="url(%23red)"/>
                    <rect x="0" y="0" width="${svgW}" height="${svgH}"
                      rx="${svgH}" fill="url(%23blue)"
                      style="mix-blend-mode: difference"/>
                    <rect
                      x="${svgW * 0.06}" y="${svgH * 0.25}"
                      width="${svgW * 0.88}" height="${svgH * 0.5}"
                      rx="${svgH}"
                      fill="hsl(0 0% 53% / 0.9)"
                      style="filter:blur(26px)"/>
                  </svg>`}
                x="0" y="0" width="100%" height="100%"
                result="map"
              />

              {/* Displace each RGB channel separately — creates chromatic aberration */}
              <feDisplacementMap in="SourceGraphic" in2="map"
                scale="120" xChannelSelector="R" yChannelSelector="B"
                result="dispRed"/>
              <feColorMatrix in="dispRed" type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"/>

              <feDisplacementMap in="SourceGraphic" in2="map"
                scale="120" xChannelSelector="R" yChannelSelector="B"
                result="dispGreen"/>
              <feColorMatrix in="dispGreen" type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="green"/>

              <feDisplacementMap in="SourceGraphic" in2="map"
                scale="120" xChannelSelector="R" yChannelSelector="B"
                result="dispBlue"/>
              <feColorMatrix in="dispBlue" type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"/>

              {/* Blend all 3 channels back together */}
              <feBlend in="red" in2="green" mode="screen" result="rg"/>
              <feBlend in="rg" in2="blue" mode="screen" result="output"/>

              {/* Final soft blur for smoothness */}
              <feGaussianBlur in="output" stdDeviation="1.5"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* LAYER 2: Gradient border — creates the bright edge highlight */}
      {/* This is the "breathing" shiny edge you see on the reference */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '2px',
          pointerEvents: 'none',
          zIndex: 2,
          // Gradient border technique using mask
          background: `linear-gradient(
            315deg,
            rgba(255,255,255,0.30) 0%,
            rgba(120,120,120,0)   30%,
            rgba(120,120,120,0)   70%,
            rgba(255,255,255,0.30) 100%
          ) border-box`,
          WebkitMask: `
            linear-gradient(#fff 0px, #fff 0px) padding-box exclude,
            linear-gradient(#fff 0px, #fff 0px)
          `,
          mask: `
            linear-gradient(#fff 0px, #fff 0px) padding-box exclude,
            linear-gradient(#fff 0px, #fff 0px)
          `,
          border: '1px solid transparent',
        }}
      />
    </div>
  )
}

export default function LiquidGlassBackground() {
  const uid = useId().replace(/:/g, '')

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {SLABS.map((slab, i) => (
        <GlassSlab
          key={i}
          {...slab}
          filterId={`lgf-${uid}-${i}`}
        />
      ))}
    </div>
  )
}
