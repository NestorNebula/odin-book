import fetchAPI from './fetchAPI';

function postInteraction(userId) {
  const isGuest = !+userId;

  const post = async (postId, type) => {
    if (isGuest)
      return { success: false, msg: `Please log in to ${type.toLowerCase()}.` };
    const fetch = await fetchAPI({
      body: { type: type.toUpperCase() },
      method: 'POST',
      path: `posts/${postId}/interactions`,
    });
    if (fetch.error) return { success: false, msg: fetch.result.error.msg };
    const fetchPost = await fetchAPI({
      method: 'GET',
      path: `posts/${postId}`,
    });
    return {
      success: true,
      msg: `${type} posted.`,
      post: fetchPost.error ? null : fetchPost.result.post,
    };
  };

  const remove = async (postId, type) => {
    const fetch = await fetchAPI({
      body: { type: type.toUpperCase() },
      method: 'DELETE',
      path: `posts/${postId}/interactions`,
    });
    if (fetch.error) return { success: false, msg: fetch.result.error.msg };
    const fetchPost = await fetchAPI({
      method: 'GET',
      path: `posts/${postId}`,
    });
    return {
      success: true,
      msg: `${type} deleted.`,
      post: fetchPost.error ? null : fetchPost.result.post,
    };
  };

  const repost = async (postId) => {
    return await post(postId, 'Repost');
  };

  const undoRepost = async (postId) => {
    return await remove(postId, 'Repost');
  };

  const like = async (postId) => {
    return await post(postId, 'Like');
  };

  const unlike = async (postId) => {
    return await remove(postId, 'Like');
  };

  const bookmark = async (postId) => {
    return await post(postId, 'Bookmark');
  };

  const removeBookmark = async (postId) => {
    return await post(postId, 'Bookmark');
  };

  return { repost, undoRepost, like, unlike, bookmark, removeBookmark };
}

export default postInteraction;
