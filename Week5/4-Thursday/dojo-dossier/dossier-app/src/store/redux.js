import { createStore } from 'redux';


//ACTIONS
export const initState = (people) => ({
    type: 'INIT_STATE',
    people
});

export const addPerson = (person) => ({
    type: 'ADD_PERSON',
    person
});

export const updatePeople = (people) => ({
    type: 'UPDATE_PEOPLE',
    people
});

export const viewProfile = (id) => ({
    type: 'VIEW_PROFILE',
    id
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
                people: [...action.people],
                dossierToView: (action.people.length > 0 ? action.people[0].id : null),
            };
        
        case 'ADD_PERSON':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- ADD_PERSON | state: ", state)
            console.log(" -- REDUCER -- ADD_PERSON | action", action)
            return {
                ...state,
                people: [...state.people, action.person],
                dossierToView: action.person.id,
            };


        case 'VIEW_PROFILE':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- VIEW_PROFILE | state: ", state)
            console.log(" -- REDUCER -- VIEW_PROFILE | action", action)
            return {
                ...state,
                dossierToView: action.id,
            };

            case 'UPDATE_PEOPLE':
            console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
            console.log(" -- REDUCER -- UPDATE_PEOPLE | state: ", state)
            console.log(" -- REDUCER -- UPDATE_PEOPLE | action", action)
            return {
                ...state,
                people: [...action.people]
            };

        default:
            return state;
    }
}


// Initial State
// Minimal representation of the data in the app
const initialState1 = {
    people: [],
    dossierToView: null,
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