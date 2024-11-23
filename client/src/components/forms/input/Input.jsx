import PropTypes from 'prop-types';
import * as S from './Input.styles';

function Input({
  name,
  value,
  updateValue,
  validation,
  label = name,
  type = 'text',
  optional,
}) {
  return (
    <S.Container>
      <S.Input
        id={name}
        name={name}
        value={value}
        onChange={updateValue}
        type={type}
        required={!optional}
        autoComplete="on"
      />
      <S.Label htmlFor={name}>{label}</S.Label>
      {!!validation.maxLength && (
        <S.DivMaxLength>
          {value.length} / {validation.maxLength}
        </S.DivMaxLength>
      )}
      {!validation.isValid && <S.Error>{validation.message}</S.Error>}
    </S.Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  optional: PropTypes.bool,
};

export default Input;
