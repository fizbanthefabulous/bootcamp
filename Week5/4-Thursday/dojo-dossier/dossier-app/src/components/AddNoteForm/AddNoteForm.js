import React from 'react';
import './AddNoteForm.css';
import { addNoteToPerson} from '../../utility/axios';
import { updatePeople } from '../../store/redux';
import { connect } from 'react-redux';

const AddNoteForm = (props) => {
    let person = (props.people.length > 0 ? props.people[props.people.findIndex((person) => { return person.id === props.dossierToView })] : null)
    
    function addNewNote(event){
        console.log('Adding a new note');
        let note = document.getElementById('note').value

        if(note.trim() !== '') {
            addNoteToPerson(person, note)
            .then((people) => {
                console.log("People",people);
                props.updatePeople(people);
                document.getElementById('note').value = '';
            })
        }
        console.log("I finished now.");
    }


    return (
        <div className="dossier-add-note-row">
                <input type='text' name='personName' id='note' placeholder='Add a Note' />
                <button className='btn btn-primary dossier-add-tab' disabled={person === null} onClick={(event) => addNewNote(event)}>Add New Note</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    people: state.people,
    dossierToView: state.dossierToView,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    updatePeople: (people) => dispatch(updatePeople(people)),
  })

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AddNoteForm);