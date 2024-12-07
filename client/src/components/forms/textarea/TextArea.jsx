import PropTypes from 'prop-types';
import * as S from './TextArea.styles';

function TextArea({
  name,
  placeholder = name,
  value,
  updateValue,
  validation,
  label,
  maxLength,
}) {
  return (
    <S.Container>
      {label && <label htmlFor={name}>{label}</label>}
      <S.TextArea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={updateValue}
      ></S.TextArea>
      {!!maxLength && (
        <S.MaxLength>
          {value.length} / {maxLength}
        </S.MaxLength>
      )}
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
  label: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextArea;
