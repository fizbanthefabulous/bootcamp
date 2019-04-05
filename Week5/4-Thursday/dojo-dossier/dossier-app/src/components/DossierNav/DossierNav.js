import React from 'react';
import './DossierNav.css';
import { connect } from 'react-redux';
import DossierTab from './DossierTab/DossierTab';

const DossierNav = (props) => {
    console.log("DossierNav people = ",props.people);
    const tabs = props.people.map((tab, idx) => <DossierTab person={tab} key={idx}/> )

    return (
        <div className='dossier-tabs'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tabs}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    people: state.people,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    //Don't need any actions
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(DossierNav)