import React from 'react';
import './AppContainer.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path='/' component={Home} />
                </BrowserRouter>
            </div>
        )
    }
}

export default AppContainer;