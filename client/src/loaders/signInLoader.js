import { redirect } from 'react-router-dom';

const signInLoader = async () => {
  return localStorage.getItem('id') ? redirect('/home') : null;
};

export default signInLoader;
