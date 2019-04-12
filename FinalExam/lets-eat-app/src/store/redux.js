import { createStore } from 'redux';


//ACTIONS
export const initState = (socketSendFunc) => ({
    type: 'INIT_STATE',
    socketSendFunc
});

export const newRestaurantList = (restaurantList) => ({
    type: 'NEW_RESTAURANT_LIST',
    restaurantList
});

export const newRestaurantReviews = (reviews) => ({
    type: 'NEW_RESTAURANT_REVIEWS',
    reviews
});


///REDUCERS
export const reducers = (state = initialState1, action) => {
    console.log("Action is = ", action.type);

    switch (action.type) {

        case 'INIT_STATE':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- INIT_STATE | state: ", state)
            console.log(" -- REDUCER -- INIT_STATE | action", action)
            return {
                ...state,
                socketSendFunc: action.socketSendFunc,
            };

        case 'NEW_RESTAURANT_LIST':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- NEW_RESTAURANT_LIST | state: ", state)
            console.log(" -- REDUCER -- NEW_RESTAURANT_LIST | action", action)
            return {
                ...state,
                restaurants: [...action.restaurantList],
                ready: true,
            };

        case 'NEW_RESTAURANT_REVIEWS':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- NEW_RESTAURANT_REVIEWS | state: ", state)
            console.log(" -- REDUCER -- NEW_RESTAURANT_REVIEWS | action", action)
            return {
                ...state,
                reviews: [...action.reviews],
            };

        default:
            return state;
    }
}


// Initial State
// Minimal representation of the data in the app
const initialState1 = {
    restaurants: null,
    reviews: null,
    ready: false,
    socketSendFunc: null,
    viewRestaurantId: null,
};


// COMBINE ALL REDUCERS INTO 1 OBJECT
// export const reducers = combineReducers({
//     tasks
// });


// STORE -- store.js
export function configureStore(initialState = initialState1) { // initialState = initialState | {}
    const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
};


export const store = configureStore();