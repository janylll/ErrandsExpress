import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './log-in/Auth.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import SignUp from './log-in/Auth.jsx';
import NotFoundPage from './NotFoundPage/Nopage.jsx';
import Errands from './dashboard/Errands.jsx';
import Layout from './dashboard/layout.jsx';
import Notification from './dashboard/Notification.jsx';
import RunnerMode from './dashboard/RunnerMode.jsx';
import Inbox from './dashboard/Inbox.jsx';
import Dashboard from './dashboard/dashboard.jsx'; 
import ManageAccount from './adminpage/ManageAccount.jsx';
import Layout2 from './adminpage/layout2.jsx';
import Admin from './adminpage/admin-log-in.jsx';
import AdminDashboard from './adminpage/AdminDashboard.jsx';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <SignUp /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/AdminLogin", element: <Admin /> },
  {
    path: "/adminDashboard",
    element: <Layout2 />,
    children: [
      { index: true, element: <AdminDashboard /> }, 
      { path: "manageaccount", element: <ManageAccount /> }
    ]
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "errands", element: <Errands /> },
      { path: "runnermode", element: <RunnerMode /> },
      { path: "notification", element: <Notification /> },
      { path: "inbox", element: <Inbox /> },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
