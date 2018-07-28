import React, { Component } from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';

const counterReducer = (state = 0, action) => {
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(counterReducer);

const Counter = ({value, clickFn}) =>(
    <div>
             <p>{value}</p>
             <button onClick={clickFn} name="increment">+</button>
             <button onClick={clickFn} name="decrement">-</button>
    </div>
)

const clickHandler=(event) => {
        if(event.target.name=="increment"){
                store.dispatch({type : "INCREMENT"})
        }else{
            store.dispatch({type : "DECREMENT"})
        }
}

const render = () =>{
    ReactDOM.render(<Counter value={store.getState()} clickFn={clickHandler} />,
    document.getElementById("create-article-form"))
}

store.subscribe(render);
render();

