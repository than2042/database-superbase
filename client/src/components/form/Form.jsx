import { useState } from "react";

const Form = ({ handleSubmit, fields, btnText, handleChange, formData }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    fields.forEach((field) => {
      if (field.rules && field.rules.required && !formData[field.name]) {
        errors[field.name] = field.rules.required;
      } else if (
        field.rules &&
        field.rules.pattern &&
        !field.rules.pattern.value.test(formData[field.name])
      ) {
        errors[field] = field.rules.pattern.message;
      } else {
        errors[field.name] = "";
      }
    });

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmitWValidation = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleSubmit(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitWValidation}>
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              value={formData}
              onChange={handleChange}
              placeholder={field.name}
            />
            <p style={{ color: "red" }}>{formErrors[field.name]}</p>
          </div>
        ))}
        <button type="submit">{btnText || "Submit"}</button>
      </form>
    </div>
  );
};

export default Form;
