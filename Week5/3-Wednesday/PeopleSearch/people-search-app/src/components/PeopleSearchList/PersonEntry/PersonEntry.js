import React from 'react';
import { connect } from 'react-redux';
import { viewProfile } from '../../../store/redux';

const PersonEntry = (props) => {
    console.log('PersonEntry props: ',props);
    return (
        <li>
            <span onClick={() => props.viewProfile(props.person.id)} >{props.person.name}</span>
        </li>
    )
}

const mapStateToProps = (state) => ({
    //Nothing needed from state
})

const mapDispatchToProps = (dispatch) => ({
    viewProfile: (id) => dispatch(viewProfile(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonEntry);