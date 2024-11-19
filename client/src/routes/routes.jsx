import App from '@/App';
import Dashboard from '@pages/dashboard/Dashboard';
import SignIn from '@pages/signin/SignIn';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
