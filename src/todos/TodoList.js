import React, { useEffect }from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import NewTodoForm from './NewTodoForm';
import TodoListItem from "./TodoListItem";
import {loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
// import {  markTodoAsCompleted } from './actions';
// import { displayAlert } from './thunks';
import {  getTodosLoading ,
          getCompletedTodos,
          getIncompleteTodos 
       } from './selectors';

    const ListWrapper = styled.div`
        max-width: 700px;
        margin: auto;
    `;

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading todos...</div>
    const content =
    (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo => <TodoListItem 
            todo={todo} 
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed:</h3>
            {completedTodos.map(todo => <TodoListItem 
            todo={todo} 
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)}
            {/* {todos.map(todo => <TodoListItem 
            todo={todo} 
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed}/>)} */}
            
        </ListWrapper>   
);
    return isLoading ? loadingMessage: content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    // todos: getTodos(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});


const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    // onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),

    // onDisplayAlertClicked: text => dispatch(displayAlert(text)),
})

export default connect( mapStateToProps, mapDispatchToProps)(TodoList);