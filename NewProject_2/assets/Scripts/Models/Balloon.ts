const {ccclass} = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    private tween: cc.Tween <cc.Node>= null;
    private isPaused: boolean = false;
    public balloonSpeed: number = 3;
  
    onLoad() {
        this.animateBalloon();

        cc.systemEvent.on('pause-game', this.pauseBalloon, this);
        cc.systemEvent.on('resume-game', this.resumeBalloon, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);
    }
         
    public animateBalloon() {
        this.tween = cc.tween(this.node)
            .to(this.balloonSpeed, {position: cc.v3(this.node.x, cc.winSize.height)})
            .call(() => {
                this.node.removeFromParent();
                cc.systemEvent.emit('balloon-missed');
            
            })
            .start();
    }

    public burstBalloon() {
        cc.systemEvent.emit('balloon-popped');
        
        cc.tween(this.node)
            .to(0.2, {scale: 0})
            .call(() => this.node.removeFromParent())
            .start();
    }

    public pauseBalloon() {
         if (this.tween) {
            cc.Tween.stopAll();
            this.isPaused = true;
        } 
    }
     

    public resumeBalloon() {
        if(this.isPaused){
            this.animateBalloon();
        }
    
        this.isPaused = false;   
    }

    onDestroy() {
        cc.systemEvent.off('pause-game', this.pauseBalloon, this);
        cc.systemEvent.off('resume-game', this.animateBalloon, this);   
  }
}