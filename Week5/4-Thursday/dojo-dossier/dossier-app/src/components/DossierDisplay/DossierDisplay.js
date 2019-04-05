import React from 'react';
import './DossierDisplay.css';
import { connect } from 'react-redux';

const DossierDisplay = (props) => {
    let dossier = props.people[props.people.findIndex((person) => { return person.id === props.dossierToDisplay })];
    let notes = [];
    
    if(dossier)
        notes = dossier.notes.map((note, idx) => <li key="idx">{note}</li>);

    console.log("Dossier", dossier);

    return (
        <div>
            <div className="tab-content dossier-display" id="myTabContent">
                {dossier !== undefined ?
                    <div className="tab-pane fade show active" id={dossier.id} role="tabpanel">
                        <ul>
                            {notes}
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    people: state.people,
    dossierToDisplay: state.dossierToView,
})

const mapDispatchToProps = (dispatch) => ({
    //Don't need any actions
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DossierDisplay);