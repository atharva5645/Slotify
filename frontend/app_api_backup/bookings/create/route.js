import { createMeeting } from '@/lib/scheduler/schedulingService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId, title, date, time } = await request.json();
    
    const startTime = `${date}T${time}:00Z`;
    const endTime = `${date}T${time}:45:00Z`; // Mock 45 min

    const meeting = await scheduleMeeting({
      organizerId: userId,
      title: title || "External Booking",
      description: "Booked via external link",
      startTime,
      endTime,
      participants: [
        { userId, name: "Host", mandatory: true }
      ],
      minAttendees: 1
    });

    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
