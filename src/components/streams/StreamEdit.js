import React from 'react';
import { connect } from 'react-redux';
import {fetchStream, editStream} from "../../actions";
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {

    componentDidMount() {
        // this is required in to handle the case of when user tries to access edit stream directly, that is the state is store is not loaded yet.
        // So needs to be designed to work in isolation, fetch its own data
        this.props.fetchStream(this.props.match.params.id);

    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.id, formValues)
    };

    render() {
        if(!this.props.stream) {
            return <div>Loading</div>
        } else {
            // initialValues is a special property part of redux form to pass values, the name of the fields when
            // they match the name of the Field in the form in StreamForm redux-form will know where to populate
            const {title, description} = this.props.stream;
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm initialValues={{title, description}} onSubmit={this.onSubmit}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    // ownProps gets props that component will be initialized with, in this case
    // because we are tracking browser history, we need to pull this out (note we get url info because this is being routed by react-router-dom
    // note need to navigate away from stream/edit/:id and back to page when testing
    // with React-Router each component needs to be designed to work in isolation (fetch its own data)

    return { stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchStream, editStream }) (StreamEdit);