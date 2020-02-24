# todoMVC
用不同框架实现一个待办事项管理项目，[参考](http://todomvc.com/)

主要有以下功能：

- 新建待办事项
- 对已有待办事项的编辑、打勾完成、删除
- 对所有待办事项按筛选条件显示：全部、已完成、未完成
- 未完成事项的计数

## Demo
[演示](https://yaseminli.github.io/to-do/)
<img src='./readme_image/to-do.png'/>


## 实现
这里用MVC、MVVM框架进行了两种实现

MVC，不使用框架：
- 需要用大量的代码编写对DOM节点的操作
- 页面需要显示的数据发生变化时，要手动操作节点去渲染

MVVM，使用react：
- 数据可以双向绑定，自动更新DOM



