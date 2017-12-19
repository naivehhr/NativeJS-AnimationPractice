import MQ from './newqueue.js'
MQ.add(tt(111111)).add(tt(21111)).execute()

function tt(i) {
	return () => {
		console.log('执行的任务=>'+i)
	}
}