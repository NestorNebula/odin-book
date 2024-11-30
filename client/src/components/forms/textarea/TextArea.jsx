import PropTypes from 'prop-types';
import * as S from './TextArea.styles';

function TextArea({
  name,
  placeholder = name,
  value,
  updateValue,
  validation,
}) {
  return (
    <S.Container>
      <S.TextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={updateValue}
      ></S.TextArea>
      {!validation.isValid && <S.Error>{validation.message}</S.Error>}
    </S.Container>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
};

export default TextArea;
