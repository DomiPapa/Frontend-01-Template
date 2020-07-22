// 管理多个动画，一个时间线中可以每一帧只调用一个函数，提升性能
export class Timeline {
  tick(){
    console.log("tick")
    requestAnimationFrame(() => this.tick())
  }

  start(){
    this.tick();
  }
}

export class Animation {

}

/*

let animation = new Animation(object, porperty, start, end, duration, delay, timingFuction)
let animation2 = new Animation(object, porperty, start, end, duration, delay, timingFuction)

let timeline = new Timeline

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

setTimeout
setInterval
requestAnimationFrame

*/