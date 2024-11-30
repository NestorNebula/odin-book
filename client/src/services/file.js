import fetchAPI from './fetchAPI';

const toB64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(false);
  });
};

const upload = async ({ file, type, userId }) => {
  const fileName = file.name;
  const formattedFile = await toB64(file);
  if (!formattedFile) {
    return { error: { msg: 'Error when formatting file.' } };
  }
  const fetch = await fetchAPI({
    body: { file: formattedFile, fileName, type },
    method: 'POST',
    path: `users/${userId}/images`,
  });
  if (fetch.error) {
    return { error: fetch.result.error };
  }
  return { url: fetch.result.url };
};

const remove = async ({ url, type, userId }) => {
  const fetch = await fetchAPI({
    body: { url, type },
    method: 'DELETE',
    path: `users/${userId}/images`,
    statusOnly: true,
  });
  if (fetch.error) {
    return { error: fetch.response.error };
  }
  return { error: null };
};

export { upload, remove };
