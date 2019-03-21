import React, { Component } from 'react';
import Form from '../Form/Form';
import Display from '../Display/Display';
import axios from 'axios';
import './MovieData.css';

class MovieData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null
        }

        this.searchNotImdb = this.searchNotImdb.bind(this);
    }

    searchNotImdb = (props) => {
    //searchNotImdb(props) {
        console.log(props);
        

        //axios.get(`http://freemdb.com/api/v1/Movies?PageNumber=1&PageSize=20&Title=${props}`)
        axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=9681f08f&s=${props}`)
            .then((response) => {
                console.log(response);
                console.log(response.data.Search[0]);
                this.setState({
                    movie: response.data.Search[0],
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {

        console.log(this.state);
        return (
            <div className="movieData">
                <h1>Movie Data</h1>
                <Form searchFunc={this.searchNotImdb} />
                <Display movie={this.state.movie} />
            </div>
        );
    }
}

export default MovieData;
