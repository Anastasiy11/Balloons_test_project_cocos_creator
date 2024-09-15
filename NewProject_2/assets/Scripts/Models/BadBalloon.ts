import Balloon from "./Balloon";

const {ccclass} = cc._decorator;

@ccclass
export default class BadBalloon extends Balloon {

    burstBalloon(): void {
        if (this.isPaused || this.isGameOver) return;
        cc.systemEvent.emit('badBalloon');

        this.tween = cc.tween(this.node)
            .to(0.2, {scale: 0})
            .call(() => this.node.removeFromParent())
            .start();
    }

    animateBalloon(): void {
        this.tween = cc.tween(this.node)
            .to(this.balloonSpeed, {position: cc.v3(this.node.x, cc.winSize.height)})
            .call(() => {
                this.node.removeFromParent();
             })
            .start();
    }
}