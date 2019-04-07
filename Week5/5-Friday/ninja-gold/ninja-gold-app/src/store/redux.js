import { createStore } from 'redux';


//ACTIONS
export const initState = (history, gold) => ({
    type: 'INIT_STATE',
    history,
    gold,
});

export const updateHistory = (gold, history) => ({
    type: 'UPDATE_HISTORY',
    gold,
    history,
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
                history: action.history,
                gold: action.gold,
            };


        case 'UPDATE_HISTORY':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- UPDATE_HISTORY | state: ", state)
            console.log(" -- REDUCER -- UPDATE_HISTORY | action", action)
            return {
                ...state,
                history: action.history,
                gold: action.gold,
            };

        default:
            return state;
    }
}


// Initial State
// Minimal representation of the data in the app
const initialState1 = {
    history: [],
    gold: null,
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