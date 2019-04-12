import React from 'react';
import './AddAuthor.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addAuthor} from '../../store/redux';

class AddAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            canSubmit: false,
        }
    }

    validateInput = () => {
        let canSubmit = false;

        if (this.state.author.trim().length > 2)
            canSubmit = true;

        this.setState({
            canSubmit,
        })
    }

    handleChange = (event) => {
        this.setState({
            author: event.target.value,
        }, () => this.validateInput())
    }


    addAuthor = (event) => {
        event.preventDefault();
        console.log('Adding an author');
        this.props.send('add-author', {name: document.getElementById('name').value});
        this.props.history.push("/");
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <Link to='/'>Home</Link>
                <br />
                <span>Add a new quotable author:</span>
                <br />
                <form className='add-form' onSubmit={(event) => this.addAuthor(event)}>
                    <label htmlFor='name'>Name:</label>
                    <br />
                    <input type='text' id='name' name='name' onChange={(event) => this.handleChange(event)} />
                    {!this.state.canSubmit ?
                        <small id="nameErr" className="form-text">Name must be at least three characters long.</small>
                        :
                        <small>{/*Holding space for formating reasons*/}</small>
                    }
                    <Link to='/' className='btn btn-primary add-form-btn'>Cancel</Link>
                    <button disabled={!this.state.canSubmit} className='btn btn-primary add-form-btn'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
})

const mapDispatchToProps = (dispatch) => ({
    addAuthor: (name) => dispatch(addAuthor(name)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAuthor);