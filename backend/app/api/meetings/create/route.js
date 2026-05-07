import { scheduleMeeting } from '@/lib/scheduler/schedulingService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const meeting = await scheduleMeeting(body);
    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
