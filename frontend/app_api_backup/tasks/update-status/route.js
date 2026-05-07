import { updateTaskStatus } from '@/lib/tasks/taskService';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const { taskId, status } = await request.json();
    const task = await updateTaskStatus(taskId, status);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
