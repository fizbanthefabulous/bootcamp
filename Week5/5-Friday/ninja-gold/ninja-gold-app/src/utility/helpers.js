import axios from 'axios';

export function getCurrentBankState() {
    return (
        axios.get('http://localhost:4200/ninja-gold')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("Uh oh!");
        })
    )
}


export function generateHistoryPhrase(type, amount) {
    let phrase = `You earned ${amount} gold at the `;

    if(type === "farm")
        phrase += `Farm`;
    else if(type === "cave")
        phrase += `Cave`;
    else if(type === "house")
        phrase += `House`;
    else {
        if (parseInt(amount) < 0)
            phrase = `You lost ${amount * -1} gold at the `;

        phrase += `Casino`;
    }

    return phrase;
}


export function addActionToHistory(type, gold) {
    let newTotal = gold;
    let amount = null;

    if(type === 'farm')
        amount = Math.ceil(Math.random() * 4) + 1;
    else if(type === 'cave')
        amount = Math.ceil(Math.random() * 6) + 4;
    else if(type === 'house')
        amount = Math.ceil(Math.random() * 9) + 6;
    else
        amount = Math.ceil(Math.random() * 201) - 101;

    newTotal += amount;
    
    return (
        axios.put(`http://localhost:4200/ninja-gold`, {gold: newTotal, history: {type, amount}})
        .then((response) => {
            return ({gold: response.data.gold, history: response.data.history});
        })
    )
}