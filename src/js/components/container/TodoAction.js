export const addTodoAction =(text, id) =>{
    return {
        type : 'ADD_TODO',
        id,
        text,

    }
}

export const setVisibilityFilterAction = (filter) => ({
    type : 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleTodoAction = (id) =>({
    type : 'TOGGLE_TODO',
    id
})

