import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut }from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        // since load via index.html via script tag, it will be available in window at runtime.
        // client:auth2, is to load the Oauth2 library, we pass callback function, so when ready we can perform operations
        window.gapi.load('client:auth2', () => {
            //initialize authentication client
            window.gapi.client.init({
                clientId: "260184423498-i8n9gemne05j316b7nfuffueqk21ctig.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        // action creator depending on state
        console.log(isSignedIn);
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

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
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);