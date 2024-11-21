function inputValidation(inputValue, inputName) {
  let value = inputValue;
  const name = inputName;
  let success = true;
  let message = '';

  function setError(msg) {
    success = false;
    message += msg;
  }

  function minLength(min) {
    if (value.length < min) {
      setError(
        value.length === 0
          ? `Please enter a ${name}`
          : `${name} must have at least ${min} characters. `
      );
    }
    return this;
  }

  function maxLength(max) {
    if (value.length > max) {
      setError(`${name} cannot exceed ${max} characters. `);
    }
    return this;
  }

  function format(regex, example) {
    const result = regex.test(value);
    if (!result) {
      setError(
        `Wrong ${name.toLowerCase()} format. ${
          example && `Example: ${example} `
        }`
      );
    }
    return this;
  }

  function setLowerCase() {
    value = value.toLowerCase();
    return this;
  }

  function result() {
    return { success, value, message };
  }

  return {
    minLength,
    maxLength,
    format,
    setLowerCase,
    result,
  };
}

export default inputValidation;
