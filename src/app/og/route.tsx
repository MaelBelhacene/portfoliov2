import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#000000',
          padding: '80px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <span style={{ color: '#00ff41', fontSize: '20px' }}>$</span>
          <span style={{ color: '#888888', fontSize: '20px' }}>whoami</span>
        </div>
        {/* Name */}
        <div
          style={{
            color: '#c0c0c0',
            fontSize: '72px',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Mael Belhacene
        </div>
        {/* Handle */}
        <div style={{ color: '#00ff41', fontSize: '28px', marginBottom: '32px' }}>
          @ghst.sec
        </div>
        {/* Role */}
        <div style={{ color: '#ffb300', fontSize: '24px', marginBottom: '16px' }}>
          Cybersécurité · GRC · Développement sécurisé
        </div>
        {/* Location */}
        <div style={{ color: '#888888', fontSize: '18px' }}>
          Grenoble, France
        </div>
        {/* Bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            right: '80px',
            height: '1px',
            backgroundColor: '#1a1a1a',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '80px',
            color: '#1a1a1a',
            fontSize: '14px',
          }}
        >
          maelbelhacene.fr
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
