import React, { useState, useEffect, useRef, useCallback } from 'react'
import testimonios from './data/testimonialsData'
import Testimonial from './components/Testimonial'
import Controls from './components/Controls'

export default function App() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimerRef = useRef(null)

  const length = testimonios.length

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + length) % length)
    tempPause()
  }, [length])

  const next = useCallback(() => {
    setIndex(i => (i + 1) % length)
    tempPause()
  }, [length])

  const random = useCallback(() => {
    if (length <= 1) return
    let r = index
    while (r === index) {
      r = Math.floor(Math.random() * length)
    }
    setIndex(r)
    tempPause()
  }, [length, index])

  // pausa temporal cuando el usuario interactúa
  function tempPause(duration = 8000) {
    setIsPaused(true)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, duration)
  }

  // autoplay cada 5s salvo si está pausado
  useEffect(() => {
    if (isPaused) return undefined
    const id = setInterval(() => {
      setIndex(i => (i + 1) % length)
    }, 5000)
    return () => clearInterval(id)
  }, [isPaused, length])

  // teclado: ← y → para prev/next, R para aleatorio
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key.toLowerCase() === 'r') random()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next, random])

  // limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  return (
    <main className="container">
      <header className="header">
        <h1>Testimonios</h1>
        <p className="subtitle">Un testimonio a la vez — usa ◀ ▶ o 🎲. Pausa automática al interactuar.</p>
      </header>

      <section className="carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <Testimonial item={testimonios[index]} />
        <Controls onPrev={prev} onNext={next} onRandom={random} />
      </section>

      <footer className="footer">
        <small>Mostrando {index + 1} de {length}</small>
      </footer>
    </main>
  )
}
