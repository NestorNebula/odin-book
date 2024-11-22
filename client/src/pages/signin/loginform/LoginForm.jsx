import { validationChains } from '@services';
import { useInput } from '@hooks';
import { AuthenticationForm, Button, Input } from '@components/forms';
import PropTypes from 'prop-types';

function LoginForm({ onSubmit }) {
  const {
    value: usermail,
    updateValue: updateUsermail,
    validation: usermailValidation,
  } = useInput({ validate: validationChains.usermail });
  const {
    value: password,
    updateValue: updatePassword,
    validation: passwordValidation,
  } = useInput({ validate: validationChains.password });
  const values = [usermail, password];
  const validations = [usermailValidation, passwordValidation];
  const formIsValid =
    values.every((v) => !!v) && validations.every((v) => v.isValid);
  return (
    <AuthenticationForm onSubmit={onSubmit}>
      <Input
        name="usermail"
        value={usermail}
        updateValue={updateUsermail}
        validation={usermailValidation}
        label="Username/Email"
      />
      <Input
        name="password"
        value={password}
        updateValue={updatePassword}
        validation={passwordValidation}
        type="password"
      />
      <Button type={formIsValid ? 'submit' : 'button'}>Log In</Button>
    </AuthenticationForm>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
