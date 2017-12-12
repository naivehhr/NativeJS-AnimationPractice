'use strict'

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
  var timoutID = 0;
  // 是否加载超时的标志
  var isTimeout = false;
  // 对图片数组或对象进行遍历
  for(var key in images) {
    if(!images.hasOwnproperty(key)){
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