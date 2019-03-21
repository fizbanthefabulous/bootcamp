import React, { Component } from 'react';
import EntryForm from '../EntryForm/EntryForm';
import Display from '../Display/Display';
import axios from 'axios';
import './GithubApp.css'

class GithubApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            githubScore: null,
            errorMessage: null,
        }
    }

    //Search for user profile from Github
    searchGithub = (username) => {
        axios.get(`https://api.github.com/users/${username}`)
        .then((response) => {
            console.log(response);
            this.setState({
                githubScore: response.data.followers + response.data.public_repos,
                errorMessage: null,
            })
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                githubScore: null,
                errorMessage: `${username} is not a github user`
            })
        })
    }

    render() {
        return (
            <div className="appWrapper">
                <EntryForm searchFunc={this.searchGithub}/>
                <Display score={this.state.githubScore} errorMessage={this.state.errorMessage} />
            </div>
        )
    }
}

export default GithubApp