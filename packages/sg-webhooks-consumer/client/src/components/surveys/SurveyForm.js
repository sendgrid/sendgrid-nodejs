import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field }  from "redux-form";
import { Link } from 'react-router-dom';
import SurveyField from "./SurveyField";
import formFields from "./formFields";
import validateEmails from "../../utils/validateEmails";

class SurveyForm extends Component {
    renderFields() {
        return (_.map(formFields,({label, name}) => <Field label={label} name={name} key={name} type="text" component={SurveyField}></Field>));
    }
    render(){
      return (
        <div className="row">
          <form className="col s12" onSubmit={this.props.handleSubmit((values) =>
            this.props.onSurveySubmit(values))}>
            {this.renderFields()}
            <div className="row">
              <div className="input-field col s3">
                <Link to="/surveys" className="red btn-flat white-text">
                Cancel
                <i className="material-icons right">cancel</i>
              </Link>
            </div>
            <div className="input-field col s3">
              <button type="submit" className="teal btn-flat right waves-effect white-text">
                Next
                <i className="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
        </div>
      );
    }
};

const validate = (values) => {
    const errors = {};
    _.each(formFields,({name}) => {
        if(!values[name]){
            errors[name] = `You must provide ${name}`;
        }
    });
    if(!errors.recipients){
        errors.recipients = validateEmails(values.recipients);
    }
    return errors;
}

export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form: 'surveyForm'
})(SurveyForm);
    
