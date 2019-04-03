import React from 'react';
import './AppContainer.css';
import PeopleSearchContainer from '../PeopleSearchContainer/PeopleSearchContainer';
import Profile from '../../components/Profile/Profile';
import { Route } from 'react-router-dom';

const AppContainer = (props) => {
    return (
        <div>
            <Route exact path='/' component={PeopleSearchContainer} />
            <Route path='/profile' component={Profile} />
        </div>
    )
}

export default AppContainer;