import { useState } from 'react';
import { file } from '@services';

const useFile = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  const updateFile = async (user, fileInput, type) => {
    if (user.loginMethod === 'GUEST') return;
    if (fileUrl) {
      const result = await removeFile(user, type);
      if (!result) return;
    }
    const fileToUpload = fileInput;
    if (!fileToUpload) return;
    const result = await file.upload({
      file: fileToUpload,
      type,
      userId: user.id,
    });
    if (result.error) {
      setError(result.error.msg);
      return;
    }
    setFileUrl(result.url);
    setError(null);
  };

  const removeFile = async (user, type) => {
    const result = await file.remove({
      url: fileUrl,
      type,
      userId: user.id,
    });
    if (result.error) {
      setError(result.error.msg);
      return false;
    }
    setFileUrl(null);
    setError(null);
    return true;
  };

  return { fileUrl, setFileUrl, error, updateFile, removeFile };
};

export default useFile;
