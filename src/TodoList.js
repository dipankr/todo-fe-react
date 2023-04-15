import React from 'react';

export default function TodoList({ todos, updateTodo }) {
    const handleCheckboxChange = ({target:{checked, dataset:{id}}}) => {
        console.log(id);
        console.log(checked);
        updateTodo({id: id, completed: checked});
    }
    const handleTodoTitleChange = (e) => {
        updateTodo({id: e.target.dataset.id, title: e.target.value});
    }

    return (
        todos.map((todo, index) => {
            return (
                <>
                    <div className="input-group mb-3">
                        <div className="input-group-text">
                            <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={handleCheckboxChange} aria-label="Checkbox for following text input" data-id={todo.id} key={index}/>
                        </div>
                        <input type="text" className="form-control" aria-label="Text input with checkbox" data-id={todo.id} key={index} value={todo.title} onChange={handleTodoTitleChange}/>
                    </div>
                </>
            )
        })
    )
}
