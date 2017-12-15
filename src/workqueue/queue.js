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


}

MyQueue.prototype._runTask = function() {
	if(this.taskID < this.taskQueue.length){
		var currenTask = this.taskQueue[this.taskID]
		currenTask() // 这里执行当前任务的回调呢
	} else {
		console.log('任务全部执行完毕');
		return
	}
}

MyQueue.prototype._next = function() {
	// 如果异常了任务应该停止的吧? 还是要跳过
	this.taskID++
	// var me = this
	this._runTask()
}