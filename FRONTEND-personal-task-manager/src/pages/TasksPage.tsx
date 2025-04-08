// import React, { useState } from 'react';
// import { Plus, Check, X, Edit, Clock, Tag, AlertCircle, Bell } from 'lucide-react';
// import type { Task, TaskSuggestion, ReminderSettings } from '../types';

// interface TasksPageProps {
//   onNavigateToReminders: () => void;
//   onAddReminder: (task: Task, reminderTime: number, useEmail: boolean) => void;
//   reminderSettings: ReminderSettings;
// }

// function TasksPage({ onNavigateToReminders, onAddReminder, reminderSettings }: TasksPageProps) {
//   const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [showReminderModal, setShowReminderModal] = useState(false);
//   const [selectedTaskForReminder, setSelectedTaskForReminder] = useState<Task | null>(null);
//   const [reminderTime, setReminderTime] = useState(reminderSettings.defaultReminderTime);
//   const [useEmailNotification, setUseEmailNotification] = useState(reminderSettings.emailNotifications);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     category: '',
//     time: '',
//     description: ''
//   });
  
//   const suggestions: TaskSuggestion[] = [
//     { title: 'Morning Exercise', time: '07:00', category: 'Health' },
//     { title: 'Team Meeting', time: '10:00', category: 'Work' },
//     { title: 'Read a Book', time: '19:00', category: 'Personal' },
//   ];

//   const checkOverlap = (time: string): boolean => {
//     return tasks.some(task => task.time === time && !task.completed);
//   };

//   const handleAddTask = () => {
//     if (!newTask.title || !newTask.time || !newTask.category) return;

//     const taskToAdd: Task = {
//       id: Date.now().toString(),
//       ...newTask,
//       completed: false
//     };

//     setTasks([...tasks, taskToAdd]);
//     setNewTask({ title: '', category: '', time: '', description: '' });
//     setShowAddModal(false);
//   };

//   const toggleTaskStatus = (taskId: string) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const deleteTask = (taskId: string) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   const startEditTask = (task: Task) => {
//     setEditingTask(task);
//     setNewTask({
//       title: task.title,
//       category: task.category,
//       time: task.time,
//       description: task.description || ''
//     });
//     setShowAddModal(true);
//   };

//   const handleEditTask = () => {
//     if (!editingTask) return;
    
//     setTasks(tasks.map(task => 
//       task.id === editingTask.id ? { ...task, ...newTask } : task
//     ));
//     setEditingTask(null);
//     setNewTask({ title: '', category: '', time: '', description: '' });
//     setShowAddModal(false);
//   };

//   const openReminderModal = (task: Task) => {
//     setSelectedTaskForReminder(task);
//     setReminderTime(reminderSettings.defaultReminderTime);
//     setUseEmailNotification(reminderSettings.emailNotifications);
//     setShowReminderModal(true);
//   };

//   const handleSetReminder = () => {
//     if (!selectedTaskForReminder) return;
    
//     onAddReminder(selectedTaskForReminder, reminderTime, useEmailNotification);
//     setShowReminderModal(false);
//     setSelectedTaskForReminder(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
//             <button 
//               onClick={onNavigateToReminders}
//               className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
//             >
//               <Bell size={20} />
//               <span>Set Reminders</span>
//             </button>
//           </div>
          
//           {/* Tabs */}
//           <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
//             <button
//               onClick={() => setActiveTab('pending')}
//               className={`flex-1 py-2 px-4 rounded-md transition-all ${
//                 activeTab === 'pending'
//                   ? 'bg-purple-500 text-white'
//                   : 'text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Pending Tasks
//             </button>
//             <button
//               onClick={() => setActiveTab('completed')}
//               className={`flex-1 py-2 px-4 rounded-md transition-all ${
//                 activeTab === 'completed'
//                   ? 'bg-purple-500 text-white'
//                   : 'text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Completed Tasks
//             </button>
//           </div>

//           {/* Add Task Button */}
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="mb-6 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600 transition-colors"
//           >
//             <Plus size={20} /> Add New Task
//           </button>

