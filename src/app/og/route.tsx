import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grille phosphore */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,255,65,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Halo vert */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,255,65,0.12), transparent 70%)',
          }}
        />
        {/* Fenêtre de terminal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1000px',
            border: '1px solid #1f1f1f',
            backgroundColor: 'rgba(8,8,8,0.9)',
            boxShadow: '0 0 80px rgba(0,255,65,0.10)',
          }}
        >
          {/* Barre de titre */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 20px',
              borderBottom: '1px solid #1f1f1f',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#ff5f56' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#ffbd2e' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#27c93f' }} />
            <div style={{ color: '#666666', fontSize: 18, marginLeft: 12 }}>
              {`mael@${site.handle}: ~`}
            </div>
          </div>
          {/* Session */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: '48px 56px' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
              <span style={{ color: '#00ff41', fontSize: 22 }}>$</span>
              <span style={{ color: '#888888', fontSize: 22 }}>whoami</span>
            </div>
            <div
              style={{
                color: '#e8e8e8',
                fontSize: 68,
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: 10,
              }}
            >
              {site.name}
            </div>
            <div style={{ color: '#00ff41', fontSize: 26, marginBottom: 22 }}>
              {`@${site.handle}`}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: 12,
                marginBottom: 26,
                border: '1px solid rgba(0,255,65,0.4)',
                backgroundColor: 'rgba(0,255,65,0.06)',
                padding: '10px 18px',
                boxShadow: '0 0 24px rgba(0,255,65,0.15)',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#00ff41' }} />
              <div
                style={{
                  color: '#00ff41',
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                }}
              >
                Ingénieur en cybersécurité
              </div>
            </div>
            <div style={{ color: '#ffb300', fontSize: 24, marginBottom: 14 }}>
              Cybersécurité · GRC · Développement sécurisé
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#888888', fontSize: 18 }}>Grenoble, France</div>
              <div style={{ color: '#333333', fontSize: 16 }}>maelbelhacene.fr</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
