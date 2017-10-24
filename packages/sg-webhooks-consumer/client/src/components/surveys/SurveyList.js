import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  fetchSurveys
} from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderContent() {
    return this.props.surveys.map(survey => {
      return (
        <div className="card" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.heading}</p>
            <p className="right">Sent on {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-action">
            <a>Yes : {survey.yes}</a>
            <a>No : {survey.no}</a>
          </div>
        </div>
      );
    })
  }
  render() {
    return (
      <div> {this.renderContent()} </div>
    );
  }
};

const mapStateToProps = ({
  surveys
}) => {
  return {
    surveys
  };
}
export default connect(mapStateToProps, {
  fetchSurveys
})(SurveyList);
