import React, { Component } from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {addTodoAction, setVisibilityFilterAction, toggleTodoAction} from './TodoAction';
import {todos, visibilityFilter } from './TodoReducer'

let id = 0;


const FilterByVisibility = (data, filter)=>{
        switch(filter){
            case 'SHOW_ALL':
                return data;
            case 'SHOW_ACTIVE':
                return data.filter(todo => !todo.completed )
           case 'SHOW_COMPLETED':
                return data.filter(todo => todo.completed )
            default:
                return data;
        }
}

const TodoItem = ({completed, text, onClick })=>(
    <li style={{textDecoration : completed ? 'line-through' : 'none', cursor : 'pointer'}} onClick={onClick}>{text}</li>
)

const Link = ({active, children, onClick}) =>{
    return    active ? (<span>{children}</span>) :( <a href="#" onClick={(e)=>{e.preventDefault();onClick()} }>{children}</a>)
}

const mapStateToLinkPropes = (state, ownProps) =>{
    return {
        active  : ownProps.filter === state.visibilityFilter
    }
}


const mapDispatchToLinkProps = (dispatch, ownProps) =>{
   return {
        onClick : () => {
            dispatch(setVisibilityFilterAction(ownProps.filter));
        }
    }
}

const FilterLink = connect(mapStateToLinkPropes, mapDispatchToLinkProps)(Link);


const Pager = () =>{
    return (
        <div>
            Show : 
                {' '}
                <FilterLink filter='SHOW_ALL'  > All </FilterLink>
                {' '}
                <FilterLink filter='SHOW_ACTIVE'  > Active </FilterLink>
                {' '}
                <FilterLink filter='SHOW_COMPLETED'  > Completed </FilterLink>
        </div>
    )
}

const combineReducers = (reducers) => (state={}, action) => 
        Object.keys(reducers).reduce( (nextState, key) => {
            nextState[key] =  reducers[key](state[key], action);
            return nextState;
        }, {} )

const todoApp = combineReducers({
    todos,
    visibilityFilter
})



let AddTodo = ({dispatch}) =>{
    let input;
    
    return (
        <div>
             <input  ref={(node)=>{input = node}} />
             <button onClick={()=>{ dispatch(addTodoAction(input.value, id)); 
                input.value=""; id++}}>Add</button>
        </div>
    )
}

AddTodo =  connect()(AddTodo);



const mapStateTodoListToProps = (state) =>{
    return {
        todos : FilterByVisibility(state.todos, state.visibilityFilter)
    }
}



const mapDispatchTodoListToProps = (dispatch) =>{
    return {
        onTodoClick : (id) =>{
            dispatch(toggleTodoAction(id))
        }
    }
}


const TodoList = ({todos, visibilityFilter, onTodoClick}) =>{
    const dataResult = FilterByVisibility(todos, visibilityFilter);
    return (
     <div>   
        <ul>
            {
                dataResult.map((todo)=> <TodoItem key={todo.id} completed={todo.completed} text={todo.text}
                 onClick={ () =>
                  onTodoClick(todo.id) 
                } /> )
            }       
        </ul>
    </div>
    )
}

const TodoListContainer=connect(mapStateTodoListToProps, mapDispatchTodoListToProps)(TodoList);

let todoInput;


const TodoApp = () => (
        <div>
                <AddTodo  />
                <TodoListContainer  />
                <Pager   />
        </div>
)




ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp   />
    </Provider>
,
    document.getElementById("todoApp"))




