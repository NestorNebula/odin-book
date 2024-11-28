import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoading = styled.div``;

function Loading({ data }) {
  return <StyledLoading>Loading {data}...</StyledLoading>;
}

Loading.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Loading;
