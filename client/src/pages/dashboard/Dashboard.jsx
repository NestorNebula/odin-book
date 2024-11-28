import { Outlet, useLoaderData } from 'react-router-dom';
import { Context } from '@context';
import { useDialog, useUserData } from '@hooks';
import { Dialog } from '@components/elements';
import Navbar from './navbar/Navbar';
import { Error, Loading } from '@components';
import * as S from './Dashboard.styles';

function Dashboard() {
  const { userId } = useLoaderData();
  const { userData, error, loading, updateUserData } = useUserData({ userId });

  const { dialogRef, open, close } = useDialog();

  return error ? (
    <Error>Error when loading user data. {error}</Error>
  ) : loading ? (
    <Loading data="user data" />
  ) : (
    <Context.Provider value={{ user: userData }}>
      <S.Dashboard>
        <Dialog.Main dialogRef={dialogRef} close={close}></Dialog.Main>
        <Navbar updateUser={updateUserData} openNewPost={open} />
        <Outlet />
      </S.Dashboard>
    </Context.Provider>
  );
}

export default Dashboard;
