'use strict';

var todos = [];

var $newTodo = qs('.new-todo');
$on($newTodo, 'change', function (e) {
    todos.push({
        title: $newTodo.value,
        completed: false,
        id: 'id' + new Date().getTime()
    });
    renderTodos();
    $newTodo.value = "";
});

/**
 * 渲染todos到页面上
 */
function renderTodos() {
    // qs();
    // all completed active 
    // var waitRender = todos.filter();
    var status = qs('li .selected').innerHTML;
    var waitRender;
    //用switch语句写下面的if else
    switch (status) {
        case 'All':
        waitRender = todos;
            break;
            case 'Active':
            waitRender = todos.filter(element => element.completed === false);
            break;
        default:
        waitRender = todos.filter(element => element.completed === true);
            break;
    }

    var all = '';
    //waitRender.forEach
    waitRender.forEach(function (item, index) {
        // es6模板字符串？
        all += `<li id='${item.id}' class="${item.completed === true ? "completed" : ""}"><div class="view">
        <input class="toggle" type="checkbox" ${item.completed === true ? "checked" : ""}>
        <label>${item.title}</label>
        <button class="destroy" onclick="remove('${item.id}')"></button>
    </div></li>`;
    })
    // console.log(all);
    qs('.todo-list').innerHTML = all;
    var total = getCount().total;
    qs('.footer').style.display = total > 0 ? "block" : "none";
    qs('.main').style.display = total > 0 ? "block" : "none";

}

function remove(id) {
    todos = todos.filter(element => element.id !== id);
    renderTodos();
}

function getCount() {
    var activeTodos = 0, completedTodos = 0, totalTodos = 0;
    for (var i = 0; i < todos.length; i++) {
        totalTodos++;
        if (todos[i].completed) {
            completedTodos++;
        } else {
            activeTodos++;
        }
    }
    //update activecount
    var plural = activeTodos > 1 ? 's' : "";
    var updateTodocount = `<strong>${activeTodos}</strong> item${plural} left`;
    qs('.todo-count').innerHTML = updateTodocount;

    //clearcompleted button是否显示
    var clearcompletedButton = completedTodos > 0 ? "clear completed" : '';
    qs('.clear-completed').innerHTML = `${clearcompletedButton}`;

    //toggleall是否显示黑色
    if (totalTodos === completedTodos) {
        qs('label', qs('.main')).style.color = "black";
    } else {
        qs('label', qs('.main')).style.color = "#e6e6e6";
    }
    return {
        active: activeTodos,
        completed: completedTodos,
        total: totalTodos
    }
}

$delegate(qs('.todo-list'), '.toggle', 'click', function (item) {
    var li = $parent(this, 'li');
    li.className = this.checked ? 'completed' : '';
    var id = li.id;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].completed = li.className === 'completed';
        }
    }
    getCount();

});

function removeCompleted() {
    todos = todos.filter(element => element.completed === false);
    renderTodos();
}

//all/active/completed状态筛选
function clickFilter(element) {

    Array.prototype.forEach.call(qsa('li a'), function (item) { item.innerHTML === element ? item.className = 'selected' : item.className = ''; });
    renderTodos();
};

function toggleAll() {
    if (todos.some(item => item.completed === false)) {
        todos.forEach(item => item.completed = true);
    } else {
        todos.forEach(item => item.completed = false);
    }
    renderTodos();
}


//编辑模式
$delegate(qs('.todo-list'), 'li label', 'dblclick', function (item) {
    var li = $parent(this, 'li');
    li.className = li.className + "  editing";
    var input = document.createElement("input");
    input.className = "edit";
    li.appendChild(input);
    input.focus();
    input.value = qs("label", li).textContent;

})

//编辑结束
$delegate(qs('.todo-list'), 'li .edit', 'keypress', function (event) {
    console.log('keypress');
    var ENTER_KEY=13;
    if (event.keyCode === ENTER_KEY) {
        this.blur();
    }
})
$delegate(qs('.todo-list'), 'li .edit', 'blur', function () {
    console.log('blur');
    var li = $parent(this, 'li');
    var id = li.id;
    var title = this.value;
    title = title.trim();
    console.log(title);
    if (title.length === 0) {
        todos = todos.filter(element => element.id !== id);

    } else {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos[i].title = title;
            }
        }
    }
    renderTodos();
})
