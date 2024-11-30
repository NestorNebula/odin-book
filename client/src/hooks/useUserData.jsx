import { useEffect, useState } from 'react';
import { defaultContext } from '@context';
import { fetchAPI } from '@services';

const useUserData = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const updateUserData = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    if (+userId === 0) {
      setUserData(defaultContext.user);
      setError(false);
      setLoading(false);
    } else {
      fetchAPI({ method: 'get', path: `users/${userId}` })
        .then((fetch) => {
          if (fetch.error) {
            throw new Error(fetch.result.msg);
          } else {
            setUserData(fetch.result.user);
            setError(false);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId, update]);

  return { userData, error, loading, updateUserData };
};

export default useUserData;
