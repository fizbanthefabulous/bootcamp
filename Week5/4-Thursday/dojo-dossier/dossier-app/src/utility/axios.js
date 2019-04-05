import axios from 'axios';

export function addPersonToDB(name) {
    let newPerson = { name, notes: [] };
    return (axios.post('http://localhost:4200/people', newPerson))
        .then((response) => {
            console.log("Returning", response.data)
            return response.data;
        })
        .catch((error) => {
            console.log("Oh no!");
            return { errMessage: error.data };
        })
}


export function addNoteToPerson(person, note) {
    console.log("****Adding a note");
    console.log("Person:",person);
    console.log("Note to add:",note);
    let updatePerson = {};
    // if(person.notes)
    //     updatePerson= { ...person, notes: [note] };
    // else
        updatePerson= { ...person, notes: [...person.notes, note] };

    return (axios.put(`http://localhost:4200/people/${person.id}`, updatePerson))
        .then((response) => {
            console.log("Returning", response.data)
            return response.data;
        })
        .catch((error) => {
            console.log("Oh no!");
            return { errMessage: error.data };
        })
}


export function getAllPeople() {
    return (axios.get('http://localhost:4200/people')
    .then((response) => {
        console.log("All People:",response.data);
        return response.data;
    })
    .catch((error) => {
        console.log('It tastes like burning!');
        return { errMessage: error.data };
    })
    )
}

export default getAllPeople;