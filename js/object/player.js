import Bullet from 'bullet'
import DataBus from '../util/databus'
let databus = new DataBus()
export default class Player{
  constructor(x,y){
    this.x=x
    this.y=y
  }
  drawToCanvas(context) {
    context.beginPath()
    context.rect(this.x,this.y,30,30)
    context.fillStyle = 'rgba(0,255,0,1)'
    context.fill();
  }
  shoot(){
    let bullet=new Bullet(this.x+30,this.y+5)
    databus.bullets.push(bullet)
  }
}