import React from 'react';

const SurveyField = ({input, label, meta:{error, touched}}) => {
  const id = label.replace(/\s/g,'');
  return (
    <div className="row">
      <div className="input-field col s6">
        <i className="material-icons prefix">account_circle</i>
        <input {...input} id={id} className="validate" placeholder={label}/>
        <label htmlFor={id} data-error={touched && error}>{label}</label>
        <span className="red-text">{touched && error}</span>
      </div>
    </div>
  );
};

export default SurveyField;
