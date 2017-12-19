
const DEFAULT_INTERVAL = 1000 / 60;
const STATE_INITIAL = 0;
const STATE_START = 1;
const STATE_STOP = 2;

/**
 * 时间轴，用来控制时间进度的工具类。
 * 可以随意暂停开始等
 * 还有定义执行的回调函数，这函数是外部调用时传入的。
 * 当指定时间到达时候可以回调;
 * 注意回归状态，及释放资源
 */
class Timeline {
	constructor() {
		this.animationHandler = 0;
		this.state = STATE_INITIAL;
	}

	/**
	 * 传入函数
	 */
	onenterframe() {

	}

	/**
	 * 
	 * @param {*} interval 
	 */
	start(interval) {
		if (this.state === STATE_START)
			return;
		this.state = STATE_START;
		this.interval = interval || DEFAULT_INTERVAL;
	}

	restart() {
		if (this.state === STATE_START)
			return;
		if (!this.dur || !this.interval)
			return;

		this.state = STATE_START;

		//无缝连接停止动画的状态
		startTimeline(this, +new Date() - this.dur);
	}

	stop() {
		if (this.state !== STATE_START)
			return;
		this.state = STATE_STOP;

		//如果动画开始过，则记录动画从开始到当前所经历的时间
		if (this.startTime) {
			this.dur = +new Date() - this.startTime;
		}
		cancelAnimationFrame(this.animationHandler);
	}

	startTimeline() {
		// 记录
		let lastTick = + new Date();
		timeline.startTime = startTime;
		nextTick.interval = timer.interval
		nextTick()

		function nextTick() {
			let now = +new Date()
			timeline.animationHandler = requestAnimationFrame(nextTick);
			if (now - lastTick >= timeline.interval) {
				timeline.onenterframe(now - startTime) // 执行，并传入时间点
				lastTick = now;
			}
		}
	}

}