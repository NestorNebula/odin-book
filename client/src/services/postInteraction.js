import fetchAPI from './fetchAPI';

function createStructure(userId) {
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
      post: fetchPost.error ? null : fetchPost.result.post.main,
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
      post: fetchPost.error ? null : fetchPost.result.post.main,
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
    return await remove(postId, 'Bookmark');
  };

  return { repost, undoRepost, like, unlike, bookmark, removeBookmark };
}
const doInteraction = async ({ structure, interaction, postId, remove }) => {
  if (interaction === 'REPOST') {
    return remove
      ? await structure.undoRepost(postId)
      : await structure.repost(postId);
  } else if (interaction === 'LIKE') {
    return remove
      ? await structure.unlike(postId)
      : await structure.like(postId);
  } else if (interaction === 'BOOKMARK') {
    return remove
      ? await structure.removeBookmark(postId)
      : await structure.bookmark(postId);
  }
};

const interact = async ({ structure, interaction, postId, remove }) => {
  const result = await doInteraction({
    structure,
    interaction,
    postId,
    remove,
  });
  return result;
};

export { createStructure, interact };
