import { useState } from 'react';
import { fetchAPI } from '@services';

const useAuth = () => {
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState(null);
  const [errors, setErrors] = useState([]);

  const signUp = async ({ username, email, password }) => {
    const fetch = await fetchAPI({
      body: { username, email, password },
      method: 'post',
      path: 'auth/signup',
    });
    if (fetch.error) {
      setErrors(
        fetch.result.error ? [fetch.result.error] : fetch.result.errors
      );
    } else {
      setMethod('login');
    }
  };

  const logIn = async ({ usermail, password }) => {
    const fetch = await fetchAPI({
      body: { username: usermail, password },
      method: 'post',
      path: 'auth/login',
    });
    if (fetch.error) {
      setErrors(
        fetch.result.error ? [fetch.result.error] : fetch.result.errors
      );
    } else {
      localStorage.setItem('id', fetch.result.id);
      setDone(true);
    }
  };

  const guest = async () => {
    const fetch = await fetchAPI({ method: 'get', path: 'auth/signin/guest' });
    if (fetch.error) {
      setErrors(fetch.result.error);
    } else {
      localStorage.setItem('id', fetch.result.id);
      setDone(true);
    }
  };

  const github = async () => {
    const fetch = await fetchAPI({
      method: 'get',
      path: 'auth/signin/github/success',
    });
    if (fetch.error) {
      setErrors(fetch.result.error);
    } else {
      localStorage.setItem('id', fetch.result.id);
      setDone(true);
    }
  };

  const methods = { signUp, logIn, guest, github };

  return { done, method, setMethod, errors, methods };
};

export default useAuth;
