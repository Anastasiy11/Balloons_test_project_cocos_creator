const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreLabel extends cc.Component {
    @property(cc.Label) scoreLabel: cc.Label = null;

    onLoad() {
        this.subscribe();
    }
    
    private updateScoreLabel(newScore: number) {
        this.scoreLabel.string = "Score: " + newScore;
    }

    private subscribe() {
        cc.systemEvent.on('score-updated', this.updateScoreLabel, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('score-updated', this.updateScoreLabel, this);
    }

    onDestroy() {
        this.unsubscribe();
    }  
}