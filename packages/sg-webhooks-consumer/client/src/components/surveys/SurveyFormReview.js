import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from "../../actions";

import formFields from "./formFields";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = _.map(formFields,({label, name}) => {
    return (
      <div key={name} >
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Hello</h5>
      {reviewFields}
      <br/>
      <button
        className="yellow darken-3 btn-flat"
        onClick={onCancel} >
          Back
          <i className="material-icons right" >done</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right waves-effect white-text">
          Send Survey
          <i className="material-icons right" >email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {formValues: state.form.surveyForm.values};
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
