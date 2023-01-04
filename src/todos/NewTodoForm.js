import React, { useState} from 'react';
import { connect } from 'react-redux';
// import { createTodo } from './actions';
import {getTodos} from './selectors';
import styled from 'styled-components';
import { addTodoRequest } from './thunks';
import './NewTodoForm.css';

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('')
    
    return (
    <FormContainer>
        <input classname="new-todo-input" 
            placeholder="Type your new todo here" 
            type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} />
        <button 
        onClick = {() => {
            const isDuplicateText = 
                todos.some(todo => todo.text === inputValue)
            if (!isDuplicateText){
                onCreatePressed(inputValue);
                setInputValue('');
            }
        }}
        className="new-todo-button">Create Todo</button>
    </FormContainer>
)
}

const mapStateToProps = state => ({
    todos: getTodos(state),
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);