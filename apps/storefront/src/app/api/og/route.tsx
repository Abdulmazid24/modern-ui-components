import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Modern UI Vault';
  const category = searchParams.get('category') || 'Component';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          position: 'relative',
        }}
      >
        {/* Background Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, #27272a 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.15), transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(34,211,238,0.1)',
              border: '1px solid rgba(34,211,238,0.3)',
              borderRadius: '999px',
              padding: '8px 20px',
              fontSize: '16px',
              color: '#22d3ee',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: 'white',
              textAlign: 'center',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '20px',
              color: '#71717a',
              fontWeight: 600,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginTop: '12px',
            }}
          >
            modern-ui-vault.dev
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
