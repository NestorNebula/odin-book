import Dashboard from '@pages/dashboard/Dashboard';
import { Navigate, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const { pathname } = useLocation();
  return pathname === '/' ? <Navigate to={'/home'} /> : <Dashboard />;
}

export default App;
