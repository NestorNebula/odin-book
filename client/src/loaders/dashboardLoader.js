import { redirect } from 'react-router-dom';

const dashboardLoader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) return redirect('/signin');
  return { userId };
};

export default dashboardLoader;
