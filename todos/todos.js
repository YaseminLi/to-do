//获取input.value,并删除空白字符
//[0]HTMLcollection？？不用[0]怎么弄？
$newTodo = document.getElementsByClassName('new-todo')[0];
console.log($newTodo.value);

//创建新item,id=gettime,value,completed,
var newItem = {
    title: $newTodo.value,
    completed: false,
    id: new Date().getTime()
};

//创建一个todo数组,
var todo = [];
todo.push(newItem);

//input输入完成后，执行显示li框、footer、更新todo-count、clear new-todo

    //增加li节点
    //找到父元素
    var $todoList = document.getElementsByClassName('todo-list')[0];
    //创建要增加的元素,button绑定移除事件
    var $addLi = document.createElement('li');
    var liContent =
        '<div class="view">'
        + '<input class="toggle" type="checkbox" {{checked}}>'
        + '<label>$newItem.value</label>'
        + '<button class="destroy" onclick="remove()"></button>'
        + '</div>'
    $addLi.innerHTML = liContent;
    //追加节点
    $todoList.appendChild($addLi);

    //显示main、footer
    var $main = document.getElementsByClassName('main')[0];
    $main.style.display = "block";
    var $footer = document.getElementsByClassName('footer')[0];
    $footer.style.display = "block";

    //更新todo-count
    var $todoCount = document.getElementsByClassName('todo-count');

    //清空$newtodo.value
    $newTodo.value = "";



//remove移除事件

function remove(){

    //动态隐藏

    // $main.style.display = "none";

    //remove代码删除
    $todoList.removeChild($addLi);
}