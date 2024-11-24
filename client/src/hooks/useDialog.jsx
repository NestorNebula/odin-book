import { useRef } from 'react';

const useDialog = () => {
  const dialogRef = useRef();

  const open = () => dialogRef.current.showModal();

  const close = (cb) => {
    dialogRef.current.close();
    if (cb) cb();
  };

  return { dialogRef, open, close };
};

export default useDialog;
