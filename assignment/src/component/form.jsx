import React,{useState} from 'react'
import useFormValidate from './useValidateField.js'
function Form({fields}) {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
  };

  const validateForm = () => {
    const newFormErrors = {};
    fields.forEach((field, index) => {
      const error = useFormValidate(formData[`field-${index}`], field.min, field.max);
      newFormErrors[`field-${index}`] = error;
    });
    return newFormErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = validateForm();
    setFormErrors(newFormErrors);
    const hasErrors = Object.values(newFormErrors).some(error => error !== '');
    if (!hasErrors) {
      console.log('Form Data:', formData);
    } else {
      console.log('Form has validation errors:', newFormErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    {fields.map((field, index) => (
      <div key={index}>
        {field.type === 'text' && (
          <input
            type="text"
            name={`field-${index}`}
            value={formData[`field-${index}`] || ''}
            onChange={(e) => handleInputChange(e, field)}
          />
        )}
        {field.type === 'number' && (
          <input
            type="number"
            name={`field-${index}`}
            value={formData[`field-${index}`] || ''}
            onChange={(e) => handleInputChange(e, field)}
          />
        )}
        {field.type === 'checkbox' && field.mode === 'single' && (
          <label>
            {field.label}
          <input
            type="checkbox"
            name={`field-${index}`}
            checked={formData[`field-${index}`] || false}
            onChange={(e) => handleInputChange(e, field)}
          />
          </label>
        )}
        {field.type === 'checkbox' && field.mode === 'group' && (
          <div>
            <div>{field.label}</div>
            {field.groupLabel.map((label, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  name={`field-${index}-${idx}`}
                  checked={formData[`field-${index}-${idx}`] || false}
                  onChange={(e) => handleInputChange(e, field)}
                />
                {label}
              </label>
            ))}
          </div>
        )}
        {field.type === 'select' && (
          <select
            name={`field-${index}`}
            value={formData[`field-${index}`] || ''}
            onChange={(e) => handleInputChange(e, field)}
          >
            <option value="">Select</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {formErrors[`field-${index}`] && <span className="error">{formErrors[`field-${index}`]}</span>}
      </div>
    ))}
    <button type="submit">Submit</button>
  </form>  )
}

export default Form