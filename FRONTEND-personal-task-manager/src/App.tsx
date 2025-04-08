// import React, { useState } from 'react';
// import TasksPage from './pages/TasksPage';
// import RemindersPage from './pages/RemindersPage';
// import { Task, Reminder, ReminderSettings } from './types';

// function App() {
//   const [currentPage, setCurrentPage] = useState<'tasks' | 'reminders'>('tasks');
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
//     defaultReminderTime: 30,
//     emailNotifications: true,
//     dailySummary: false,
//     dailySummaryTime: '09:00'
//   });

//   const addReminder = (task: Task, reminderTime: number, useEmail: boolean) => {
//     const newReminder: Reminder = {
//       id: Date.now().toString(),
//       taskId: task.id,
//       taskTitle: task.title,
//       reminderTime: task.time,
//       notificationMethod: 'email',
//       status: 'pending'
//     };
//     setReminders([...reminders, newReminder]);
//   };

//   return (
//     <div>
//       {currentPage === 'tasks' ? (
//         <TasksPage 
//           onNavigateToReminders={() => setCurrentPage('reminders')}
//           onAddReminder={addReminder}
//           reminderSettings={reminderSettings}
//         />
//       ) : (
//         <RemindersPage 
//           reminders={reminders}
//           settings={reminderSettings}
//           onUpdateSettings={setReminderSettings}
//           onNavigateToTasks={() => setCurrentPage('tasks')}
//           onUpdateReminders={setReminders}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import TasksPage from './pages/TasksPage';
import RemindersPage from './pages/RemindersPage';
import { Task, Reminder, ReminderSettings } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'tasks' | 'reminders'>('tasks');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    defaultReminderTime: 30,
    emailNotifications: true,
    dailySummary: false,
    dailySummaryTime: '09:00'
  });

  const addReminder = (task: Task, reminderTime: number, useEmail: boolean) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      taskId: task.id,
      taskTitle: task.title,
      reminderTime: task.time,
      notificationMethod: 'email',
      status: 'pending'
    };
    setReminders([...reminders, newReminder]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="w-full max-w-4xl px-4">
        {currentPage === 'tasks' ? (
          <TasksPage 
            onNavigateToReminders={() => setCurrentPage('reminders')}
            onAddReminder={addReminder}
            reminderSettings={reminderSettings}
          />
        ) : (
          <RemindersPage 
            reminders={reminders}
            settings={reminderSettings}
            onUpdateSettings={setReminderSettings}
            onNavigateToTasks={() => setCurrentPage('tasks')}
            onUpdateReminders={setReminders}
          />
        )}
      </div>
    </div>
  );
}

export default App;