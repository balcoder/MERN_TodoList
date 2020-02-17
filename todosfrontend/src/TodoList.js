import React, {Component} from 'react';
import TodoItem from './TodoItem'
import './TodoList.css';
import TodoForm from './TodoForm';
import * as apiCalls from './api';



class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this);
  }

  handleError(res) {
    if(!res.ok) {
      if(res.status >= 400 && res.status < 500) {
        return res.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: 'Please try again later: Server not responding'};
        throw err;
      }
    }
    return res.json();
  }


  async loadTodos() {
    try {
      let todos = await apiCalls.getTodos();
      this.setState({todos});
    } catch (e) {
      console.error(e);
    }
  }

  async addTodo(newTodo) {
    try {
      let addedTodo = await apiCalls.createTodo(newTodo);
      this.setState({todos: [...this.state.todos, addedTodo]})
      console.log('Success:',addedTodo);
    } catch (e) {
        console.error(e);
    }
  }

  async deleteTodo(id) {
    const NEWTODOS = this.state.todos.filter(todo => todo._id !== id);
    try {
      let data = await apiCalls.removeTodo(id);
      this.setState({todos: NEWTODOS });
      console.log('Successfully deleted:', data);
    } catch (e) {
      console.error(e)
    }
  }

  async toggleTodo(todo) {
    try {
      let updatedTodo = await apiCalls.updateTodo(todo);
      console.log('Successfully Updated:',updatedTodo);
      const todos = this.state.todos.map(t =>
        (t._id === updatedTodo._id)
        ? {...t, completed: !t.completed}
        : t
      );
        this.setState({todos});
    }  catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.loadTodos();
  }


  render() {
    // we bind the deleteTodo method while passing in as a prop because we need
    // to pass in the id of each todo as an argument to bind(thisArg, arguments)
    const todos = this.state.todos.map((todo, i) => {
      return (
        <TodoItem
          key={todo._id}
          {...todo}
          deleteTodo={this.deleteTodo.bind(this, todo._id)}
          onToggle={this.toggleTodo.bind(this,todo)}
          />
      );
    });
    return (
      <div className="todo-list">
        <h1>TodoList</h1>
        <TodoForm
          addTodo={this.addTodo}

          />
        <ul className="todo-list-items">
          {todos}
        </ul>
      </div>
    );
  }
}


export default TodoList;
