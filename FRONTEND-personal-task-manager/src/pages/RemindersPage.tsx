import React, { useState } from 'react';
import { Bell, Mail, Clock, Check, X, AlertCircle, Settings, History, RotateCcw } from 'lucide-react';
import type { ReminderSettings, Reminder } from '../types';

function RemindersPage() {
  const [settings, setSettings] = useState<ReminderSettings>({
    defaultReminderTime: 30,
    emailNotifications: true,
    dailySummary: false,
    dailySummaryTime: '09:00'
  });

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      taskId: '1',
      taskTitle: 'Morning Exercise',
      reminderTime: '08:30',
      notificationMethod: 'email',
      status: 'pending'
    },
    {
      id: '2',
      taskId: '2',
      taskTitle: 'Team Meeting',
      reminderTime: '09:45',
      notificationMethod: 'email',
      status: 'pending'
    },
    {
      id: '3',
      taskId: '3',
      taskTitle: 'Read a Book',
      reminderTime: '18:30',
      notificationMethod: 'email',
      status: 'pending'
    }
  ]);

  const handleSnooze = (reminderId: string, minutes: number) => {
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + minutes);
    
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { 
            ...reminder, 
            status: 'snoozed', 
            snoozeUntil: snoozeTime.toISOString() 
          } 
        : reminder
    ));
  };

  const handleDismiss = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, status: 'dismissed' } 
        : reminder
    ));
  };

  const handleMarkAsDone = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, status: 'sent' } 
        : reminder
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Reminder Settings</h1>
            <Settings className="text-gray-600" size={24} />
          </div>

          {/* Settings Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Default Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Reminder Time
                </label>
                <select
                  value={settings.defaultReminderTime}
                  onChange={(e) => setSettings({ ...settings, defaultReminderTime: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value={15}>15 minutes before</option>
                  <option value={30}>30 minutes before</option>
                  <option value={60}>1 hour before</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="w-4 h-4 text-purple-500"
                  />
                  <Mail size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Email Notifications</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dailySummary}
                    onChange={(e) => setSettings({ ...settings, dailySummary: e.target.checked })}
                    className="w-4 h-4 text-purple-500"
                  />
                  <Clock size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Daily Summary</span>
                </label>
                {settings.dailySummary && (
                  <input
                    type="time"
                    value={settings.dailySummaryTime}
                    onChange={(e) => setSettings({ ...settings, dailySummaryTime: e.target.value })}
                    className="px-3 py-1 border border-gray-300 rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Reminders</h2>
            <div className="space-y-4">
              {reminders
                .filter(reminder => reminder.status === 'pending')
                .map(reminder => (
                  <div
                    key={reminder.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                        <Bell size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{reminder.taskTitle}</h3>
                        <div className="flex gap-4 mt-1">
                          <span className="flex items-center text-sm text-gray-500">
                            <Clock size={16} className="mr-1" /> {reminder.reminderTime}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <Mail size={16} className="mr-1" /> Email
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAsDone(reminder.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        title="Mark as Done"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleSnooze(reminder.id, 5)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Snooze"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <button
                        onClick={() => handleDismiss(reminder.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Dismiss"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Reminder History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <History size={20} className="text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Reminder History</h2>
            </div>
            <div className="space-y-3">
              {reminders
                .filter(reminder => reminder.status !== 'pending')
                .map(reminder => (
                  <div
                    key={reminder.id}
                    className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-full ${
                        reminder.status === 'sent' ? 'bg-green-100 text-green-600' :
                        reminder.status === 'snoozed' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {reminder.status === 'sent' ? <Check size={16} /> :
                         reminder.status === 'snoozed' ? <RotateCcw size={16} /> :
                         <X size={16} />}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">{reminder.taskTitle}</h3>
                        <p className="text-xs text-gray-500">
                          {reminder.status === 'snoozed' ? 'Snoozed until ' + reminder.snoozeUntil :
                           reminder.status === 'sent' ? 'Completed' : 'Dismissed'}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{reminder.reminderTime}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemindersPage;