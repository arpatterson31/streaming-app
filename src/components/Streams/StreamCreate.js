import React from 'react';
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field 
          name="title" 
          component={this.renderInput} 
          label="Enter Title" 
        />
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Enter Description" 
        />
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
};

//redux form validate function needed to validate if user entered info in the fields correctly
const validate = (formValues) => {
  const errors = {}; // if returns empty then redux form believes the user entered everything correctly...property needs to match a name on field component

  if(!formValues.title) {
    // only run if the user did not enter a title 
    errors.title = 'A title is required';
  }

  if(!formValues.description) {
    // only run if the user did not enter a description
    errors.description = 'A description is required';
  }

  return errors;
}

export default reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);