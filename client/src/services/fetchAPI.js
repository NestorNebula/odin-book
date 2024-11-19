const getAPIUrl = () => {
  return import.meta.env.VITE_API_URL;
};

const getFetchOptions = (body, method) => {
  return {
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

const fetchAPI = async ({ body, method, path, statusOnly }) => {
  const response = await fetch(
    `${getAPIUrl()}/${path}`,
    getFetchOptions(body, method)
  );
  if (statusOnly) {
    return response.status >= 400
      ? { response, error: true }
      : { response, error: false };
  }
  const result = await response.json();
  return response.status >= 400
    ? { result, error: true }
    : { result, error: false };
};

export { fetchAPI };
