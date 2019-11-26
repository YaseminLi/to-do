import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TodoList from './todo_list_router';
export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            todos: [],
            selectedFilter: ''
        }
    }
    componentWillMount(){
        const url=document.URL.split('/#/')[1];
        const selectedFilter=url?url:'all';
        this.setState({selectedFilter})
    }
    inputChange(e) {
        this.setState({ inputValue: e.target.value })
    }
    //增加todoItem
    onAddTodo(e) {
        if (e.keyCode == 13) {
            const newTodo = { title: e.target.value, completed: false };
            const todos = this.state.todos;
            todos.push(newTodo);
            this.setState({ todos, inputValue: '' });
        };
    }
    //todoItemga完成的状态切换
    changeChecked(e) {
        const index = e.target.id;
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState({ todos });
    }
    //删除todoItem
    destroy(e) {
        const index = e.target.id;
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({ todos });
    }
    //清除完成的
    clearCompleted() {
        let { todos } = this.state;
        todos = todos.filter(item => { if (item.completed == false) return true });
        this.setState({ todos })
    }
    //被选中的filter保存至state中
    selectedFilter(a) {
        this.setState({ selectedFilter: a });
    }
    //全部勾选
    toggleAll(){
        const {todos}=this.state;
        const toggle=todos.find(e=>e.completed==false);
        if(toggle){
            todos.map(item=>item.completed=true)
        }else{
            todos.map(item=>item.completed=false)
        }
        this.setState({todos})
    }
    render() {
        const { todos, selectedFilter } = this.state;
        const activeTodos = todos.filter(item => { if (item.completed == false) return true });
        const completedTodos = todos.filter(item => { if (item.completed == true) return true });
        return (
            <div className='main'>
                <div className='toggle'
                    style={{ "display": todos.length !== 0 ? "flex" : "none" }}
                    onClick={this.toggleAll.bind(this)}
                >
                    <p className={todos.length == completedTodos.length ? 'toggle-all' : ''}>></p></div>
                <input className='new-todo' placeholder='What needs to be done?' onKeyUp={e => this.onAddTodo(e)} value={this.state.inputValue} onChange={(e) => this.inputChange(e)} />
                <div className='todoList'>
                    <Router>
                        <Switch>
                            <Route exact path='/' ><TodoList todos={todos} changeChecked={this.changeChecked.bind(this)} destroy={this.destroy.bind(this)} /></Route>
                            <Route path='/active' ><TodoList todos={activeTodos} changeChecked={this.changeChecked.bind(this)} destroy={this.destroy.bind(this)} /></Route>
                            <Route path='/completed' ><TodoList todos={completedTodos} changeChecked={this.changeChecked.bind(this)} destroy={this.destroy.bind(this)} /></Route>
                        </Switch>
                    </Router></div>

                <div className='footer' style={{ "display": todos.length !== 0 ? "flex" : "none" }} >
                    <div className='total-count'>
                        <span className='num'>{activeTodos.length} </span>
                        <span className='num-item'>{activeTodos.length < 2 ? 'item' : 'items'} </span>
                        <span>left</span>
                    </div>
                    <div className='filters'>
                        <Router>
                            <Link to="/" replace><span onClick={this.selectedFilter.bind(this, 'all')} className={selectedFilter == 'all' ? 'selected' : 'no-selected'}>All</span></Link>
                            <Link to="/active" replace><span onClick={this.selectedFilter.bind(this, 'active')} className={selectedFilter == 'active' ? 'selected' : 'no-selected'}>Active</span></Link>
                            <Link to="/completed" replace><span onClick={this.selectedFilter.bind(this, 'completed')} className={selectedFilter == 'completed' ? 'selected' : 'no-selected'}>Complete</span></Link>
                        </Router>
                    </div>
                    <div className='clear' onClick={this.clearCompleted.bind(this)}>
                        <p  style={{ "display":completedTodos.length !== 0 ? "flex" : "none" }}>clear completed</p>
                        </div>
                </div>
            </div>
        )
    }
}