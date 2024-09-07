
const {ccclass, property} = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
   @property(cc.Prefab)
   balloonPrefab: cc.Prefab = null;

   start() {
      const balloon = cc.instantiate(this.balloonPrefab);

      this.node.addChild(balloon);
      this.animateBalloon(balloon);
   }

   animateBalloon(balloon: cc.Node) {
      cc.tween(balloon)
      .to(2, {position: cc.v3(0, cc.winSize.height / 2, 0)})
      .call(() => {
         balloon.destroy();
      })
      .start();
   }

     onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);

        cc.systemEvent.on('pause-game', this.pauseBalloon, this);
        cc.systemEvent.on('resume-game', this.animateBalloon, this);
     }

     protected onDestroy(): void {
        cc.systemEvent.off('pause-game', this.pauseBalloon, this);
        cc.systemEvent.off('resume-game', this.animateBalloon, this);
     }

     burstBalloon(){
        cc.systemEvent.emit('balloon-popped');
        const scaleDown = cc.scaleTo(0.2, 0).easing(cc.easeBackIn());
        const remove = cc.callFunc(() => this.node.removeFromParent());

        this.node.runAction(cc.sequence(scaleDown, remove));
     }

     pauseBalloon(balloon: cc.Node) {
      cc.tween(balloon)
      .stop();
     }
}
