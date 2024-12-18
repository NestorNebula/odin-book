import { useAuth, useDialog, useInformation } from '@hooks';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog } from '@components/elements';
import SignUpForm from './signupform/SignUpForm';
import LoginForm from './loginform/LoginForm';
import icon from '@assets/icons/icon.svg';
import * as S from './SignIn.styles';
import { theme } from '@styles';
import ghIcon from '@assets/icons/github.svg';
const API_URL = import.meta.env.VITE_API_URL;

function SignIn() {
  const { information, updateInformation } = useInformation();
  const { done, method, setMethod, methods } = useAuth(updateInformation);
  const { dialogRef, open, close } = useDialog();
  const updateMethod = (m, openForm) => {
    setMethod(m);
    openForm ? open() : close();
  };

  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') !== null;
  if (success && !done) {
    methods.github();
  }
  const fail = searchParams.get('fail') !== null;

  return (
    <S.SignIn>
      <title>Happening now / Odin-Book</title>
      {!!done && <Navigate to="/home" />}
      <Dialog.Main dialogRef={dialogRef} close={() => close(setMethod(null))}>
        {open ? (
          method === 'signup' ? (
            <>
              <Dialog.Header>
                <Dialog.CloseButton close={() => close(setMethod(null))} />
                <S.DialogHeaderContent>
                  <img src={icon} alt="" />
                  <div>Create your account</div>
                </S.DialogHeaderContent>
                <div></div>
              </Dialog.Header>
              <SignUpForm onSubmit={methods.signUp} />
            </>
          ) : method === 'login' ? (
            <>
              <Dialog.Header>
                <Dialog.CloseButton close={() => close(setMethod(null))} />
                <S.DialogHeaderContent>
                  <img src={icon} alt="" />
                  <div>Log In to Odin-Book</div>
                </S.DialogHeaderContent>
                <div></div>
              </Dialog.Header>
              <LoginForm onSubmit={methods.logIn} />
            </>
          ) : null
        ) : null}
        {(information.message || fail) && (
          <S.Information $error={information.error || fail}>
            {information.message && <div>{information.message}</div>}
            {fail && <div>Error during Github signin.</div>}
          </S.Information>
        )}
      </Dialog.Main>
      <S.Icon src={icon} alt="Odin-Book" />
      <S.Section>
        <S.SectionHeader>
          <div>Happening now</div>
          <div>Join today.</div>
        </S.SectionHeader>
        <S.Methods>
          <S.Method>
            <Button onClick={close}>
              <a href={`${API_URL}/auth/signin/github`}>
                <img src={ghIcon} alt="" />
                <div>Sign In with GitHub</div>
              </a>
            </Button>
          </S.Method>
          <S.Method>or</S.Method>
          <S.OtherMethods>
            <Button
              onClick={() => updateMethod('signup', true)}
              backgroundColor={theme.mainBlue}
              color={theme.mainWhite}
              noHover={true}
            >
              Create account
            </Button>
            <Button
              onClick={() => updateMethod('login', true)}
              backgroundColor={theme.mainBlue}
              color={theme.mainWhite}
              noHover={true}
            >
              Log In
            </Button>
            <Button
              onClick={async () => {
                updateMethod('guest', false);
                await methods.guest();
              }}
              backgroundColor={theme.black}
              color={theme.mainBlue}
              noHover={true}
            >
              Sign In as Guest
            </Button>
          </S.OtherMethods>
        </S.Methods>
      </S.Section>
      {(information.message || fail) && (
        <S.Information $error={information.error || fail}>
          {information.message && <div>{information.message}</div>}
          {fail && <div>Error during Github signin.</div>}
        </S.Information>
      )}
    </S.SignIn>
  );
}

export default SignIn;
