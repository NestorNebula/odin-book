import { useRef } from 'react';

const useDialog = () => {
  const dialogRef = useRef();

  const open = () => dialogRef.current.showModal();

  const close = () => {
    dialogRef.current.close();
  };

  return { dialogRef, open, close };
};

export default useDialog;
