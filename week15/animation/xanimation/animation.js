// 管理多个动画，一个时间线中可以每一帧只调用一个函数，提升性能
export class Timeline2 {
  tick(){
    console.log("tick")
    requestAnimationFrame(() => this.tick())
  }

  start(){
    this.tick()
  }

}

export class Timeline {
  constructor(){
    this.animations = [];
  }
  tick(){
    let t = Date.now() - this.startTime;

    for(let animation of this.animations){
      if(t > animation.duration + animation.delay) // 已超时 什么也不做
        continue;
      let {object, template, porperty, start, end, timingFuction, delay} = animation;
      object[porperty] = template(timingFuction(start, end)(this.startTime - delay));
    }

    requestAnimationFrame(() => this.tick())
  }

  start(){
    this.startTime = Date.now();
    this.tick();
  }

  add(animation){
    this.animations.push(animation)
  }
}

export class Animation {
  constructor(object, porperty, template, start, end, duration, delay, timingFuction){
    this.object = object;
    this.template = template;
    this.porperty = porperty;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFuction = timingFuction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start);
    });
  }
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