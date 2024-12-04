import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Context } from '@context';
import { useDialog, useInformation, useUserData } from '@hooks';
import { Dialog } from '@components/elements';
import { PostForm } from '@components/forms';
import Navbar from './navbar/Navbar';
import { Error, Loading } from '@components';
import { fetchAPI, file } from '@services';
import * as S from './Dashboard.styles';

function Dashboard() {
  const { userId } = useLoaderData();
  const { userData, error, loading, updateUserData } = useUserData({ userId });

  const { dialogRef, open, close } = useDialog();
  const [dialogOpened, setDialogOpened] = useState(false);
  const { information, updateInformation } = useInformation();
  const [fileUrl, setFileUrl] = useState(null);

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
      await file.remove({ url: fileUrl, type: 'photos', userId: userData.id });
      setFileUrl(null);
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
              setFileUrl={setFileUrl}
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
