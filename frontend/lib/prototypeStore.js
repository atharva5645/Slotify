/**
 * Simple local storage persistent store for prototype demonstrations.
 * This allows the AI Assistant to "save" data that the Dashboard can then "read".
 */

import { toast } from 'react-hot-toast';

const MEETINGS_KEY = 'slotify_proto_meetings';
const TASKS_KEY = 'slotify_proto_tasks';
const NOTIFS_KEY = 'slotify_proto_notifs';
const DISCUSSIONS_KEY = 'slotify_proto_discussions';

export const prototypeStore = {
  getMeetings: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(MEETINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addMeeting: (meeting) => {
    if (typeof window === 'undefined') return;
    const meetings = prototypeStore.getMeetings();
    const newMeetings = [meeting, ...meetings];
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(newMeetings));
    
    // Auto-generate a notification
    prototypeStore.addNotification({
      id: `n-${Date.now()}`,
      type: 'meeting',
      title: 'Meeting Scheduled!',
      message: `"${meeting.title}" has been successfully scheduled.`,
      unread: true,
      createdAt: new Date().toISOString()
    });

    // TRIGGER GROUP DISCUSSION
    prototypeStore.addDiscussion({
      id: `d-init-${Date.now()}`,
      user: "Slotify AI",
      avatar: "🤖",
      time: "JUST NOW",
      content: `📢 **New Meeting Scheduled: ${meeting.title}**\n📅 **Time:** ${meeting.startTime}\n\n*Notifying 20 team members. Agents are syncing calendars...*`,
      color: "bg-primary/10 text-primary border-primary/20 shadow-sm"
    });

    // Simulated Agent responses in the group
    setTimeout(() => {
      prototypeStore.addDiscussion({
        id: `d-alex-${Date.now()}`,
        user: "Alex's AI Agent",
        avatar: "A",
        time: "AUTO-SYNCED",
        content: `Alex's calendar is updated. I've resolved a minor conflict with his focus time to prioritize this ${meeting.title}.`,
        color: "bg-primary/5 text-primary border-primary/10"
      });
    }, 2000);

    setTimeout(() => {
      prototypeStore.addDiscussion({
        id: `d-sarah-${Date.now()}`,
        user: "Sarah's AI Agent",
        avatar: "S",
        time: "AUTO-SYNCED",
        content: `Sarah is confirmed. I've notified her 10 sub-team members to keep the slot clear.`,
        color: "bg-success/5 text-success border-success/10"
      });
    }, 4000);
    
    return meeting;
  },

  getTasks: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addTask: (task) => {
    if (typeof window === 'undefined') return;
    const tasks = prototypeStore.getTasks();
    const newTasks = [task, ...tasks];
    localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
    return task;
  },

  getNotifications: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(NOTIFS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addNotification: (notif) => {
    if (typeof window === 'undefined') return;
    const notifs = prototypeStore.getNotifications();
    const newNotifs = [notif, ...notifs];
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(newNotifs));
    
    // Trigger a visual toast notification
    toast.success(notif.message, {
      icon: '🔔',
      duration: 5000,
    });

    // Dispatch a custom event so components can listen
    window.dispatchEvent(new Event('slotify-notif-added'));
    return notif;
  },

  markNotificationsAsRead: () => {
    if (typeof window === 'undefined') return;
    const notifs = prototypeStore.getNotifications().map(n => ({ ...n, unread: false }));
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
    window.dispatchEvent(new Event('slotify-notif-added'));
  },

  getDiscussions: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(DISCUSSIONS_KEY);
    if (!stored) {
      // Default mock discussions
      return [
        { id: 1, user: "Sarah Lee", avatar: "S", time: "2M AGO", content: "Has anyone reviewed the Q4 plan?", color: "bg-primary/10 text-primary" },
        { id: 2, user: "Alex Mercer", avatar: "A", time: "15M AGO", content: "I'll take a look after lunch.", color: "bg-surface-container-high text-on-surface-variant" },
        { id: 3, user: "John Doe", avatar: "J", time: "1H AGO", content: "Need the Figma links updated.", color: "bg-surface-container-high text-on-surface-variant" },
      ];
    }
    return JSON.parse(stored);
  },

  addDiscussion: (message) => {
    if (typeof window === 'undefined') return;
    const discussions = prototypeStore.getDiscussions();
    const newDiscussions = [message, ...discussions];
    localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(newDiscussions));
    
    // Dispatch a custom event
    window.dispatchEvent(new Event('slotify-discussion-added'));
    return message;
  },

  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(MEETINGS_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(NOTIFS_KEY);
    localStorage.removeItem(DISCUSSIONS_KEY);
  }
};
