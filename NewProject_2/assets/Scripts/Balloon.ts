
const {ccclass, property} = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {

     onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);
     }

     burstBalloon(){
        cc.systemEvent.emit('balloon-popped');
        const scaleDown = cc.scaleTo(0.2, 0).easing(cc.easeBackIn());
        const remove = cc.callFunc(() => this.node.removeFromParent());

        this.node.runAction(cc.sequence(scaleDown, remove));
     }
}
