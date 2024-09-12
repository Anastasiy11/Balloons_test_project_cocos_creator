
const { ccclass, property } = cc._decorator;

@ccclass
export default class gameOverMenu extends cc.Component {
    @property(cc.Label)
    finalScoreLabel: cc.Label = null;

    @property(cc.Button)
    restartButton: cc.Button = null;

    @property(cc.Button)
    menuButton: cc.Button = null;

    finalScore(score: number) {
        this.finalScoreLabel.string = 'Score: ' +  score;
    }
    
    restartGame() {
        cc.director.loadScene('Game_scene');
    }

    goToMenu() {
        cc.director.loadScene('Menu_scene');
    }
}
