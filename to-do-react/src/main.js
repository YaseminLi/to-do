import React from 'react';
import ReactDOM from 'react-dom';
import Body from './components/body';
class Root extends React.Component {
    render() {
        return (
            <div>
                <header >
                    todo
                </header>
                <Body />
                <footer >
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="https://github.com/YaseminLi">Yasemin Li</a></p>
                    <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('root')
);