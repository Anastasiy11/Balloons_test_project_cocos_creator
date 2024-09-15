import BalloonsGenerate from "../Controllers/BalloonsGenerate";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node) pauseMenuNode: cc.Node = null;
    @property(cc.Node) gameOverMenuNode: cc.Node = null;
    @property(BalloonsGenerate) balloonsGenerate: BalloonsGenerate = null;

    onLoad() {
        this.subscribe();
        this.balloonsGenerate.startGenerate();
    }

    public pauseGameButton() {
        this.pauseMenuNode.active = true;
        cc.systemEvent.emit('pause-game');
    }

    public gameOver() {
        this.gameOverMenuNode.active = true;
        cc.systemEvent.emit('game-over');
    }

    private subscribe() {
        cc.systemEvent.on('lives-over', this.gameOver, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('lives-over', this.gameOver, this);
    }

    onDestroy() {
        this.unsubscribe()
    }
}