import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';

export async function createTask(taskData) {
  const { title, assignedTo, assignedBy, meetingId, deadline, priority, status } = taskData;

  try {
    const taskRecord = {
      title,
      user_id: assignedTo, // Standardized field name
      assigned_by: assignedBy,
      meeting_id: meetingId,
      deadline,
      priority,
      status: status || 'todo',
      created_at: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'tasks'), taskRecord);
    return { id: docRef.id, ...taskRecord };
  } catch (error) {
    console.error("Create task error:", error);
    
    // Prototype Fallback
    if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true' || error.message.includes('PERMISSION_DENIED')) {
      return { id: `proto-task-${Date.now()}`, ...taskData, created_at: new Date().toISOString() };
    }
    throw error;
  }
}

export async function updateTaskStatus(taskId, status) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { status });
    const updatedDoc = await getDoc(taskRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error("Update task status error:", error);

    // Prototype Fallback
    if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true' || error.message.includes('PERMISSION_DENIED')) {
      return { id: taskId, status };
    }
    throw error;
  }
}

export async function getTasksForUser(userId) {
  try {
    const q = query(
      collection(db, 'tasks'),
      where('user_id', '==', userId)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((taskDoc) => ({
        id: taskDoc.id,
        duration: taskDoc.data().duration || taskDoc.data().deadline || "No deadline",
        ...taskDoc.data()
      }))
      .sort((a, b) => {
        const priorityRank = { urgent: 0, high: 1, medium: 2, low: 3 };
        const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
        const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;

        if (aDeadline !== bDeadline) {
          return aDeadline - bDeadline;
        }

        return (priorityRank[a.priority] ?? 99) - (priorityRank[b.priority] ?? 99);
      });
  } catch (error) {
    console.error("Get tasks error:", error);

    // Prototype Fallback
    if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true' || error.message.includes('PERMISSION_DENIED')) {
      return [
        { id: '1', title: 'Review Q4 Strategy', priority: 'urgent', status: 'todo', duration: '2h' },
        { id: '2', title: 'Update Figma components', priority: 'high', status: 'in-progress', duration: '4h' },
        { id: '3', title: 'Team Sync', priority: 'medium', status: 'completed', duration: '1h' },
      ];
    }
    throw error;
  }
}
