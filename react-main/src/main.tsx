import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskList from './TaskList';
import UserLogin from './UserLogin';
import TaskCreate from './TaskCreate';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/tasklist',
    element: <TaskList />,
  },
  {
    path: '/taskcreate',
    element: <TaskCreate />,
  },
  {
    path: '/userlogin',
    element: <UserLogin />,
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
