import App from '@/App';
import Home from '@pages/dashboard/home/Home';
import Explore from '@pages/dashboard/explore/Explore';
import Notifications from '@pages/dashboard/notifications/Notifications';
import SignIn from '@pages/signin/SignIn';
import { dashboardLoader, signInLoader } from '@loaders';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: dashboardLoader,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
    loader: signInLoader,
  },
];

export default routes;
