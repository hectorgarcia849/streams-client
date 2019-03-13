import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

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
        // destructured from formProps -- formProps.input
        console.log(meta);
        const className = `field ${meta.error && meta.touched? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);

    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    // checks if form is valid, define errors for each field.
    // If error, occurs it is sent back to renderInput via meta

    let errors = {};

    if(!formValues.title) {
        errors.title =  'Please Enter a Title!';
    }

    if(!formValues.description) {
        errors.description =  'Please Enter a Description!';
    }

    return errors;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
