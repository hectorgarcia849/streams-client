import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut }from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        // since load via index.html via script tag, it will be available in window at runtime.
        // client:auth2, is to load the Oauth2 library, we pass callback function, so when ready we can perform operations
        // google library is very lean, and loads up the stated functionality
        window.gapi.load('client:auth2', () => {
            //initialize authentication client
            window.gapi.client.init({
                clientId: "260184423498-i8n9gemne05j316b7nfuffueqk21ctig.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // first check if user isSignedIn (ensures we move on from initial null state)
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        // action creator depending on state
        console.log(isSignedIn);
        if (isSignedIn) {
            let userId = this.auth.currentUser.get().getId();
            this.props.signIn(userId);
        } else {
            this.props.signOut();
        }
    };


    // with these action creators we can update the state in the store

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    // we load in the current state of auth.isSignedIn from redux store
    return { isSignedIn: state.auth.isSignedIn };
};

// props gets selected state attributes and maps them to prop, action creators as functions
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);