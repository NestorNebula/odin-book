import { useState } from 'react';
import { fetchAPI } from '@services';

const useAuth = (setInformation) => {
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState(null);

  const signUp = async ({ username, email, password }) => {
    const fetch = await fetchAPI({
      body: { username, email, password },
      method: 'post',
      path: 'auth/signup',
    });
    if (fetch.error) {
      setInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      setMethod('login');
      setInformation({
        error: null,
        message: 'Account created.',
      });
    }
  };

  const logIn = async ({ usermail, password }) => {
    const fetch = await fetchAPI({
      body: { username: usermail, password },
      method: 'post',
      path: 'auth/login',
    });
    if (fetch.error) {
      setInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      localStorage.setItem('id', fetch.result.id);
    }
    setDone(true);
  };

  const guest = async () => {
    const fetch = await fetchAPI({ method: 'get', path: 'auth/signin/guest' });
    if (fetch.error) {
      setInformation({
        error: true,
        message: 'Error during guest connection.',
      });
    } else {
      localStorage.setItem('id', fetch.result.id);
    }
    setDone(true);
  };

  const github = async () => {
    const fetch = await fetchAPI({
      method: 'get',
      path: 'auth/signin/github/success',
    });
    if (fetch.error) {
      setInformation({
        error: true,
        message: 'Error during GitHub connection.',
      });
    } else {
      localStorage.setItem('id', fetch.result.id);
    }
    setDone(true);
  };

  const methods = { signUp, logIn, guest, github };

  return { done, method, setMethod, methods };
};

export default useAuth;
