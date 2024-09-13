
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreController extends cc.Component {
    @property(cc.Label) scoreLabel: cc.Label = null;

    public score: number = 0;

    onLoad() {
        cc.systemEvent.on('balloon-popped', this.incrementScore, this);
        this.score = 0;
    }

    public incrementScore() {
        this.updateScore(1);
    }

    public updateScore(points: number) {
        this.score += points;
        this.scoreLabel.string = "Score: " + this.score;
    }
    
    public getFinalScore(): number {
        return this.score;
    }

    onDestroy() {
        cc.systemEvent.off('balloon-popped', this.incrementScore, this);
    } 
}