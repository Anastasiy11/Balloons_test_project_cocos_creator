
const {ccclass, property} = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {

     onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);
        cc.systemEvent.on('pause-game', this.pauseBalloon, this);
        cc.systemEvent.on('resume-game', this.resumeBalloon, this);
     }

     burstBalloon(){
        cc.systemEvent.emit('balloon-popped');
        const scaleDown = cc.scaleTo(0.2, 0).easing(cc.easeBackIn());
        const remove = cc.callFunc(() => this.node.removeFromParent());

        this.node.runAction(cc.sequence(scaleDown, remove));
     }

     pauseBalloon() {
      this.node.pauseAllActions;
     }

     resumeBalloon() {
      this.node.resumeAllActions;
     }

     onDestroy(){
      cc.systemEvent.off('pause-game', this.pauseBalloon, this);
      cc.systemEvent.off('resume-game', this.resumeBalloon, this);
    }
}
