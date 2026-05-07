// Zoom OAuth callback has been replaced with Jitsi Meet (free, no auth required).
// This file is kept as a placeholder.

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/settings?integration=connected', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}
