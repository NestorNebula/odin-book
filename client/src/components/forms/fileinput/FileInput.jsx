import PropTypes from 'prop-types';
import * as S from './FileInput.styles';

function FileInput({ onChange, image }) {
  return (
    <S.Container>
      <S.Label htmlFor="file">
        <img src={image} alt="upload image" />
      </S.Label>
      <S.Input
        id="file"
        name="file"
        type="file"
        value={''}
        multiple={false}
        accept="image/*"
        onChange={onChange}
      />
    </S.Container>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default FileInput;
