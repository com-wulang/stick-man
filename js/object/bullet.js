export default class Bullet {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  drawToCanvas(context) {
    context.beginPath()
    context.rect(this.x, this.y, 5, 5)
    context.fillStyle = 'rgba(255,0,0,1)'
    context.fill();
  }
  update(){
    this.x=this.x+10
  }
}