import React from 'react'
import todoList from './TodoList';

const url = 'http://localhost/800/api/todos';

class TodoListApi extends Component() {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }
    render() {
        return (
            <div>
                <TodoList todos={this.state.todos} />

            </div>
        )
    }

    componentDIDMount() {
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then((todosApi) => {
                this.setState({ todos: todosApi });
            });
    }
}
