import { createTask } from '@/lib/tasks/taskService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const task = await createTask(body);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
