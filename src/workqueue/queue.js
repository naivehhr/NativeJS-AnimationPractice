function MyQueue() {
	this.taskQueue = []
	this.taskID = 0;
}

/**
 * 添加任务
 * @param {*} task 
 */
MyQueue.prototype.add = function(task) {
	this.taskQueue.push(task)
	for(let i = 0; i< 10; i++) {
		setTimeout(function(){
			console.log(i)
		}, 1)
	}
	return this
}

/**
 *	执行队列里的任务
 */
MyQueue.prototype.execute = function() {
	if(this.taskQueue.length < 1) {
		console.log('任务全部执行完毕');
		return
	}
	this._runTask()

}

MyQueue.prototype._runTask = function() {
	var me = this
	if(this.taskID < this.taskQueue.length){
		var currenTask = this.taskQueue[this.taskID]
		currenTask() // 这里执行当前任务的回调呢
		me._next() // 默认都同步任务处理
	} else {
		console.log('任务全部执行完毕');
		// setTimeout(function(){
		// 	me.taskID = 0
		// 	me._runTask()
		// }, 1000)
	}
}

MyQueue.prototype._next = function() {
	// 如果异常了任务应该停止的吧? 还是要跳过
	this.taskID++
	// var me = this
	this._runTask()
}

module.exports = mq = new MyQueue()