import { testimonials } from '@/lib/photographer-data'

export function PhotographerTestimonials() {
  return (
    <section
      style={{
        borderTop: '1px solid #e8e8e4',
        borderBottom: '1px solid #e8e8e4',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={`${testimonial.author}-${index}`}
          style={{
            padding: '60px 48px',
            borderRight:
              index < testimonials.length - 1 ? '1px solid #e8e8e4' : 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 10,
              color: '#e8b4b8',
              letterSpacing: 3,
              marginBottom: 20,
            }}
          >
            MÜŞTERİ YORUMU
          </div>
          <div
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: 64,
              color: '#f5e8ea',
              lineHeight: 0.8,
              marginBottom: 16,
            }}
          >
            &ldquo;
          </div>
          <p
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 20,
              color: '#111',
              lineHeight: 1.6,
              margin: 0,
              marginBottom: 20,
            }}
          >
            {testimonial.quote}
          </p>
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 11,
              color: '#888',
              letterSpacing: 1,
            }}
          >
            — {testimonial.author}, {testimonial.role}
          </div>
        </div>
      ))}
    </section>
  )
}
