import { createStore } from 'redux';


//ACTIONS
export const initState = (socketSendFunc) => ({
    type: 'INIT_STATE',
    socketSendFunc
});

export const updateProducts = (products) => ({
    type: 'UPDATE_PRODUCTS',
    products
});

export const updateCurrentPage = (page) => ({
    type: 'UPDATE_CURRENT_PAGE',
    page
});


///REDUCERS
export const reducers = (state = initialState1, action) => {
    console.log("Action is = ", action.type);

    switch (action.type) {
        case 'UPDATE_PRODUCTS':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- UPDATE_PRODUCTS | state: ", state)
            console.log(" -- REDUCER -- UPDATE_PRODUCTS | action", action)
            return {
                ...state,
                products: [...action.products],
            };

        case 'INIT_STATE':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- INIT_STATE | state: ", state)
            console.log(" -- REDUCER -- INIT_STATE | action", action)
            return {
                ...state,
                socketSendFunc: action.socketSendFunc,
            };

        case 'UPDATE_CURRENT_PAGE':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- INIT_STATE | state: ", state)
            console.log(" -- REDUCER -- INIT_STATE | action", action)
            return {
                ...state,
                page: action.page,
            };

        default:
            return state;
    }
}


// Initial State
// Minimal representation of the data in the app
const initialState1 = {
    products: [],
    socketSendFunc: null,
    page: null,
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