import React from 'react';
import './DisplayContainer.css';
import DossierDisplay from '../../components/DossierDisplay/DossierDisplay';
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm';

const DisplayContainer = (props) => {
    return (
        <div className="display-container">
            <DossierDisplay />
            <AddNoteForm />
        </div>
    )
}

export default DisplayContainer;