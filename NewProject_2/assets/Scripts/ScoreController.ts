
const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreController extends cc.Component {
    @property(cc.Label)
    scoreLabel: cc.Label = null;

    score: number = 0;

    onLoad() {
        cc.systemEvent.on('balloon-popped', this.incrementScore, this);
        this.score = 0;
    }

    incrementScore() {
        this.updateScore(1);
    }

    updateScore(points: number) {
        this.score += points;
        this.scoreLabel.string = "Score: " + this.score;
    }

    resetScore() {
        this.score = 0;
        this.updateScore(0);
    }
    
    public getFinalScore(): number {
        return this.score;
    }

    onDestroy() {
        cc.systemEvent.off('balloon-popped', this.incrementScore, this);
    } 
}