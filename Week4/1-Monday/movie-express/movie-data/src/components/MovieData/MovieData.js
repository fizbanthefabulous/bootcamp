import React, { Component } from 'react';
import Form from '../Form/Form';
import Display from '../Display/Display';
import axios from 'axios';
import './MovieData.css';

class MovieData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            history: []
        }

        this.searchNotImdb = this.searchNotImdb.bind(this);
    }

    //Fetch movie history at startup
    componentDidMount() {
        axios.get(`http://localhost:1337/movies/`)
        .then((response) => {
            console.log(response.data);
            this.setState({
                history: response.data,
            })
        })
    }


    //Delete selected movie
    deleteMovie = (id) => {
        console.log(`Deleting ${id}`);

        axios.delete(`http://localhost:1337/movies/${id}`)
        .then((response) => {
            this.setState({
                history: response.data,
            })
        })
    }


    //Display selected movie
    displayMovie = (id) => {
        console.log(`Selecting ${id}`);
        var tempMovie = {};

        for(let i = 0; i < this.state.history.length; i+=1) {
            if(this.state.history[i]['id'] === id)
            {
                tempMovie = {id: this.state.history[i]['id'], title: this.state.history[i]['title'], year: this.state.history[i]['year'], poster: this.state.history[i]['poster']};
                this.setState({
                    movie: tempMovie
                })
            }
        }
    }


    //Search for input title
    searchNotImdb = (title) => {
        console.log(title);
        axios.get(`http://localhost:1337/movies/${title}`)
        .then((response) => {
            console.log(response.data);
            this.setState({
                movie: response.data,
                history: [...this.state.history, response.data],
            })
        })
    }


    render() {
        console.log(this.state);
        return (
            <div className="movieData">
                <h1>Movie Data</h1>
                <Form searchFunc={this.searchNotImdb} />
                <Display movie={this.state.movie} history={this.state.history} displayFunc={this.displayMovie} deleteFunc={this.deleteMovie}/>
            </div>
        );
    }
}

export default MovieData;
