import { redirect } from 'react-router-dom';
import { fetchAPI } from '@services/fetchAPI';

const dashboardLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/signin');
  const { result, error } = await fetchAPI({
    method: 'get',
    path: `users/${userId}`,
  });
  if (error) {
    localStorage.removeItem('id');
    return redirect('/signin');
  }

  return { userId: result.user.id };
};

export default dashboardLoader;
