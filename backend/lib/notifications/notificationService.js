import { db } from '../firebase-admin';

export default class NotificationService {
  /**
   * Send a notification to a specific user
   */
  static async notifyUser(userId, notification) {
    try {
      const notificationData = {
        userId,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        relatedId: notification.relatedId || null,
        unread: true,
        createdAt: new Date().toISOString(),
      };

      await db.collection('notifications').add(notificationData);
      return { success: true };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Notify multiple participants about a meeting
   */
  static async notifyParticipants(participantIds, meetingDetails) {
    const notifications = participantIds.map(userId => 
      this.notifyUser(userId, {
        title: 'New AI Scheduled Meeting',
        message: `AI has scheduled "${meetingDetails.title}" at ${meetingDetails.startTime}.`,
        type: 'meeting',
        relatedId: meetingDetails.id
      })
    );

    return Promise.all(notifications);
  }
}
