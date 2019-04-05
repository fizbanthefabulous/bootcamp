import React from 'react';
import './DossierTab.css';
import { connect } from 'react-redux';
import { viewProfile } from '../../../store/redux';

const DossierTab = (props) => {
    console.log("rendering");
    return (
        <li className="nav-item">
            <a className={`nav-link${props.profileToView === props.person.id ? ` active`: ``}`}
                onClick={() => props.viewProfile(props.person.id)}
                href="#"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected={props.profileToView === props.person.id}
                >
                {props.person.name}
            </a>
        </li>
    )
}

const mapStateToProps = (state) => ({
    profileToView: state.dossierToView,
})

const mapDispatchToProps = (dispatch) => ({
    viewProfile: (id) => dispatch(viewProfile(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DossierTab)