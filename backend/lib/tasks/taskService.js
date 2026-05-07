import { db } from '../firebase-admin';

export async function createTask({ title, priority, status, assignedBy, assignedTo, meetingId }) {
  try {
    const taskData = {
      title,
      priority,
      status,
      assigned_by: assignedBy,
      user_id: assignedTo, // Standardized field name
      meeting_id: meetingId,
      created_at: new Date().toISOString()
    };

    const docRef = await db.collection('tasks').add(taskData);
    return { id: docRef.id, ...taskData };
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
}

export async function getTasksForUser(userId) {
  try {
    const snapshot = await db.collection('tasks')
      .where('user_id', '==', userId)
      .get();
      
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const priorities = { high: 1, medium: 2, low: 3 };
        return (priorities[a.priority] || 9) - (priorities[b.priority] || 9);
      });
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
}
