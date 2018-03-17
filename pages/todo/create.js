// pages/todos/create.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todo
    todo: new Todo(),

    // 级别
    levels: ['紧急且重要', '重要不紧急', '紧急不重要', '不紧急不重要'],
    // 类型
    tasktypes: ['学习','健康','金融','教育','工作','兴趣爱好'],
    // 权重分值
    taskpoints: ['1','2','3','4'],
    // 重复
    taskrepeats: ['每天','仅工作日','自定义']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.todo = new Todo()
    this.update()
  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

  /**
   * Todo 改变事件
   */
  handleTodoItemChange (e) {
    let todo = e.detail.data.todo
    Object.assign(this.data.todo, todo)
    this.update()
  },

  /**
   * 类型改变事件
   */
  handleTypeChange(e) {
    this.data.todo.tasktype = parseInt(e.detail.value) + 1
    this.update()
  },

  /**
   * 分值改变事件
   */
  handlePointChange(e) {
    this.data.todo.taskpoint = parseInt(e.detail.value) + 1
    this.update()
  },
  
  /**
   * 重复改变事件
   */
  handleRepeatChange(e) {
    this.data.todo.taskrepeat = parseInt(e.detail.value) + 1
    this.update()
  },

  /**
   * 级别改变事件
   */
  handleLevelChange(e) {
    this.data.todo.level = parseInt(e.detail.value) + 1
    this.update()
  },

  /**
   * 描述输入事件
   */
  handleDescChange (e) {
    this.data.todo.desc = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap (e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    todoStore.addTodo(this.data.todo)
    todoStore.save()
    wx.navigateBack()
  },

  /**
   * 更新数据
   */
  update (data) {
    data = data || this.data
    this.setData(data)
  }
})