import React from 'react'

function Todo({ todo }) {
    const handleCheckboxChange = ({target:{checked, dataset:{id}}}) => {
        console.log(id);
        console.log(checked);
        // updateTodo(id, checked);
    }
    const handleTodoTitleChange = (event) => {
        console.log(event);
    }
    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} aria-label="Checkbox for following text input" data-id={todo.id}/>
                </div>
                <input type="text" className="form-control" aria-label="Text input with checkbox" value={todo.title} onChange={handleTodoTitleChange}/>
            </div>
        </div>
    )
}

export default Todo;