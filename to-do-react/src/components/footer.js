import React from 'react';
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { totalCount, activeCount, filter } = this.props;
        const clearButton = totalCount > activeCount ?
            <div className='clear' onClick={this.props.clearCompleted}>
                <p>clear completed</p>
            </div> : '';
        return (
            <div className='footer' >
                <div className='total-count'>
                    <span className='num'>{activeCount} </span>
                    <span className='num-item'>{activeCount < 2 ? 'item' : 'items'} </span>
                    <span>left</span>
                </div>
                <div className='filters'>
                    <span id='all' onClick={this.props.selectedFilter} className={filter == 'all' ? 'selected' : 'no-selected'}>All</span>
                    <span id='active' onClick={this.props.selectedFilter} className={filter == 'active' ? 'selected' : 'no-selected'}>Active</span>
                    <span id='completed' onClick={this.props.selectedFilter} className={filter == 'completed' ? 'selected' : 'no-selected'}>Complete</span>
                </div>
                {clearButton}
            </div>
        )
    }
}