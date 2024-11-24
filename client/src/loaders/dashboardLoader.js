import { redirect } from 'react-router-dom';
import { fetchAPI } from '@services';
import { defaultContext } from '@context';

const dashboardLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/signin');
  if (userId === '0') return { user: defaultContext };
  const { result, error } = await fetchAPI({
    method: 'get',
    path: `users/${userId}`,
  });
  if (error) {
    localStorage.removeItem('id');
    return redirect('/signin');
  }

  return { user: result.user };
};

export default dashboardLoader;
