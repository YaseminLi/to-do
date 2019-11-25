import React from 'react';
export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editText: props.title,
            editting: false,
            // update: props.title,
            index: props.index
        };
        this.input = React.createRef();
    }
    handleDounbleClick() {
        const { editting } = this.state;
        this.setState({ editting: !editting });
    }
    inputChange(e) {
        const editText = this.input.current.value
        this.setState({
            editText
        })
    }
    confirmEdit(e) {
        if (e.keyCode == 13) {
            const { editting, editText } = this.state;
            // this.setState({update: editText});
            this.setState({
                editting: !editting
            })
            this.props.updateTodoItem(this);

        }
    }
    render() {
        const { item, index } = this.props;
        const { editting } = this.state;
        return (
            <div className='todoItem'>
                <label htmlFor={index} className={item.completed ? 'Complete' : ''}></label>
                <input
                    className='toggle'
                    type='checkbox'
                    id={index}
                    checked={item.completed}
                    onChange={this.props.changeChecked}
                />
                <div
                    style={{ 'display': editting ? 'none' : 'block' }}
                    className={item.completed ? 'itemComplete' : 'item'}
                    onDoubleClick={this.handleDounbleClick.bind(this)}>
                    {item.title}
                </div>
                <input
                    ref={this.input}
                    className='edit'
                    style={{ 'display': !editting ? 'none' : 'block' }}
                    defaultValue={item.title}
                    onKeyDown={this.confirmEdit.bind(this)}
                    onChange={this.inputChange.bind(this)} />
                <button className='destroy' onClick={this.props.destroy}>x</button>
            </div>

        )
    }

}