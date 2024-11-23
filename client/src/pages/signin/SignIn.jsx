import { useAuth, useDialog } from '@hooks';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog } from '@components/elements';
import SignUpForm from './signupform/SignUpForm';
import LoginForm from './loginform/LoginForm';
import icon from '@assets/icons/icon.svg';
import * as S from './SignIn.styles';
import ghIcon from '@assets/icons/github.svg';
const API_URL = import.meta.env.VITE_API_URL;

function SignIn() {
  const { done, method, setMethod, errors, methods } = useAuth();
  const { dialogRef, open, close } = useDialog();
  const updateMethod = (m, openForm) => {
    setMethod(m);
    openForm ? open() : close();
  };

  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') !== null;
  if (success || !done) {
    methods.github();
  }
  const fail = searchParams.get('fail') !== null;

  return (
    <S.SignIn>
      {!!done && <Navigate to="/" />}
      <Dialog.Main dialogRef={dialogRef}>
        {open ? (
          method === 'signup' ? (
            <>
              <Dialog.Header>
                <Dialog.CloseButton close={close} />
                <div>
                  <img src={icon} alt="" />
                  <div>Create your account</div>
                  <div></div>
                </div>
              </Dialog.Header>
              <SignUpForm onSubmit={methods.signUp} />
            </>
          ) : method === 'login' ? (
            <>
              <Dialog.Header>
                <Dialog.CloseButton close={close} />
                <div>
                  <img src={icon} alt="" />
                  <div>Log In to Odin-Book</div>
                  <div></div>
                </div>
              </Dialog.Header>
              <LoginForm onSubmit={methods.logIn} />
            </>
          ) : null
        ) : null}
      </Dialog.Main>
      <S.Icon src={icon} alt="Odin-Book" />
      <S.Section>
        <S.SectionHeader>
          <div>Happening now</div>
          <div>Join today.</div>
        </S.SectionHeader>
        <S.Methods>
          <div>
            <Button onClick={close}>
              <a href={`${API_URL}/auth/signin/github`}>
                <img src={ghIcon} alt="" />
                <div>Sign In with GitHub</div>
              </a>
            </Button>
          </div>
          <div>or</div>
          <div>
            <Button onClick={() => updateMethod('signup', true)}>
              Create account
            </Button>
            <Button onClick={() => updateMethod('login', true)}>Log In</Button>
            <Button onClick={() => updateMethod('guest', false)}>
              Sign In as Guest
            </Button>
          </div>
        </S.Methods>
      </S.Section>
      {(!!errors.length || fail) && (
        <S.Errors>
          <>
            {errors.map((e) => (
              <div key={e.msg}>{e.msg}</div>
            ))}
            {fail && <div>Error during Github signin.</div>}
          </>
        </S.Errors>
      )}
    </S.SignIn>
  );
}

export default SignIn;
