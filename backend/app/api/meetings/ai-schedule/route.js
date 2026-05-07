import { NextResponse } from 'next/server';
import { orchestrateMeeting } from '../../../../lib/ai/meetingOrchestrator';

export async function POST(request) {
  console.log("📥 AI Schedule Request Received");
  try {
    const body = await request.json();
    console.log("📦 Request Body:", JSON.stringify(body, null, 2));
    
    if (!body.participantIds || body.participantIds.length === 0) {
      return NextResponse.json({ error: "Participant IDs are required" }, { status: 400 });
    }

    const result = await orchestrateMeeting(body);
    console.log("✅ Orchestration Result:", JSON.stringify(result, null, 2));

    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error("❌ AI Schedule Error:", error);
    return NextResponse.json({ error: error.message }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
