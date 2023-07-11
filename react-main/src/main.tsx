import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskCreate from './pages/task/Create/TaskCreate';

import UserLogin from './pages/user/Login/UserLogin';
import TaskList from './pages/task/TaskList/TaskList';
import Register from './pages/user/Register/Register';
import LogoutPages from './pages/user/logout/LogoutPages';
import UserDetail from './pages/user/Detail/UserDetail';
import UserEdit from './pages/user/Edit/UserEdit';
import TaskDetail from './pages/task/Detail/TaskDetail';
import TaskEdit from './pages/task/Edit/TaskEdit';
import { StyledEngineProvider } from '@mui/material/styles';
import CategoryList from './pages/category/CategoryList/CategoryList';
import CategoryCreate from './pages/category/Create/CategoryCreate';
import CategoryDetail from './pages/category/Detail/CategoryDetail';
import CategoryEdit from './pages/category/Edit/CategoryEdit';
import EmailVerified from './pages/email/EmailVerified';

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
    path: `/tasks/:task_id`,
    element: <TaskDetail />,
  },
  {
    path: '/tasks/create',
    element: <TaskCreate />,
  },
  {
    path: '/tasks/:task_id/edit',
    element: <TaskEdit />,
  },
  {
    path: '/users/login',
    element: <UserLogin />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/users/logout',
    element: <LogoutPages />,
  },
  {
    path: '/users/',
    // path: '/users/{username}',
    element: <UserDetail />,
  },
  {
    path: '/users/edit',
    // path: '/users/${username}/edit',
    element: <UserEdit />,
  },
  {
    path: '/categories',
    element: <CategoryList />,
  },
  {
    path: '/categories/create',
    element: <CategoryCreate />,
  },
  {
    path: '/categories/1',
    // path: '/categories/${category_id}',
    element: <CategoryDetail />,
  },
  {
    path: '/categories/1/edit',
    // path: '/categories/${category_id}/edit',
    element: <CategoryEdit />,
  },

  {
    path: '/emailVerifiied/:token',
    element: <EmailVerified />,
  },
]);
const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    // <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>,
    // </React.StrictMode>,
  );
}
