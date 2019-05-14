import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'; //
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {

    // exact keyword makes the set component field(s) are shown
    // if not exact used, then if path in the list of routes is in the current path, it will render
    // note in react you never want to use anchor tags because it will reload the page.  Instead, use Link from react-router-dom lib.
    // a plain router is used b/c programmatic navigation requires access to ref to history

    // Header is always visible, no route listed, it contains Links so it must be child of Router.

    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams" exact component={StreamList}/>
                        <Route path="/streams/new" exact component={StreamCreate}/>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                        <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                        <Route path="/streams/:id" exact component={StreamShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;