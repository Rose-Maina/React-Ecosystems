import React, { useState} from 'react';
import { connect } from 'react-redux';
// import { createTodo } from './actions';
import { addTodoRequest } from './thunks';
import './NewTodoForm.css';

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('')
    
    return (
    <div className="new-todo-form">
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
    </div>
)
}

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);