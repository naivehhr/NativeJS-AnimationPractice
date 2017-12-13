(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 预加载图片函数
 * @param {*} images 加载图片数组或对象
 * @param {*} callback 全部图片加载完毕后调用的回调函数
 * @param {*} timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
  // 加载完成图片计数器
  var count = 0;
  // 去不退票加载成功的标志位
  var success = true
  // 超时timer的id
  var timeoutID = 0;
  // 是否加载超时的标志
  var isTimeout = false;
  // 对图片数组或对象进行遍历
  for(var key in images) {
    if(!Object.prototype.hasOwnProperty.call(images, key)){
      continue;
    }
    //获得每个图片元素
    // 期望格式是个object: {src: xxx }
    var item = images[key]
    if(typeof item === 'string') {
      // 这的写法不赞同
      item = images[key] = {
        src: item
      }
    }
    // 如果格式不满足期望，则丢弃此条数据进行下一次遍历
    if(!item || !item.src) {
      continue
    }
    //计数+1
    count++;
    //设置图片元素id
    item.id = '__img__' + key + getId();
    // 设置图片元素的img, 它是一个Image对象
    item.img = window[item.id] = new Image();
    doLoad(item);
  }

  // 如果计数为0，则直接调用callback
  if(!count) {
    callback(success)
  } else {
    timeoutID = setTimeout(onTimeout, timeout);
  }

  /**
   * 真正进行图片加载的函数
   * @param {*} item 
   */
  function doLoad(item){
    item.status = 'loading';
    var img = item.img
    // 定义图片加载成功的回调函数
    img.onload = function() {
      success = success && true;
      item.status = 'loaded'
    }
    // 失败的回调函数
    img.onerror = function () {
      success = false;
      item.status = 'error'
    }

    // 发起一个http(s)的请求
    img.src = item.src

    /**
     * 每张图片加载完成的回调函数
     */
    function done() {
      img.onload = img.onerror = null;
      try{
        delete window[item.id];
      } catch (e) {
        // 有的浏览器兼容，报错后不阻塞js执行
      }

      // 每张图片加载完成，计数器减一，当所有图片加载完成并没有超时则清除计数器且执行回调函数
      if(!--count && isTimeout){
        clearTimeout(timeoutID) // 这个应该总要执行的吧
        callback(success);
      }
    }
  }

  /**
   * 超时函数
   */
  function onTimeout() {
    isTimeout = true
    callback(false)
  }
}

var __id = 0;
function getId(){
  return ++__id
}

module.exports = loadImage

/***/ }),
/* 1 */
/***/ (function(module, exports) {

'use strick'

var DEFAULT_INTERVAL = 1000 / 60
var requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL)
		}
})();

var cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		function (id) {
			return window.clearTimeout(id)
		}
})()


// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;

