import { useEffect, useState } from 'react';

const useInformation = () => {
  const [information, setInformation] = useState({ error: null, message: '' });
  const updateInformation = ({ error = null, message = '' }) => {
    setInformation({ error, message });
  };

  useEffect(() => {
    if (!information.error && !information.message) return;
    const timeout = setTimeout(() => {
      setInformation({ error: null, message: '' });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [information]);

  return { information, updateInformation };
};

export default useInformation;
