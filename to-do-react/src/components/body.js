import React from 'react';
import Footer from './footer';
import TodoItem from './todo_item';

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            filter: '',
        }
    }
    componentWillMount() {
        const url = document.URL.split('/#/')[1];
        const filter = url ? url : 'all';
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos = todos ? todos : [];
        this.setState({ filter, todos })
    }
    inputChange(e) {
        this.setState({ inputValue: e.target.value })
    }
    //增加todoItem
    onAddTodo(e) {
        if (e.keyCode == 13) {
            event.preventDefault()
            const newTodo = { title: e.target.value.trim(), completed: false };
            const todos = this.state.todos;
            todos.push(newTodo)
            this.setState({ todos, inputValue: '' });
            localStorage.setItem('todos', JSON.stringify(todos))
        };
    }
    //更新todo
    updateTodoItem(e) {
        const index = e.state.index;
        const updateTitle = e.state.editText;
        console.log(e.state)
        const todos = this.state.todos;
        todos[index].title = updateTitle;
        this.setState({ todos });
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    //todoItemga完成的状态切换
    changeChecked(index) {
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState({ todos });
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    //删除todoItem
    destroy(index) {
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({ todos });
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    //清除完成的
    clearCompleted() {
        let { todos } = this.state;
        todos = todos.filter(item => { if (item.completed == false) return true });
        this.setState({ todos })
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    //被选中的filter保存至state中
    selectedFilter(e) {
        const filter = e.target.id
        this.setState({
            filter
        });
    }
    //全部勾选
    toggleAll() {
        const { todos } = this.state;
        const toggle = todos.find(e => e.completed == false);
        if (toggle) {
            todos.map(item => item.completed = true);
        } else {
            todos.map(item => item.completed = false);
        }
        this.setState({ todos });
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    render() {
        let { todos, filter } = this.state;
        const activeTodos = todos.filter(item => { if (item.completed == false) return true });
        const completedTodos = todos.filter(item => { if (item.completed == true) return true });
        if (todos.length > 0) {
            var footer = <Footer
                totalCount={todos.length}
                activeCount={activeTodos.length}
                filter={this.state.filter}
                selectedFilter={this.selectedFilter.bind(this)}
                clearCompleted={this.clearCompleted.bind(this)}
            />
        }
        let currentTodos = [];
        if (filter == 'active') {
            currentTodos = activeTodos;
        } else if (filter == 'completed') {
            currentTodos = completedTodos;
        } else {
            currentTodos = todos;
        }
        const todoList = currentTodos ? currentTodos.map((item, index) => (
            <TodoItem
                key={index}
                item={item}
                index={index}
                title={item.title}
                changeChecked={this.changeChecked.bind(this, index)}
                destroy={this.destroy.bind(this, index)}
                updateTodoItem={this.updateTodoItem.bind(this)}
            />
        )) : '';
        return (
            <div className='main'>
                <div className='toggle'
                    style={{ "display": todos.length !== 0 ? "flex" : "none" }}
                    onClick={this.toggleAll.bind(this)}
                >
                    <p className={activeTodos.length == 0 ? 'toggle-all' : ''}>></p></div>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    onKeyDown={e => this.onAddTodo(e)}
                    value={this.state.inputValue}
                    type="text"
                    onChange={(e) => this.inputChange(e)}
                    autoFocus={true}
                />
                <div className='todoList'>
                    {todoList}
                </div>
                {footer}

            </div>
        )
    }
}