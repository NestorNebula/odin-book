import { useState } from 'react';

const useInput = ({ initialValue, validate }) => {
  const [value, setValue] = useState(initialValue || '');
  const [validation, setValidation] = useState({ isValid: true });

  const updateValue = (e) => {
    const { success: preSuccess, value: preUpdatedValue } = validate.before(
      e.target.value
    );
    if (!preSuccess) return;
    setValue(preUpdatedValue);
    const { success, message } = validate.after(preUpdatedValue);
    setValidation(success ? { isValid: true } : { isValid: false, message });
  };

  return { value, validation, updateValue };
};

export default useInput;
