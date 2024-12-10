import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Context } from '@context';
import { useDialog, useFile, useInformation, useUserData } from '@hooks';
import { Dialog } from '@components/elements';
import { PostForm } from '@components/forms';
import Navbar from './navbar/Navbar';
import { Error, Loading } from '@components';
import { fetchAPI } from '@services';
import { io } from 'socket.io-client';
import * as S from './Dashboard.styles';
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const { userId } = useLoaderData();
  const { userData, error, loading, updateUserData } = useUserData({ userId });
  const socket = io(API_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    withCredentials: true,
  });

  useEffect(() => {
    socket.on('notification', updateUserData);

    return () => {
      socket.off('notification', updateUserData);
    };
  });

  const { dialogRef, open, close } = useDialog();
  const [dialogOpened, setDialogOpened] = useState(false);
  const { information, updateInformation } = useInformation();
  const {
    fileUrl,
    setFileUrl,
    error: fileError,
    updateFile,
    removeFile,
  } = useFile();

  const submitPost = async ({ content, file }) => {
    const fetch = await fetchAPI({
      body: { content, file },
      method: 'POST',
      path: `users/${userData.id}/posts`,
    });
    if (fetch.error) {
      updateInformation({
        error: true,
        message: fetch.result.error
          ? fetch.result.error.msg
          : fetch.result.errors[0].msg,
      });
    } else {
      updateInformation({ error: null, message: 'Post created.' });
      setFileUrl(null);
      close();
    }
  };
  const openPostForm = async () => {
    open();
    setDialogOpened(true);
  };
  const closePostForm = async () => {
    if (fileUrl) {
      await removeFile(userData, 'photos');
    }
    close();
    setDialogOpened(false);
  };

  return error ? (
    <Error>Error when loading user data. {error}</Error>
  ) : loading ? (
    <Loading data="user data" />
  ) : (
    <Context.Provider
      value={{ user: userData, updateUser: updateUserData, updateInformation }}
    >
      <S.Dashboard>
        <Dialog.Main dialogRef={dialogRef} close={closePostForm}>
          <Dialog.Header>
            <Dialog.CloseButton close={closePostForm} />
          </Dialog.Header>
          {dialogOpened ? (
            <PostForm
              onSubmit={submitPost}
              fileUrl={fileUrl}
              error={fileError}
              updateFile={updateFile}
              removeFile={removeFile}
            />
          ) : (
            <></>
          )}
        </Dialog.Main>
        <Navbar openNewPost={openPostForm} />
        <Outlet />
        {!!information.message && (
          <S.Information>{information.message}</S.Information>
        )}
      </S.Dashboard>
    </Context.Provider>
  );
}

export default Dashboard;
