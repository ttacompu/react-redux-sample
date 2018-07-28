export const todo = (state, action) =>{
    switch(action.type){
        case 'ADD_TODO':
        return {
            id : action.id,
            text : action.text,
            completed : false
        }
       case 'TOGGLE_TODO':
       if(state.id !==action.id){
            return state;
        }
       return {
           ...state,
           completed : !state.completed
       };
    }
}

export const todos = (states = [], action) =>{
    switch(action.type){
        case 'ADD_TODO':
            return [...states, todo(undefined, action)];

        case 'TOGGLE_TODO':
           return states.map(t => todo(t, action))
        
        default:
            return states;
    }
}

export const visibilityFilter = (state="SHOW_ALL", action) => {
    switch(action.type){
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
}