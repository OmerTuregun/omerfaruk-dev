'use client'

const companies = [
  'Stripe',
  'Vercel',
  'Linear',
  'Notion',
  'Figma',
  'Loom',
  'Slack',
  'Shopify',
  'Intercom',
  'HubSpot',
  'Zendesk',
  'Salesforce',
  'Twilio',
  'SendGrid',
  'Mixpanel',
  'Segment',
  'Amplitude',
  'Heap',
  'Hotjar',
  'Typeform',
  'Airtable',
  'Monday',
  'Asana',
  'ClickUp',
  'Zoom',
  'Calendly',
  'Stripe',
  'Webflow',
  'Framer',
  'Ghost',
] as const

export function SaasLogos() {
  const doubled = [...companies, ...companies]

  return (
    <section
      style={{
        overflow: 'hidden',
        padding: '32px 0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        background: '#fff',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: 'linear-gradient(to right, #fff, transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: 'linear-gradient(to left, #fff, transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden
      />

      <p
        style={{
          textAlign: 'center',
          marginBottom: 20,
          fontSize: 13,
          color: '#94a3b8',
          letterSpacing: '0.5px',
          marginTop: 0,
        }}
      >
        200+ şirket güveniyor
      </p>

      <div className="marquee-track">
        {doubled.map((name, i) => (
          <div
            key={i}
            style={{
              padding: '0 40px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#cbd5e1',
              letterSpacing: '-0.3px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}
