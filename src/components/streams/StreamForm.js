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
        // destructured from formProps -- formProps.input, the label variable is passed from Field
        console.log(meta);
        const className = `field ${meta.error && meta.touched? 'error' : ''}`;

        // note below <input {...input} /> this takes all of the key value pairs adds them as props
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        // parent defines onSubmit, it is passed down
        this.props.onSubmit(formValues);
    };

    render() {
        // name will be the property that the Field component will manage.  A field must contain a form control to know what to display.
        //
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
    // checks if form is valid, define errors for each field, errors properties must match names in Field Components.
    // If error, it is sent via meta, this is passed down into renderInput
    // should be defined outside of component class

    let errors = {};

    if(!formValues.title) {
        errors.title =  'Please Enter a Title!';
    }

    if(!formValues.description) {
        errors.description =  'Please Enter a Description!';
    }

    return errors;
};

// reduxForm helper injects many action creators typically associated with forms (see redux-form documentation), this includes handleSubmit.
// it becomes available in our prop
// redux store will have a parent 'form' in there store form implementations.  form > streamForm
export default reduxForm({ form: 'streamForm', validate })(StreamForm);
