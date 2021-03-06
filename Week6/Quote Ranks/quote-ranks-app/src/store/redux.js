import { createStore } from 'redux';


//ACTIONS
export const initState = (socketSendFunc) => ({
    type: 'INIT_STATE',
    socketSendFunc
});

export const addAuthor = (authors) => ({
    type: 'ADD_AUTHOR',
    authors
});

export const updateCurrentPage = (page) => ({
    type: 'UPDATE_CURRENT_PAGE',
    page
});


///REDUCERS
export const reducers = (state = initialState1, action) => {
    console.log("Action is = ", action.type);

    switch (action.type) {
        case 'ADD_AUTHOR':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- ADD_AUTHOR | state: ", state)
            console.log(" -- REDUCER -- ADD_AUTHOR | action", action)
            return {
                ...state,
                authors: [...action.authors],
                ready: true,
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
            console.log(" -- REDUCER -- UPDATE_CURRENT_PAGE | state: ", state)
            console.log(" -- REDUCER -- UPDATE_CURRENT_PAGE | action", action)
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
    authors: [],
    ready: false,
    socketSendFunc: null,
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