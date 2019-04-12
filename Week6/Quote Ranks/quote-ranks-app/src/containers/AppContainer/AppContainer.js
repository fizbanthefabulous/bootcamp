import React from 'react';
import './AppContainer.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../../components/Home/Home';
import AddAuthor from '../../components/AddAuthor/AddAuthor';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addAuthor, initState } from '../../store/redux';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.socket = io('http://localhost:4200');
    }

    componentDidMount = () => {
        this.socket.on('greeting', (data) => { //4
            console.log("CLIENT > socket.on greeting")
            console.log(data.msg); //5
            this.socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' });


        });

        //Initialize socket Listeners
        this.initAuthorListListener();

        this.props.initState(this.sendMsgToConnectedServer);
    }


    initAuthorListListener = () => {
        this.socket.on('author-list', (authorData) => {
            this.props.addAuthor(authorData);
        })
    }


    sendMsgToConnectedServer = (msgType, message) => {
        console.log(`Sending - action:${msgType} -- message:${message}`);
        this.socket.emit(msgType, message);
    }

    render() {
        return (
            <div className='app-container'>
                <h1>Quote Ranks</h1>
                {this.props.ready ?
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/new' component={AddAuthor} />
                        </Switch>
                    </BrowserRouter>
                    :
                    <h1>Loading...</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ready: state.ready,
})

const mapDispatchToProps = (dispatch) => ({
    addAuthor: (socketSendFunc) => dispatch(addAuthor(socketSendFunc)),
    initState: (socketSendFunc) => dispatch(initState(socketSendFunc)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);