import { useState } from 'react';
import PropTypes from 'prop-types';
import { explore } from '@assets/icons';
import styled from 'styled-components';

const StyledSearchBar = styled.form`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  border-radius: 5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.mainGray};

  &:focus {
    color: white;
  }

  & > img {
    width: 2rem;
    filter: brightness(0) saturate(100%) invert(48%) sepia(2%) saturate(876%)
      hue-rotate(162deg) brightness(95%) contrast(92%);
  }

  &:focus-within {
    outline: ${(props) => `1px solid ${props.theme.mainBlue}`};
  }

  &:focus-within > img {
    filter: brightness(0) saturate(100%) invert(74%) sepia(68%) saturate(6642%)
      hue-rotate(182deg) brightness(103%) contrast(88%);
  }

  & > input {
    border: none;
    outline: none;

    width: 100%;
  }
`;

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  return (
    <StyledSearchBar
      onSubmit={async (e) => {
        e.preventDefault();
        if (!value) return;
        await onSubmit({ value });
        setValue('');
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
        autoComplete="off"
      />
    </StyledSearchBar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
