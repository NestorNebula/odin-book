import { useState, useEffect } from 'react';
import { fetchAPI } from '@services';

const usePosts = ({ postsPath, fetchReposts }) => {
  const [posts, setPosts] = useState([]);
  const [reposts, setReposts] = useState(fetchReposts ? [] : null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI({ method: 'get', path: postsPath })
      .then((fetch) => {
        if (fetch.error) {
          throw new Error(fetch.result.error.msg);
        }
        setPosts(fetch.result.posts);
        setReposts(fetchReposts ? fetch.result.reposts : null);
        setError(null);
      })
      .catch((err) => {
        setError(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postsPath, fetchReposts]);

  return { posts, reposts, error, loading };
};

export default usePosts;
