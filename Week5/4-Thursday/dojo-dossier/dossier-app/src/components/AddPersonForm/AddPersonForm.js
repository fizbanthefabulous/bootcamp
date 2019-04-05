import React from 'react';
import './AddPersonForm.css';
import { connect } from 'react-redux';
import { addPerson } from '../../store/redux';
import { addPersonToDB } from '../../utility/axios';

const AddPersonForm = (props) => {

    function addNewTab(event){
        console.log('Adding a new tab');
        let name = document.getElementById('person-name').value

        if(name.trim() !== '') {
            addPersonToDB(name)
            .then((person) => {
                console.log("Person",person);
                props.addPerson(person);
                document.getElementById('person-name').value = '';
            })
        }
        console.log("I finished now.");
    }

    return (
        <div className="dossier-add-person-row">
            <div className="dossier-add-person-col">
                <input type='text' name='personName' id='person-name' placeholder='Name' />
                <button className='btn btn-primary dossier-add-tab' onClick={(event) => addNewTab(event)}>Add New Tab</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    //Don't need anything from store
  })
  
  const mapDispatchToProps = (dispatch) => ({
    addPerson: (person) => dispatch(addPerson(person)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AddPersonForm)