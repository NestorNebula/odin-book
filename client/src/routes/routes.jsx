import App from '@/App';
import Dashboard from '@pages/dashboard/Dashboard';
import SignIn from '@pages/signin/SignIn';
import { dashboardLoader, signInLoader } from '@loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: '/signin',
        element: <SignIn />,
        loader: signInLoader,
      },
    ],
  },
];

export default routes;
