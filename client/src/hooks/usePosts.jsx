import { useState, useEffect } from 'react';
import { fetchAPI } from '@services';

const usePosts = ({ postsPath, fetchReposts }) => {
  const [posts, setPosts] = useState([]);
  const [reposts, setReposts] = useState(fetchReposts ? [] : null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(false);
  const updateAllPosts = () => setUpdateAll(!updateAll);

  const updatePost = (postId, post, deleted) => {
    deleted
      ? setPosts(posts.filter((p) => p.id !== postId))
      : setPosts(posts.map((p) => (p.id === postId ? post : p)));
  };

  const updateRepost = (postId, post, deleted, userId) => {
    deleted
      ? setReposts(
          reposts.filter((r) => r.postId !== postId || r.userId !== userId)
        )
      : setReposts(
          reposts.map((r) => (r.postId === postId ? { ...r, post } : r))
        );
  };

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
  }, [postsPath, fetchReposts, updateAll]);

  return {
    posts,
    reposts,
    updatePost,
    updateRepost,
    error,
    loading,
    updateAllPosts,
  };
};

export default usePosts;
