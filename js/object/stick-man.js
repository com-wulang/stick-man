import DataBus from '../util/databus'
let databus = new DataBus()
export default class StickMan {
  constructor(x, y,r) {
    this.x = x //200
    this.y = y //200
    this.r = r //10
    this.state=1
  }

  drawToCanvas(ctx) {
    if(this.state==1){
      this.usual(ctx)
      // this.state++
    }else if(this.state==2){
      this.punch(ctx)
    }
  }
  //通常情况
  usual(ctx){
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.lineWidth = 5;
    ctx.lineCap = "round"
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.r); //脖子位置
    ctx.lineTo(this.x, this.y + this.r + this.r * 2); //身体

    ctx.lineTo(this.x + this.r / 2 * 3, this.y + this.r * 2 + this.r * 3); //脚

    ctx.moveTo(this.x, this.y + this.r + this.r * 2); //脚
    ctx.lineTo(this.x - this.r / 2 * 3, this.y + this.r * 2 + this.r * 3);

    ctx.moveTo(this.x, this.y + this.r); //手
    ctx.lineTo(this.x + this.r / 4 * 3, this.y + this.r + this.r / 4 * 3);
    ctx.lineTo(this.x + this.r * 2, this.y + this.r + this.r / 4 * 3);

    ctx.moveTo(this.x, this.y + this.r); //手
    ctx.lineTo(this.x - this.r, this.y + this.r + this.r / 2 * 3);
    ctx.lineTo(this.x + this.r, this.y + this.r + this.r / 2 * 3);

    ctx.stroke();

  }
  // 出拳
  punch(ctx) {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255,255,255,1)'
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.lineWidth = 5;
    ctx.lineCap = "round"
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.r); //脖子位置
    ctx.lineTo(this.x, this.y + this.r + this.r * 2); //身体

    ctx.lineTo(this.x + this.r / 2 * 3, this.y + this.r * 2 + this.r * 3); //脚

    ctx.moveTo(this.x, this.y + this.r + this.r * 2); //脚
    ctx.lineTo(this.x - this.r / 2 * 3, this.y + this.r * 2 + this.r * 3);

    ctx.moveTo(this.x, this.y + this.r); //手
    // ctx.lineTo(this.x + this.r / 4 * 3, this.y + this.r + this.r / 4 * 3);
    ctx.lineTo(this.x + this.r * 3, this.y + this.r);

    ctx.moveTo(this.x, this.y + this.r); //手
    ctx.lineTo(this.x - this.r, this.y + this.r + this.r / 2 * 3);
    ctx.lineTo(this.x + this.r, this.y + this.r + this.r / 2 * 3);

    ctx.stroke();

  }
}