import PropTypes, { node } from 'prop-types';
import styled from 'styled-components';

const StyledAuthenticationForm = styled.form``;

function AuthenticationForm({ onSubmit, children }) {
  return (
    <StyledAuthenticationForm onSubmit={onSubmit}>
      {children}
    </StyledAuthenticationForm>
  );
}

AuthenticationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(node),
};

export default AuthenticationForm;
