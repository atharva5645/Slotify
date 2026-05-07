import { getAvailableSlots } from '@/lib/booking/bookingService';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const date = searchParams.get('date');

  if (!userId || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(userId, date);
    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
