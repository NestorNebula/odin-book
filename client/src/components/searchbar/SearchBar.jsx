import { useState } from 'react';
import PropTypes from 'prop-types';
import { explore } from '@assets/icons';
import styled from 'styled-components';

const StyledSearchBar = styled.form``;

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <StyledSearchBar
      onSubmit={async (e) => {
        e.preventDefault();
        if (!value) return;
        await onSubmit({ value });
      }}
    >
      <img src={explore} alt="" />
      <input
        type="text"
        name="searchContent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        aria-label="search"
      />
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
