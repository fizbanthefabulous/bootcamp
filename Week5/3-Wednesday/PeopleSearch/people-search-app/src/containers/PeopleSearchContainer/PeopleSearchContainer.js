import React from 'react';
import PeopleSearchForm from '../../components/PeopleSearchForm/PeopleSearchForm';
import PeopleSearchList from '../../components/PeopleSearchList/PeopleSearchList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PeopleSearchContainer = (props) => {
    return (props.redirectToProfile ?
        <Redirect to='/profile' />
        :
        <div>
            <PeopleSearchForm />
            <PeopleSearchList />
        </div>
    )
}

const mapStateToProps = (state) => ({
    redirectToProfile: state.redirectToProfile,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleSearchContainer);