import PropTypes, { node } from 'prop-types';
import styled from 'styled-components';

const StyledAuthenticationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2.5rem 7.5rem;
  font-size: 1.75rem;
  width: clamp(400px, 50vw, 600px);
`;

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
