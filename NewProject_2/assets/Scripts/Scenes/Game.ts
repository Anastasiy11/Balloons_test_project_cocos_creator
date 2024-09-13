
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node) pauseMenu: cc.Node = null;
    @property(cc.Node) gameOverMenu: cc.Node = null;

    private isPause: boolean = false;
    private isGameOver: boolean = false;

    onLoad() {
        cc.systemEvent.on('balloon-missed', this.gameOver, this);
        cc.systemEvent.on('badBalloon', this.gameOver, this);
        
        this.pauseMenu.active = false;
        this.gameOverMenu.active = false;
    }

    public onBalloonMissed() {
       if (!this.isPause && !this.isGameOver) {
            this.gameOver();
        }
    }

    public pauseGame() {
        this.isPause = true;
        this.pauseMenu.active = true;
        
        cc.systemEvent.emit('pause-game');
    }

    public resumeGame() {
        this.isPause = false;
        this.pauseMenu.active = false;
    }

    public gameOver() {
        this.gameOverMenu.active = true;
        cc.systemEvent.emit('game-over');
    }

    onDestroy() {
        cc.systemEvent.off('balloon-missed', this.gameOver, this);
        cc.systemEvent.off('badBalloon', this.gameOver, this);
    }
}