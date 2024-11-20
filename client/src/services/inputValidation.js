function inputValidation(inputValue, inputName) {
  let value = inputValue;
  const name = inputName;
  let success = true;
  let message = '';

  const setError = (msg) => {
    success = false;
    message += msg;
  };

  const minLength = (min, startsWithVowel) => {
    if (value.length < min) {
      setError(
        value.length === 0
          ? `Please enter ${startsWithVowel ? 'an' : 'a'} ${name}`
          : `${name} must have at least ${min} characters. `
      );
    }
    return this;
  };

  const maxLength = (max) => {
    if (value.length > max) {
      setError(`${name} cannot exceed ${max} characters. `);
    }
    return this;
  };

  const format = (regex, example) => {
    const result = regex.test(value);
    if (!result) {
      setError(
        `Wrong ${name.toLowerCase()} format. ${
          example && `Example: ${example} `
        }`
      );
    }
    return this;
  };

  const setLowerCase = () => {
    value = value.toLowerCase();
    return this;
  };

  const result = () => {
    return { success, value, message };
  };

  return {
    minLength,
    maxLength,
    format,
    setLowerCase,
    result,
  };
}

export default inputValidation;
