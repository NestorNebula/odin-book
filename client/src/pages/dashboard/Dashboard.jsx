import { Outlet, useLoaderData } from 'react-router-dom';
import { Context } from '@context';
import { useDialog, useInformation, useUserData } from '@hooks';
import { Dialog } from '@components/elements';
import { PostForm } from '@components/forms';
import Navbar from './navbar/Navbar';
import { Error, Loading } from '@components';
import { fetchAPI } from '@services';
import * as S from './Dashboard.styles';

function Dashboard() {
  const { userId } = useLoaderData();
  const { userData, error, loading, updateUserData } = useUserData({ userId });

  const { dialogRef, open, close } = useDialog();
  const { information, updateInformation } = useInformation();

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
      updateUserData();
      close();
    }
  };

  return error ? (
    <Error>Error when loading user data. {error}</Error>
  ) : loading ? (
    <Loading data="user data" />
  ) : (
    <Context.Provider value={{ user: userData }}>
      <S.Dashboard>
        <Dialog.Main dialogRef={dialogRef} close={close}>
          <Dialog.Header>
            <Dialog.CloseButton close={close} />
          </Dialog.Header>
          <PostForm onSubmit={submitPost} />
        </Dialog.Main>
        <Navbar updateUser={updateUserData} openNewPost={open} />
        <Outlet />
        {!!information.message && (
          <S.Information>{information.message}</S.Information>
        )}
      </S.Dashboard>
    </Context.Provider>
  );
}

export default Dashboard;
