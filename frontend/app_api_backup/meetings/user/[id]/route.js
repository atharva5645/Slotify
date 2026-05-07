import { getMeetingsForUser } from '@/lib/scheduler/schedulingService';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/meetings/user/${id}`);
    const meetings = await response.json();
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
