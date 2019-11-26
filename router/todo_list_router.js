
import React from 'react';
export default class TodoList extends React.Component{
   constructor(props){
       super(props);
   }
    render(){
        const todos=this.props.todos;
        const todoList = todos.length ? todos.map((item, index) => (
            <div key={index} className='todoItem'>
                <label htmlFor={index} className={item.completed ? 'Complete' : ''}></label>
                <input type='checkbox' id={index} checked={item.completed} onChange={this.props.changeChecked} />
                <div className={item.completed ? 'itemComplete' : 'item'}>{item.title}</div>
                <button className='destroy' onClick={this.props.destroy}>x</button>
            </div>
        )) : '';
        return(
            todoList
        )
    }
}