class NewQueue {
	constructor() {
		this.taskQueue = [];
		this.taskID = 0;
	}
	
	add(task) {
		this.taskQueue.push(task)
		return this
	}

	execute(){
		if(this.taskQueue.length < 1) {
			console.log('任务全部执行完毕');
			return
		}
		this.runTask()
		return this
	}

	// boundFunction = () => {
	// 	return this.instanceProperty;
	// }

	runTask() {
		if(this.taskID < this.taskQueue.length){
			var currenTask = this.taskQueue[this.taskID]
			currenTask() // 这里执行当前任务的回调呢
			this.next() // 默认都同步任务处理
		} else {
			console.log('任务全部执行完毕');
		}
	}

	next(){
		this.taskID++
		// var me = this
		this.runTask()
	}
}

function newQuen() {
	return new NewQueue()
}

module.exports =  new NewQueue()
