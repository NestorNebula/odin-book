import { useEffect, useState } from 'react';
import { fetchAPI } from '@services';

const useSearchData = (search) => {
  const [posts, setPosts] = useState(null);
  const updatePost = (post) => {
    if (!posts) return;
    setPosts(posts.map((p) => (p.id === post.id ? post : p)));
  };
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!search) {
      setPosts([]);
      setUsers([]);
      setError(null);
      setLoading(false);
    } else {
      const postsFetch = fetchAPI({
        method: 'GET',
        path: `posts?search=${encodeURIComponent(search)}`,
      });
      const usersFetch = fetchAPI({
        method: 'GET',
        path: `users?search=${encodeURIComponent(search)}`,
      });
      Promise.all([postsFetch, usersFetch])
        .then((datas) => {
          const pFetch = datas[0];
          const uFetch = datas[1];
          if (pFetch.error) throw new Error(pFetch.result.msg);
          if (uFetch.error) throw new Error(uFetch.result.error);
          setPosts(pFetch.result.posts);
          setUsers(uFetch.result.users);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search]);

  return { posts, updatePost, users, error, loading };
};

export default useSearchData;
