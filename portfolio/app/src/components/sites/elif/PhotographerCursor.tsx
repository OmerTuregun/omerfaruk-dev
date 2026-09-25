'use client'

import { useEffect, useState } from 'react'

const cursorHideCss = `
  * {
    cursor: none !important;
  }
`

export default function PhotographerCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isOnPhoto, setIsOnPhoto] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
    }

    const handleDocumentMouseEnter = () => {
      setIsHidden(false)
    }

    const handleDocumentMouseLeave = () => {
      setIsHidden(true)
    }

    const handleMouseOver = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        setIsOnPhoto(Boolean(event.target.closest('[data-photo="true"]')))
      }
    }

    const handleMouseOut = (event: MouseEvent) => {
      const next = event.relatedTarget
      if (next instanceof HTMLElement) {
        setIsOnPhoto(Boolean(next.closest('[data-photo="true"]')))
      } else {
        setIsOnPhoto(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleDocumentMouseEnter)
    document.addEventListener('mouseleave', handleDocumentMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleDocumentMouseEnter)
      document.removeEventListener('mouseleave', handleDocumentMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cursorHideCss }} />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'fixed',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: isOnPhoto ? '#e8b4b8' : '#111',
            transform: 'translate(-50%, -50%)',
            left: pos.x,
            top: pos.y,
            transition: 'background 0.2s, transform 0.15s',
            opacity: isHidden ? 0 : 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'fixed',
            left: pos.x + 16,
            top: pos.y - 12,
            background: 'rgba(232, 180, 184, 0.95)',
            color: '#fff',
            border: 'none',
            borderRadius: 2,
            padding: '8px 16px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 11,
            letterSpacing: 2,
            opacity: isOnPhoto ? 1 : 0,
            transform: isOnPhoto
              ? 'scale(1) translateY(0)'
              : 'scale(0.8) translateY(4px)',
            transition: 'opacity 0.2s, transform 0.2s',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          GÖRÜNTÜLE
        </div>
      </div>
    </>
  )
}

export { PhotographerCursor }
