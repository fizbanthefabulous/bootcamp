import React from 'react';
import { connect } from 'react-redux';
import { resetSearch, filterPeopleList } from '../../store/redux';
import './PeopleSearchForm.css';

class PeopleSearchForm extends React.Component {
    componentDidMount() {
        this.props.resetSearch();
    }

    handleChange= (event) => {
        console.log('searchString = ', event.target.value)
        this.props.filterPeople(event.target.value);
    }

    render() {
        return (
            <div className="searchPeople">
                <input id='searchString' type="text" onChange={(event) => this.handleChange(event)} placeholder='Enter a name to filter list'/> 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //Don't need anything from store
  })
  
  const mapDispatchToProps = (dispatch) => ({
    resetSearch: (id) => dispatch(resetSearch()),
    filterPeople: (searchString) => dispatch(filterPeopleList(searchString)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleSearchForm);