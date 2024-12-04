import { useEffect, useState } from 'react';
import { fetchAPI } from '@services';

const useData = ({ path, dependencies = [] }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI({ method: 'get', path })
      .then((fetch) => {
        if (fetch.error) {
          throw new Error(fetch.result.error.msg);
        }
        setData(fetch.result);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { data, error, loading };
};

export default useData;
