import React, { Component } from 'react';
import Counter from './Counter';
import './counter.css';


//App class
class CounterApp extends React.Component {
    constructor(props){
        console.log("Constructing!");
        super(props);
        //let firstCounter = new Counter({counter:0, idx:0});
        this.state = {
            counters: [0]
        }
        //console.log(this);
    }

    addCounter = () => {
        //let newCounter = new Counter({counter:0, idx:this.state.counters.length});
        this.setState({
            counters: [...this.state.counters, 0]
        })
        console.log(this);
    }

    incrementCounter = (idx) => {
        console.log(`Incrementing ${idx}`);
        this.state.counters[idx]++;
        let newCounters = this.state.counters;
        this.setState({
            counters: newCounters
        })
    }

    decrementCounter = (idx) => {
        console.log(`Decrementing ${idx}`);
        this.state.counters[idx]--;
        let newCounters = this.state.counters;
        this.setState({
            counters: newCounters
        })
    }

    render() {
        console.log(this);
        let counters = this.state.counters.map((item, idx) => <Counter key={idx} counter={item} idx={idx} inc={this.incrementCounter} dec={this.decrementCounter} />);

        console.log("Rendering App!");
        return (
            <div id="app">
               <button id="buttonCounter" onClick={ ()=>{ this.addCounter() } }>Add Counter</button>
               {counters}
            </div>
        )
    }
}

export default CounterApp;