import React from 'react'

export default function Testimonial({ item }) {
  if (!item) return null;
  const { nombre, cargo, texto, foto } = item;

  return (
    <article
      className="testimonial-card"
      aria-live="polite"
      aria-label={`Testimonio de ${nombre}`}
    >
      <div className="photo-wrap">
        <img
          src={foto}
          alt={`Foto de ${nombre}`}
          className="testimonial-photo"
          loading="lazy"
        />
      </div>

      <div className="testimonial-body">
        <h3 className="testimonial-name">{nombre}</h3>
        <p className="testimonial-role">{cargo}</p>
        <blockquote className="testimonial-text">“{texto}”</blockquote>
      </div>
    </article>
  );
}