//           {/* Tasks List */}
//           <div className="space-y-4">
//             {tasks
//               .filter(task => task.completed === (activeTab === 'completed'))
//               .map(task => (
//                 <div
//                   key={task.id}
//                   className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => toggleTaskStatus(task.id)}
//                       className={`p-2 rounded-full ${
//                         task.completed
//                           ? 'bg-green-100 text-green-600'
//                           : 'bg-gray-100 text-gray-600'
//                       }`}
//                     >
//                       <Check size={20} />
//                     </button>
//                     <div>
//                       <h3 className={`text-lg font-medium ${
//                         task.completed ? 'line-through text-gray-400' : 'text-gray-800'
//                       }`}>
//                         {task.title}
//                       </h3>
//                       <div className="flex gap-4 mt-1">
//                         <span className="flex items-center text-sm text-gray-500">
//                           <Clock size={16} className="mr-1" /> {task.time}
//                         </span>
//                         <span className="flex items-center text-sm text-gray-500">
//                           <Tag size={16} className="mr-1" /> {task.category}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => openReminderModal(task)}
//                       className="p-2 text-purple-600 hover:bg-purple-50 rounded-full"
//                       title="Set Reminder"
//                     >
//                       <Bell size={20} />
//                     </button>
//                     <button
//                       onClick={() => startEditTask(task)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
//                     >
//                       <Edit size={20} />
//                     </button>
//                     <button
//                       onClick={() => deleteTask(task.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-full"
//                     >
//                       <X size={20} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* Task Suggestions */}
//           {activeTab === 'pending' && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Tasks</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {suggestions.map((suggestion, index) => (
//                   <div
//                     key={index}
//                     className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-gray-200"
//                   >
//                     <h3 className="font-medium text-gray-800">{suggestion.title}</h3>
//                     <div className="flex gap-4 mt-2">
//                       <span className="flex items-center text-sm text-gray-500">
//                         <Clock size={16} className="mr-1" /> {suggestion.time}
//                       </span>
//                       <span className="flex items-center text-sm text-gray-500">
//                         <Tag size={16} className="mr-1" /> {suggestion.category}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add/Edit Task Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               {editingTask ? 'Edit Task' : 'Add New Task'}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter task title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Time
//                 </label>
//                 <input
//                   type="time"
//                   value={newTask.time}
//                   onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//                 {checkOverlap(newTask.time) && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center">
//                     <AlertCircle size={16} className="mr-1" />
//                     Warning: This time slot overlaps with another task
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   value={newTask.category}
//                   onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter category"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description (Optional)
//                 </label>
//                 <textarea
//                   value={newTask.description}
//                   onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter description"
//                   rows={3}
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex gap-3">
//               <button
//                 onClick={editingTask ? handleEditTask : handleAddTask}
//                 className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
//               >
//                 {editingTask ? 'Save Changes' : 'Add Task'}
//               </button>
//               <button
//                 onClick={() => {
//                   setShowAddModal(false);
//                   setEditingTask(null);
//                   setNewTask({ title: '', category: '', time: '', description: '' });
//                 }}
//                 className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Set Reminder Modal */}
//       {showReminderModal && selectedTaskForReminder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Reminder</h2>
//             <div className="mb-4">
//               <h3 className="text-lg font-medium text-gray-700">
//                 {selectedTaskForReminder.title}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Scheduled for {selectedTaskForReminder.time}
//               </p>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Remind me
//                 </label>
//                 <select
//                   value={reminderTime}
//                   onChange={(e) => setReminderTime(Number(e.target.value))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value={15}>15 minutes before</option>
//                   <option value={30}>30 minutes before</option>
//                   <option value={60}>1 hour before</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={useEmailNotification}
//                     onChange={(e) => setUseEmailNotification(e.target.checked)}
//                     className="w-4 h-4 text-purple-600"
//                   />
//                   <span className="text-sm text-gray-700">Send email notification</span>
//                 </label>
//               </div>
//             </div>
//             <div className="mt-6 flex gap-3">
//               <button
//                 onClick={handleSetReminder}
//                 className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
//               >
//                 Set Reminder
//               </button>
//               <button
//                 onClick={() => {
//                   setShowReminderModal(false);
//                   setSelectedTaskForReminder(null);
//                 }}
//                 className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TasksPage;

