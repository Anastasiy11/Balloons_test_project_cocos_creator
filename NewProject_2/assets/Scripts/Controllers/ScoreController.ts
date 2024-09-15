
const { ccclass } = cc._decorator;

@ccclass
export default class ScoreController extends cc.Component {
    public score: number = 0;

    onLoad() {
        this.subscribe();
        this.score = 0;
    }

    protected incrementScore() {
        this.updateScore(1);
    }

    protected updateScore(points: number) {
        this.score += points;
        cc.systemEvent.emit('score-updated', this.score);
    }
    
    public getFinalScore(): number {
        return this.score;
    }

    private subscribe() {
        cc.systemEvent.on('balloon-popped', this.incrementScore, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('balloon-popped', this.incrementScore, this);
    }

    onDestroy() {
        this.unsubscribe();
    } 
}