import { getMeetingsForUser } from '@/lib/scheduler/schedulingService';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const meetings = await getMeetingsForUser(id);
    return NextResponse.json(meetings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
