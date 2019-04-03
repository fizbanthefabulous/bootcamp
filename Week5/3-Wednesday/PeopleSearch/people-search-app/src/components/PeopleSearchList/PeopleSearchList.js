import React from 'react';
import { connect } from 'react-redux';
import PersonEntry from './PersonEntry/PersonEntry';
import './PeopleSearchList.css';


const PeopleSearchList = (props) => {
    let people = props.peopleList.map((person, idx) => <PersonEntry person={person} key={idx} /> )
    return (
        <div className="list">
            <ul className="people">
                {people}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    peopleList: state.filteredPeople,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleSearchList);