'use strict'
var loadImage = require('./imageloader')
var STATE_INITIAL = 0, //初始状态
    STATE_START = 1, // 开始状态
    STATE_STOP = 2; // 停止状态

/**
 * 镇动画库类
 */
function Animation(){
  this.taskQueue = [];
  this.index = 0;
  this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，去预加载图片
 * @param {array} imgList 
 */
Animation.prototype.loadImage = function(imgList) {
  var taskFn = function(next) {

  }
}

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param {*} ele dom 对象
 * @param {*} positions 背景位置数组
 * @param {*} imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions,imageUrl) {

}


/**
 * 添加一个异步任务，通过定时改变image标签的src属性，实现帧动画
 * @param {*} ele dom 对象
 * @param {*} imgList 图片array
 */
Animation.prototype.changeSrc = function (ele, imgList) {

}


/**
 * 高级用法，添加一个异步定时任务，该任务自定义动画每帧执行的任务函数
 * @param {*} taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {

}

/**
 * 添加一个同步任务，可以再一个任务完成后执行回调函数
 * @param {*} callback 回调函数
 */
Animation.prototype.then = function (callback) {

}

/**
 * 开始执行任务，异步定义任务执行的间隔
 * @param {} intervval 
 */
Animation.prototype.start = function (intervval) {

}

/**
 * 添加一个同步任务， 该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果， 可以定义重复的次数
 * @param {*} times 
 */
Animation.prototype.repeat = function(times) {

}

/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无线循环上一次任务
 */
Animation.prototype.repeatForever = function() {

}


/**
 * 暂停当前异步定时任务
 */
Animation.prototype.wait = function () {

}


/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function() {

}

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function() {

}

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
   
}