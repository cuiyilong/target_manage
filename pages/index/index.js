import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
const app = getApp()

// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todos
    todos: [],

    // todo 计数
    uncompletedCount: 0,
    completedCount: 0,
    // display control
    displayuncompletedCount: 0,
    displaycompletedCount: 0,

    // 是否动画延迟
    delay: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      // 打开主页面
      this.openPage()
    }, 1500)
  },

  /**
   * 导航到主页面
   */
  openPage (replace) {
    let options = { url: '../todo/index' }
    // 导航
    //wx.switchTab(options)
    this.syncData()
  },
  /**
   * 同步数据
   */
  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
    // 更新置顶标题
    let uncompletedCount = todoStore.getUncompletedTodos().length
    let todayCompletedCount = todoStore.getTodayCompletedTodos().length
    
    let title = ['TodoList（进行中: ', uncompletedCount, ', 今日已完成: ', todayCompletedCount, '）'].join('')
    wx.setTopBarText({ text: title })
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.update({ delay: false })
    }, 2000)
  },

  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  handleTodoLongclick(e) {
    // 获取 index
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这项任务吗？',
      success: (e) => {
        if (e.confirm) {
          this.data.todos.splice(index, 1)
          this.update()
        }
      }
    })
  },

  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    console.log("update!")
    console.log(data.uncompletedCount)
    console.log(data.completedCount)
    this.setData(data)
  },

  handleAddTodo(e) {
    wx.navigateTo({
      url: '../todo/create'
    })
  }

})