function Timeline() {
	this.animationHandler = 0;
	this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param {*} time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {
	// 需要每个timeline实例实现里面的方法
}

/**
 * 动画开始
 * @param {*} interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
	if (this.state === STATE_START) {
		return
	}
	this.state = STATE_START;
	this.interval = interval || DEFAULT_INTERVAL;
	startTimeline(this, +new Date())
}

Timeline.prototype.restart = function() {
	if(this.state === STATE_START) return
	if(!this.dur || !this.interval) {
		return
	}
	this.state = STATE_START
	// 无缝连接动画
	startTimeline(this, +new Date() - this.dur)
}	

Timeline.prototype.stop = function() {
	if(!this.state !== STATE_START) {
		return
	}
	this.state = STATE_STOP
	//如果动画开始过，则记录动画开始到现在所经历的时间
	if(this.startTime){
		this.dur = +new Date() - this.startTime
	}
	cancelAnimationFrame(this.animationHandler)
}

/**
 * 时间轴动画启动函数
 * @param {*} timeline 时间轴实例 
 * @param {*} startTime  动画开始时间戳
 */
function startTimeline(timeline, startTime) {
	timeline.startTime = startTime
	nextTick.interval = timeline.interval;
	//记录上一次回调的时间戳
	var lastTick = + new Date()
	/**
	 * 每一帧执行的函数
	 */
	function nextTick(){
		var now = +new Date()
		timeline.animationHandler = requestAnimationFrame(nextTick) // 对于这种写法表示不理解， 为啥不写外层
		// 如果当前时间与上一次回调的时间戳大于设置的时间间隔
		// 表示这一次可以执行回调函数
		if(now - lastTick >= timeline.interval) {
			timeline.onenterframe(now - startTime)
			lastTick = now
		}
	}
}

module.exports = Timeline

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var loadImage = __webpack_require__(0)
var Timeline = __webpack_require__(1)
var STATE_INITIAL = 0, //初始状态
  STATE_START = 1, // 开始状态
  STATE_STOP = 2; // 停止状态

// 同步任务
var TASK_SYNC = 0;
// 异步任务
var TASK_ASYNC = 1;


function next(callback) {
  callback && callback()
}

/**
 * 镇动画库类
 */
function Animation() {
  this.taskQueue = [];
  this.index = 0;
  this.state = STATE_INITIAL;
  this.timeline = new Timeline()
}

/**
 * 添加一个同步任务，去预加载图片
 * @param {array} imgList 
 */
Animation.prototype.loadImage = function (imgList) {
  // var taskFn = function (next) {
  //   loadImage(imgList.slice(), next)
  // }
  // var type = TASK_SYNC;
  // return this._add(taskFn, type)
  var ele = document.getElementById('rabbit')
  var imgUrl = './img/rabbit-big.png'
  var positions = [
    '0 -854',
    '-174 -852',
    '-329 -852',
    '-524 -852',
    '-698 -852',
    '-873 -848'
  ]
  function animation(ele, positions, imgUrl) {
    var index = 0;
    ele.style.backgroundImage = `url(${imgUrl})`
    ele.style.backgroundRepeat = 'np-repeat'
    function run(){
      var posion = positions[index].split(' ');
      ele.style.backgroundPosition = posion[0] + 'px '+ posion[1] + 'px'
      index++;
      if(index >= positions.length) index = 0
      setTimeout(run, 80)
    }
    run()
  }
  window.animation = animation
  return this
}

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param {*} ele dom 对象
 * @param {*} positions 背景位置数组
 * @param {*} imageUrl 图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {
  var len = positions.length;
  var taskFn;
  var type;
  if (len) {
    var me = this
    taskFn = function (next, time) {
      if (imageUrl) {
        ele.style.backgroundImage = `url(${imageUrl})`
      }
      // 获得当前北京图片位置索引
      var index = Math.min(time / me.interval | 0, len - 1)
      var position = positions[index].split(' ')
      // 改变dom对象的背景图片位置
      ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
      if (index === len - 1) {
        next() // 这里啥意思？这个next从何而来
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next
    type = TASK_SYNC
  }
  return this._add(taskFn, type);
}


/**
 * 添加一个异步任务，通过定时改变image标签的src属性，实现帧动画
 * @param {*} ele dom 对象
 * @param {*} imgList 图片array
 */
Animation.prototype.changeSrc = function (ele, imgList) {
  var len = imgList.length;
  var taskFn;
  var type;
  if(len) {
    var me = this
    taskFn = function(next, time) {
      // 获得当前图片索引
      var index = Math.min(time / me.interval | 0, len - 1)
      //改变image对象的图片地址
      ele.src = imgList[index]
      if(index === len - 1) {
        next()
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next;
    type = TASK_SYNC
  }

  return this._add(taskFn, type)
}


/**
 * 高级用法，添加一个异步定时任务，该任务自定义动画每帧执行的任务函数
 * @param {*} taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {
  // 这里啥时候执行?
  return this._add(taskFn,TASK_ASYNC)
}

/**
 * 添加一个同步任务，可以再一个任务完成后执行回调函数
 * @param {*} callback 回调函数
 */
Animation.prototype.then = function (callback) {
  var taskFn = function(next) {
    callback();
    next()
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}

/**
 * 开始执行任务，异步定义任务执行的间隔
 * @param {} interval 
 */
Animation.prototype.start = function (interval) {
  if (this.state === STATE_START) {
    return this
  }
  // 如果任务链中没有任务，则返回
  if (!this.taskQueue.length) {
    return this
  }
  this.state = STATE_START;
  this.interval = interval; // 这个预先没定义啊
  this._runTask();
  return this;
}

/**
 * 添加一个同步任务， 该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果， 可以定义重复的次数
 * @param {*} times 
 */
Animation.prototype.repeat = function (times) {
  var me = this
  var taskFn = function() {
    if(typeof times === 'undefined') {
      // 无限回退到上一个任务
      // 怎么个无效回退的?
      me.index--;
      me._runTask();
      return;
    }
    if(times) {
      times--;
      //回退
      me.index--
      me._runTask();
    } else {
      //times 为0时
      var task = me.taskQueue[me.index]
      me._next(task)
    }
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}

/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无线循环上一次任务
 */
Animation.prototype.repeatForever = function () {
  return this.repeat()
}


/**
 * 暂停当前异步定时任务
 */
Animation.prototype.wait = function () {
  if(this.taskQueue && this.taskQueue.length > 0) {
    // 在task上添加了一个wait属性
    this.taskQueue[this.taskQueue.length - 1].wait = time
  }
  return this
}


/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {
  if(this.state ===STATE_START) {
    this.state = STATE_STOP
    this.timeline.stop()
    return this // 这用单写？
  }
  return this
}

/**
 * 重新执行上一次暂停的异步任务
 */
Animation.prototype.restart = function () {
  if(this.state === STATE_STOP) {
    this.state = STATE_START
    this.timeline.restart()
    return this
  }
  return this
}

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
  if(this.state !== STATE_INITIAL) {
    this.state = STATE_INITIAL
    this.taskQueue = null
    this.timeline.stop()
    this.timeline = null;
    return this
  }
  return this
}

/**
 * 下划线命名的是类内部使用方法
 * taskFn: 任务方法
 * type: 任务类型
 */
Animation.prototype._add = function (taskFn, type) {
  this.taskQueue.push({
    taskFn: taskFn,
    type: type
  })
  return this
}

/**
 * 执行任务
 */
Animation.prototype._runTask = function () {
  if (!this.taskQueue || this.state !== STATE_START) {
    return;
  }
  //任务执行完毕
  if (this.index === this.taskQueue.length) {
    this.dispose()
    return
  }

  // 获得任务链上的当前任务
  var task = this.taskQueue[this.index]
  if (task.type === TASK_SYNC) {
    this._syncTask(task)
  } else {
    this._asyncTask(task)
  }
};

/**
 * 同步任务
 * @param {*} task 
 */
Animation.prototype._syncTask = function (task) {
  var me = this
  var next = function () {
    // 切换到下一个任务
    me._next(task)
  }
  var taskFn = task.taskFn // 这个task 结构是啥样子的
  taskFn(next)
}

/**
 * 异步任务
 * @param {*} task 
 */
Animation.prototype._asyncTask = function (task) {
  var me = this
  //定义每一帧执行的回调函数
  var enterFrame = function (time) {
    var taskFn = task.taskFn
    var next = function () {
      //停止当前任务
      me.timeline.stop()
      // 执行下一个任务
      me._next(task)
    }
  }
  this.timeline.onenterframe = enterFrame
  this.timeline.start(this.interval)
}

/**
 * 切换到下一个任务， 支持如果当前任务需要等待，则延迟执行
 */
Animation.prototype._next = function (task) {
  this.index++
  var me = this 
  task.wait? setTimeout(function(){
    me._runTask
  }, taskk.wait):this._runTask()
}


const newLocal = module.exports = function () {
  return new Animation();
};

/***/ })
/******/ ]);
});