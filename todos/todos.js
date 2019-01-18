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
    // if (status === 'All') {
    //     waitRender = todos;
    // } else {
    //     if (status === 'Active') {
    //         waitRender = todos.filter(element => element.completed === false);
    //     } else {
    //         waitRender = todos.filter(element => element.completed === true);
    //     }
    // }
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
    // // console.log(index);
    // var allLi = qsa('li', qs('.todo-list'));
    // qs('.todo-list').removeChild(allLi[index]);
    // todos.splice(index, 1);
    //传入的id为变量，remove("${item.id}")可传入数字

    //用for循环
    // id.remove(); 
    // for(var i=0;i<todos.length;i++){
    //     if(todos[i].id===id.id)
    //     todos.splice(i, 1);
    // } 

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
    //for循环方法
    // for (var i = 0; i < todos.length; i++) {
    //     if (todos[i].completed) {
    //         console.log(todos[i]);
    //         var id=todos[i].id;
    //         console.log(id);
    //         qs('#'+id).remove(); 
    //          todos.splice(i, 1);
    //          i--;
    //     }
    // }

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
// //创建新item,id=gettime,value,completed,
// var newItem = {
//     title: $newTodo.value,
//     completed: false,
//     id: new Date().getTime()
// };

// //创建一个todo数组,
// var todo = [];
// todo.push(newItem);
// var active = 0; completed = 0; total = 0;//怎么把属性负给todo?


// //todo 数组的遍历
// for (var i = 0; i < todo.length; i++) {
//     console.log(todo[i]);
//     total++;
//     if (todo[i].completed == false) {
//         active++;
//     } else {
//         completed++;
//     }
// }

// //input输入完成后，执行显示li框、footer、更新todo-count、clear new-todo

// //增加li节点
// //找到父元素
// var $todoList = document.getElementsByClassName('todo-list')[0];
// //创建要增加的元素,button绑定移除事件
// var $addLi = document.createElement('li');
// var liContent =
//     '<div class="view">'
//     + '<input class="toggle" ondblclick="editItem()" type="checkbox" {{checked}}>'
//     + '<label>$newItem.value</label>'
//     + '<button class="destroy" onclick="remove()"></button>'
//     + '</div>'
// $addLi.innerHTML = liContent;
// //追加节点
// $todoList.appendChild($addLi);

// //显示main、footer
// var $main = document.getElementsByClassName('main')[0];
// $main.style.display = "block";
// var $footer = document.getElementsByClassName('footer')[0];
// $footer.style.display = "block";

// //更新todo-count?写不进去
// var $todoCount = document.getElementsByClassName('todo-count');
// var manyS = active == 1 ? '' : 's';
// var todoCount = '<strong>'
//     + active + '</strong> item' + manyS
//     + ' left';
// $todoCount.innerHTML = todoCount;

// //清空$newtodo.value
// $newTodo.value = "";


// //completed:打勾，显示clearcompleted,内容划斜线，todocount变化
// var $toggle = document.getElementsByClassName('toggle')[0];
// var $clearCompleted = document.getElementsByClassName('clear-completed')[0];
// if ($toggle.checked) {
//     $clearCompleted.style.display = "block"
// }
// else { $clearCompleted.style.display = "none" }

// //remove移除事件 

// function remove() {

//     //动态隐藏

//     // $main.style.display = "none";

//     //remove代码删除
//     $todoList.removeChild($addLi);
// }

// //清除已完成的item,li消失，clearcomplete按钮消失,还没写完
// function removeCompleted(){
//     $clearCompleted.style.display = "none"
// }

// //双击input，进入编辑模式
// function editItem(params) {}
