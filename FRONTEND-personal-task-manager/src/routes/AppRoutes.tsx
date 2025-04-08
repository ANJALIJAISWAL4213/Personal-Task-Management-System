// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import TasksPage from "../pages/TasksPage";
// import RemindersPage from "../pages/RemindersPage";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<TasksPage />} />
//       <Route path="/reminders" element={<RemindersPage />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksPage from '../pages/TasksPage';
// import RemindersPage from './pages/RemindersPage'; (if needed)

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        {/* <Route path="/reminders" element={<RemindersPage />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
