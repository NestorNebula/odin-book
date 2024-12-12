import fetchAPI from './fetchAPI';

const deletePost = async (postId, userId) => {
  return await fetchAPI({
    method: 'DELETE',
    path: `users/${userId}/posts/${postId}`,
  });
};

export default deletePost;
