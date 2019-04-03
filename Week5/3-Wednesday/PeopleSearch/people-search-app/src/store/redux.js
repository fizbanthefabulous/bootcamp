import { createStore } from 'redux';
  
  
  //ACTIONS
  export const resetSearch = () => ({
    type: 'RESET_SEARCH',
  });

  export const filterPeopleList = (searchString) => ({
    type: 'FILTER_PEOPLE_LIST',
    searchString                  
  });

  export const viewProfile = (id) => ({
    type: 'VIEW_PROFILE',
    id                
  });

  export const clearRedirects = () => ({
    type: 'CLEAR_REDIRECTS',              
  });
  
  
  ///REDUCERS
  export const reducers = (state = initialState1, action) => {
    switch (action.type) { 
        case 'RESET_SEARCH':
        console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
        console.log(" -- REDUCER -- RESET_SEARCH | state: ", state)
        console.log(" -- REDUCER -- RESET_SEARCH | action", action)
        return {
            ...state,
            filteredPeople: [...state.people],
            profileToView: null,
        };

        case 'FILTER_PEOPLE_LIST':
        console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
        console.log(" -- REDUCER -- FILTER_PEOPLE_LIST | state: ", state)
        console.log(" -- REDUCER -- FILTER_PEOPLE_LIST | action", action)
        return {
            ...state,
            filteredPeople: state.people.filter((person) => {
                return person.name.toLowerCase().indexOf(action.searchString.toLowerCase()) > -1;
            })
        };

        case 'VIEW_PROFILE':
        console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
        console.log(" -- REDUCER -- VIEW_PROFILE | state: ", state)
        console.log(" -- REDUCER -- VIEW_PROFILE | action", action)
        let profileIdx = state.people.findIndex((person) => {return person.id === action.id});
        return {
            ...state,
            profileToView: Object.assign({}, state.people[profileIdx]),
            redirectToProfile: true,
        };

        case 'CLEAR_REDIRECTS':
        console.log(" -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
        console.log(" -- REDUCER -- CLEAR_REDIRECTS | state: ", state)
        console.log(" -- REDUCER -- CLEAR_REDIRECTS | action", action)
        return {
            ...state,
            redirectToProfile: false,
        };
  
      default:
        return state;
    }
  }
  
  
  // Initial State
  // Minimal representation of the data in the app
  const initialState1 = {
    people: [
      { id: 0, name: 'Henry', city: 'Washington, DC', industry: 'Government', hobbies: 'Watching cable news', email: 'henry@henry.com'},
      { id: 1, name: 'Janel', city: 'Milwaukee, WI', industry: 'IT', hobbies: 'Woodworking', email: 'janel@janel.com'},
      { id: 2, name: 'Hank', city: 'Dallas, TX', industry: 'Self-Employed', hobbies: 'Drinking brews with friends', email: `What's email?`},
      { id: 3, name: 'Dan', city: 'Minneapolis, MN', industry: 'Accounting', hobbies: 'Spreadsheets!', email: 'dan@dan.com'},
      { id: 4, name: 'Libby', city: 'Los Angeles, CA', industry: 'Media', hobbies: 'Brunch', email: 'libby@libby.com'},
      { id: 5, name: 'Charlie', city: 'Baltimore, MD', industry: 'Professional Baseball', hobbies: 'Stats', email: 'charlie@charlie.com'},
      { id: 6, name: 'Paula', city: 'South Bend, IN', industry: 'Homemaker', hobbies: 'Reading', email: 'paula@aol.com'},
      { id: 7, name: 'Dimitri', city: 'New York City, NY', industry: 'Entrepeneur', hobbies: 'Real Estate', email: 'dim@poutinelovers.com'},
    ],
    filteredPeople: [],
    profileToView: null,
    redirectToProfile: false,
  };
  
  
  // COMBINE ALL REDUCERS INTO 1 OBJECT
  // export const reducers = combineReducers({
  //     tasks
  // });
  
  
  // STORE -- store.js
  export function configureStore(initialState = initialState1) { // initialState = initialState | {}
    const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    console.log(store);
    return store;
  };
  
  
  export const store = configureStore();