export interface Task {
    id: string;
    title: string;
    category: string;
    time: string;
    description?: string;
    completed: boolean;
  }
  
  export interface TaskSuggestion {
    title: string;
    time: string;
    category: string;
  }
  export interface ReminderSettings {
    defaultReminderTime: number; // minutes before task
    emailNotifications: boolean;
    dailySummary: boolean;
    dailySummaryTime: string;
  }
  
  export interface Reminder {
    id: string;
    taskId: string;
    taskTitle: string;
    reminderTime: string;
    notificationMethod: 'email';
    status: 'pending' | 'sent' | 'dismissed' | 'snoozed';
    snoozeUntil?: string;
  }