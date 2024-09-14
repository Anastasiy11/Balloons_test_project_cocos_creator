const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    // TODO перейти на евенты
    // TODO pauseMenuNode
    @property(cc.Node) pauseMenu: cc.Node = null;
    // TODO gameOverMenuNode
    @property(cc.Node) gameOverMenu: cc.Node = null;

    onLoad() {
        this.subscribe()

        this.pauseMenu.active = false;
        this.gameOverMenu.active = false;
    }

    // Todo pauseGameButton
    public pauseGame() {
        this.pauseMenu.active = true;
        
        cc.systemEvent.emit('pause-game');
    }

    // Todo resumeGameButton
    public resumeGame() {
        this.pauseMenu.active = false;
    }

    public gameOver() {
        this.gameOverMenu.active = true;
        cc.systemEvent.emit('game-over');
    }

    private subscribe() {
        cc.systemEvent.on('balloon-missed', this.gameOver, this);
        cc.systemEvent.on('badBalloon', this.gameOver, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('balloon-missed', this.gameOver, this);
        cc.systemEvent.off('badBalloon', this.gameOver, this);
    }

    onDestroy() {
        this.unsubscribe()
    }
}