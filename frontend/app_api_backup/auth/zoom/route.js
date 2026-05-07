// Zoom OAuth has been replaced with Jitsi Meet (free, no auth required).
// This file is kept as a placeholder for future paid integrations.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Video meetings are now powered by Jitsi Meet (free, no setup required).',
    info: 'Meeting links are auto-generated when you schedule meetings.'
  });
}
