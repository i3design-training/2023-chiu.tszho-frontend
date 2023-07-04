import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskCreate from './pages/task/Create/TaskCreate';

import UserLogin from './pages/user/UserLogin/UserLogin';
import TaskList from './pages/task/TaskList/TaskList';
import Register from './pages/user/Register/Register';
import LogoutPages from './pages/user/logout/LogoutPages';
import UserDetail from './pages/user/Detail/UserDetail';
import UserEdit from './pages/user/Edit/UserEdit';
import TaskDetail from './pages/task/Detail/TaskDetail';
import TaskEdit from './pages/task/Edit/TaskEdit';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/tasks',
    element: <TaskList />,
  },
  {
    path: '/tasks/create',
    element: <TaskCreate />,
  },
  {
    path: '/tasks/{task_id}',
    element: <TaskDetail />,
  },
  {
    path: '/tasks/create',
    element: <TaskCreate />,
  },
  {
    path: '/tasks/{task_id}/edit',
    element: <TaskEdit />,
  },
  {
    path: '/users/login',
    element: <UserLogin />,
  },
  {
    path: '/users/register',
    element: <Register />,
  },
  {
    path: '/users/logout',
    element: <LogoutPages />,
  },
  {
    path: '/users/{username}',
    element: <UserDetail />,
  },
  {
    path: '/users/${username}/edit',
    element: <UserEdit />,
  },
]);
const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
