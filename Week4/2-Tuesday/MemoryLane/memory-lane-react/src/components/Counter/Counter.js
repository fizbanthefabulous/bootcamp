import React, { Component } from 'react';

class Counter extends React.Component{
    constructor(props){
        super(props);
        //this.counter = props.counter;
        this.idx = props.idx;
        this.incrementFunc = props.inc;
        this.decrementFunc = props.dec;
        console.log(`Constructing Counter ${this.idx}`)
    }


    render() {
        //console.log(this);
        console.log(`Rendering Counter ${this.idx}`)
        return (
            <div className="counter">
                <span>{this.props.counter}</span>
                <button onClick={ ()=> { this.decrementFunc(this.idx) } }>Decrement</button>
                <button onClick={ ()=> { this.incrementFunc(this.idx) } }>Increment</button>
            </div>
        )
    }
}

export default Counter;