import React, { useState } from 'react';
import { Plus, Check, X, Edit, Clock, Tag, AlertCircle, Bell } from 'lucide-react';
import type { Task, TaskSuggestion, ReminderSettings } from '../types';

interface TasksPageProps {
  onNavigateToReminders: () => void;
  onAddReminder: (task: Task, reminderTime: number, useEmail: boolean) => void;
  reminderSettings: ReminderSettings;
}

function TasksPage({ onNavigateToReminders, onAddReminder, reminderSettings }: TasksPageProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedTaskForReminder, setSelectedTaskForReminder] = useState<Task | null>(null);
  const [reminderTime, setReminderTime] = useState(reminderSettings.defaultReminderTime);
  const [useEmailNotification, setUseEmailNotification] = useState(reminderSettings.emailNotifications);
  const [newTask, setNewTask] = useState({
    title: '',
    category: '',
    time: '',
    description: ''
  });
  
  const suggestions: TaskSuggestion[] = [
    { title: 'Morning Exercise', time: '07:00', category: 'Health' },
    { title: 'Team Meeting', time: '10:00', category: 'Work' },
    { title: 'Read a Book', time: '19:00', category: 'Personal' },
  ];

  const checkOverlap = (time: string): boolean => {
    return tasks.some(task => task.time === time && !task.completed);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.time || !newTask.category) return;

    const taskToAdd: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', category: '', time: '', description: '' });
    setShowAddModal(false);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      category: task.category,
      time: task.time,
      description: task.description || ''
    });
    setShowAddModal(true);
  };

  const handleEditTask = () => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...task, ...newTask } : task
    ));
    setEditingTask(null);
    setNewTask({ title: '', category: '', time: '', description: '' });
    setShowAddModal(false);
  };

  const openReminderModal = (task: Task) => {
    setSelectedTaskForReminder(task);
    setReminderTime(reminderSettings.defaultReminderTime);
    setUseEmailNotification(reminderSettings.emailNotifications);
    setShowReminderModal(true);
  };

  const handleSetReminder = () => {
    if (!selectedTaskForReminder) return;
    
    onAddReminder(selectedTaskForReminder, reminderTime, useEmailNotification);
    setShowReminderModal(false);
    setSelectedTaskForReminder(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          <button 
            onClick={onNavigateToReminders}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <Bell size={20} />
            <span>Reminders</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'pending'
                ? 'bg-purple-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending Tasks
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              activeTab === 'completed'
                ? 'bg-purple-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Completed Tasks
          </button>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-6 bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600 transition-colors"
        >
          <Plus size={20} /> Add New Task
        </button>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks
            .filter(task => task.completed === (activeTab === 'completed'))
            .map(task => (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`p-2 rounded-full ${
                      task.completed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                  <div>
                    <h3 className={`text-lg font-medium ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h3>
                    <div className="flex gap-4 mt-1">
                      <span className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" /> {task.time}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Tag size={16} className="mr-1" /> {task.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openReminderModal(task)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-full"
                    title="Set Reminder"
                  >
                    <Bell size={20} />
                  </button>
                  <button
                    onClick={() => startEditTask(task)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Task Suggestions */}
        {activeTab === 'pending' && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-gray-200"
                >
                  <h3 className="font-medium text-gray-800">{suggestion.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" /> {suggestion.time}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <Tag size={16} className="mr-1" /> {suggestion.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Task Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {checkOverlap(newTask.time) && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      Warning: This time slot overlaps with another task
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={editingTask ? handleEditTask : handleAddTask}
                  className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTask(null);
                    setNewTask({ title: '', category: '', time: '', description: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Set Reminder Modal */}
        {showReminderModal && selectedTaskForReminder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Reminder</h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {selectedTaskForReminder.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Scheduled for {selectedTaskForReminder.time}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remind me
                  </label>
                  <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={15}>15 minutes before</option>
                    <option value={30}>30 minutes before</option>
                    <option value={60}>1 hour before</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useEmailNotification}
                      onChange={(e) => setUseEmailNotification(e.target.checked)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm text-gray-700">Send email notification</span>
                  </label>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSetReminder}
                  className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Set Reminder
                </button>
                <button
                  onClick={() => {
                    setShowReminderModal(false);
                    setSelectedTaskForReminder(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPage;