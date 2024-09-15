const {ccclass} = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    protected tween: cc.Tween <cc.Node>= null;
    protected isPaused: boolean = false;
    protected isGameOver: boolean = false;
    public balloonSpeed: number = 3;
  
    onLoad() {
        this.subscribe(); 
        this.animateBalloon();
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
        if (this.isPaused || this.isGameOver) return;
        cc.systemEvent.emit('balloon-popped');
        
        cc.tween(this.node)
            .to(0.2, {scale: 0})
            .call(() => this.node.removeFromParent())
            .start();
    }

    public stopBalloon() {
        if (this.tween) {
            cc.director.getActionManager().pauseTarget(this.node);
            this.isPaused = true;
        } 
    }
     
    public resumeBalloon() {
        if (this.isPaused){
            cc.director.getActionManager().resumeTarget(this.node);
        }
    
        this.isPaused = false;   
    }

    public onGameOver() {
        this.isGameOver = true;
        this.stopBalloon();
    }

    private subscribe() {
        cc.systemEvent.on('pause-game', this.stopBalloon, this);
        cc.systemEvent.on('resume-game', this.resumeBalloon, this);
        cc.systemEvent.on('game-over', this.onGameOver, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('pause-game', this.stopBalloon, this);
        cc.systemEvent.off('resume-game', this.resumeBalloon, this);
        cc.systemEvent.off('game-over', this.onGameOver, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this.burstBalloon, this);
    }

    onDestroy() {
        this.unsubscribe();
    }
}