import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const StyledLoading = styled.div`
  place-self: center;
  font-size: 2rem;
  padding: 1rem;
  animation: ${loadingAnimation} 0.5s ease-out alternate infinite;
`;

function Loading({ data }) {
  return <StyledLoading>Loading {data}...</StyledLoading>;
}

Loading.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Loading;
