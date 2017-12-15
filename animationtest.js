var imgUrl = './img/rabbit-big.png'
var positions = [
  '0 -854',
  '-174 -852',
  '-329 -852',
  '-524 -852',
  '-698 -852',
  '-873 -848'
]
var ele = document.getElementById('rabbit')
var animationo = window.animation;
var repeatAnimaiton = animation().loadImage([imgUrl]).changePosition(
	ele, positions, imgUrl
).repeatForever();

repeatAnimaiton.start(80)


// animation(ele, positions, imgUrl)
// function animation(ele, positions, imgUrl) {
//   var index = 0;
//   ele.style.backgroundImage = `url(${imgUrl})`
//   ele.style.backgroundRepeat = 'np-repeat'
//   function run(){
//     var posion = positions[index].split(' ');
//     ele.style.backgroundPosition = posion[0] + 'px '+ posion[1] + 'px'
//     index++;
//     if(index >= positions.length) index = 0
//     setTimeout(run, 80)
//   }
//   run()
// }
