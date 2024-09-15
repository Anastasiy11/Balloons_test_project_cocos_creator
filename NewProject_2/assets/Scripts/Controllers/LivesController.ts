const { ccclass, property } = cc._decorator;

@ccclass
export default class LivesController extends cc.Component {
    @property([cc.Node]) lives: cc.Node[] = [];
    
    private currentLives: number = 0;

    onLoad() {
        this.currentLives = this.lives.length;
        this.subscribe();
    }
    
    private loselLife() {
        if (this.currentLives > 0) {
            this.currentLives--;
            this.lives[this.currentLives].active = false;
        }

        if (this.currentLives === 0) {
            this.gameOver();
        }
    }

    protected gameOver() {
        cc.systemEvent.emit('lives-over');
    }

    private subscribe() {
        cc.systemEvent.on('balloon-missed', this.loselLife, this);
        cc.systemEvent.on('badBalloon', this.loselLife, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('balloon-missed', this.loselLife, this);
        cc.systemEvent.off('badBalloon', this.loselLife, this);
    }

    onDestroy() {
        this.unsubscribe();
    }
}