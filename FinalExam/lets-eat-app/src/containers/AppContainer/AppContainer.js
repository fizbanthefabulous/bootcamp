import React from 'react';
import './AppContainer.css';
import { connect } from 'react-redux';
import { initState, newRestaurantList, newRestaurantReviews } from '../../store/redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../components/Home/Home';
import AddRestaurant from '../../components/AddRestaurant/AddRestaurant';
import io from 'socket.io-client';
import EditRestaurant from '../../components/EditRestaurant/EditRestaurant';
import RestaurantReviews from '../../components/RestaurantReviews/RestaurantReviews';
import AddReview from '../../components/AddReview/AddReview';


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

            this.initRestaurantListListener();
            this.initReviewsListListener();
        });

        this.props.initState(this.sendMsgToConnectedServer);
    }


    initRestaurantListListener = () => {
        this.socket.on('restaurant-list', (data) => {
            this.props.newRestaurantList(data);
        })
    }

    initReviewsListListener = () => {
        this.socket.on('review-list', (data) => {
            this.props.newRestaurantReviews(data);
        })
    }


    //Common emit for entire app to the server
    sendMsgToConnectedServer = (msgType, message) => {
        console.log(`Sending - action:${msgType} -- message:${message}`);
        this.socket.emit(msgType, message);
    }


    render() {
        return (
            <div className='app-container'>
                <h1>Let's eat</h1>
                {this.props.ready ?
                    <div>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to='/restaurants' />} />
                                <Route exact path='/restaurants' component={Home} />
                                <Route path='/restaurants/new' component={AddRestaurant} />
                                {/* <Route path='/restaurants/:id/edit' render={(props) => <EditRestaurant {...props}/>} /> */}
                                <Route exact path='/restaurants/:id' render={(props) => <RestaurantReviews {...props} />} />
                                <Route path='/restaurants/:id/review' render={(props) => <AddReview {...props} />} />
                            </Switch>
                        
                        <div id='edit-div'>
                            {this.props.editRestaurantId !== null ?
                                <EditRestaurant id={this.props.editRestaurantId} />
                                :
                                null
                            }
                        </div>
                        </BrowserRouter>
                    </div>
                    :
                    <h2>Loading...</h2>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    ready: state.ready,
    editRestaurantId: state.editRestaurantId,
})

const mapDispatchToProps = (dispatch) => ({
    initState: (socketSendFunc) => dispatch(initState(socketSendFunc)),
    newRestaurantList: (restaurantList) => dispatch(newRestaurantList(restaurantList)),
    newRestaurantReviews: (reviews) => dispatch(newRestaurantReviews(reviews)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);