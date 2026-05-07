import { checkAvailability } from '@/lib/scheduler/availabilityEngine';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { participants, startTime, endTime } = await request.json();
    const result = await checkAvailability(participants, startTime, endTime);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
