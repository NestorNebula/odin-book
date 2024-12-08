import App from '@/App';
import Home from '@pages/dashboard/home/Home';
import Explore from '@pages/dashboard/explore/Explore';
import Notifications from '@pages/dashboard/notifications/Notifications';
import Messages from '@pages/dashboard/messages/Messages';
import Bookmarks from '@pages/dashboard/bookmarks/Bookmarks';
import Profile from '@pages/dashboard/profile/Profile';
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
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'bookmarks',
        element: <Bookmarks />,
      },
      {
        path: '/:userId',
        element: <Profile />,
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
