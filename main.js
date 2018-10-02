import './js/weapp-adapter'
import Player from './js/object/player'
import DataBus from './js/util/databus'
import StickMan from './js/object/stick-man'

let databus = new DataBus()
var context = canvas.getContext('2d')
var ctx=context
var x = 0,
  y = 0,
  xSmall = 0,
  ySmall = 0,
  xServer=0,
  yServer=0,
  xSmallServer=0,
  ySmallServer=0,
  r = 20,
  ifStickTouch = false,
  playerSpeed = 2,
  bigSmallD=0//遥感大小圆心的距离

export default class Main {
  constructor() {
    this.frame = 0
    this.player = new Player(0, 0)
    this.stickMan=new StickMan(200,200,10,'#000')
    this.bindLoop = this.loop.bind(this)
    // this.initEvent.bind(this)()
    this.initEvent()
    this.loop()
  }

  update() {
    let d = Math.pow(xSmall - x, 2) + Math.pow(ySmall - y, 2)
    bigSmallD = Math.sqrt(d)
    if (bigSmallD != 0 && ifStickTouch) {
      this.stickMan.x = (xSmall - x) * playerSpeed / bigSmallD + this.stickMan.x
      this.stickMan.y = (ySmall - y) * playerSpeed / bigSmallD + this.stickMan.y
    }
    databus.bullets.forEach((item) => {
      item.update()
    })
    if(this.frame%10==0){
      if (this.stickMan.state == 1) {
        this.stickMan.state = 2
      } else if (this.stickMan.state == 2) {
        this.stickMan.state = 1
      }
    }
  }

  render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // this.player.drawToCanvas(context)
    databus.bullets.forEach((item)=>{
      item.drawToCanvas(context)
    })
    if (ifStickTouch) {
      // 画操纵杆
      this.drawJoystick()
    }
    if (bigSmallD != 0 && ifStickTouch) {
      this.stickMan.drawToCanvas(ctx)
    }else{
      this.stickMan.usual(ctx)
    }
  }

  loop() {
    this.frame++
    this.update()
    this.render()
    window.requestAnimationFrame(this.bindLoop)
  }

  drawJoystick() {
    //画大圆
    context.beginPath()
    context.arc(x, y, 2 * r, 0, 2 * Math.PI);
    context.fillStyle = 'rgba(0,0,255,0.3)'
    context.fill();
    //画小圆
    context.beginPath()
    context.arc(xSmall, ySmall, r, 0, 2 * Math.PI);
    context.fillStyle = 'rgba(0,0,255,1)'
    context.fill();
  }

  static circleLineIntersect(x1, y1, r, xMove, yMove) {
    let d = Math.pow(xMove - x1, 2) + Math.pow(yMove - y1, 2)
    d = Math.sqrt(d)
    let position = new Object()
    position.x = x1 + ((xMove - x1) * r / d)
    position.y = y1 + ((yMove - y1) * r / d)
    return position
  }

  initEvent(){
    wx.onTouchStart(function (e) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
      if (x < canvas.width / 2) {
        xSmall = x
        ySmall = y
        ifStickTouch = true
        let msg = {
          ifStickTouch: true,
          x: x,
          y: y,
          xSmall: xSmall,
          ySmall: ySmall
        }
        // wx.sendSocketMessage({ data: JSON.stringify(msg) })
        wx.onTouchMove(function (e1) {
          let xMove = e1.touches[0].clientX
          let yMove = e1.touches[0].clientY
          let distance = Math.pow(xMove - x, 2) + Math.pow(yMove - y, 2)
          if (distance > (4 * r * r)) {
            let position = Main.circleLineIntersect(x, y, 2 * r, xMove, yMove)
            xSmall = position.x
            ySmall = position.y
          } else {
            xSmall = xMove
            ySmall = yMove
          }
          let msg = {
            x: x,
            y: y,
            xSmall: xSmall,
            ySmall: ySmall
          }
          // wx.sendSocketMessage({ data: JSON.stringify(msg) })
        })
      } else {
        if (this.stickMan.state == 1) {
          this.stickMan.state = 2
        } else if (this.stickMan.state == 2) {
          this.stickMan.state = 1
        }
      }
    }.bind(this))

    wx.onTouchEnd(function (e) {
      ifStickTouch = false
      // console.log(e.touches)
      // let xEnd = e.touches[0].clientX
      // let yEnd = e.touches[0].clientY
      // if(x<canvas.width/2){
      //   ifStickTouch = false
      // }
    })

    wx.onSocketMessage(function (res1) {
      let str = res1.data + ''
      if (str.substring(0, 1) == '@') {

      }
    })
  }
}

