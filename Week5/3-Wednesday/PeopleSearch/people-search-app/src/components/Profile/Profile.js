import React from 'react';
import { connect } from 'react-redux';
import { clearRedirects } from '../../store/redux';
import { Link, Redirect } from 'react-router-dom';
import './Profile.css';


const Profile = (props) => {
    props.clearRedirects();

    return (
        <div>
            <div className="backLink">
                <Link to='/'>Back</Link>
            </div>

            {props.profile !== null ?
                <div className='profile'>
                    <h1>{props.profile.name}</h1>

                    <p>
                        City: {props.profile.city} <br />
                        Industry: {props.profile.industry} <br />
                        Hobbies: {props.profile.hobbies} <br />
                        Email: {props.profile.email} <br />
                    </p>
                </div>
                :
                <Redirect to='/' />
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profileToView,
})

const mapDispatchToProps = (dispatch) => ({
    clearRedirects: () => dispatch(clearRedirects()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);