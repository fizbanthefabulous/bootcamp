import React from 'react';
import './AppContainer.css';
import AddPersonForm from '../../components/AddPersonForm/AddPersonForm';
import DossierNav from '../../components/DossierNav/DossierNav';
import { connect } from 'react-redux';
import { getAllPeople } from '../../utility/axios';
import { initState } from '../../store/redux';
import DisplayContainer from '../DisplayContainer/DisplayContainer';

class AppContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: null,
        }
    }

    componentDidMount(){
        getAllPeople()
        .then((people) => {
            console.log("Initing State with = ",people)
            this.props.initState(people);
        })
    }

    render() {
        console.log("Rendering Container!")
        return (
            <div className="app-container">
                <h1>Dojo Dossier</h1>
                <AddPersonForm />
                <DossierNav />
                <DisplayContainer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    people: state.people,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    initState: (people) => dispatch(initState(people)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(AppContainer)