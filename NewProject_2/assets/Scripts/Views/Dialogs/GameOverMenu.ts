import ScoreController from "../../Controllers/ScoreController";
import leaderboardStorage from "../../Utils/LeaderboardStorage";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameOverMenu extends cc.Component {
    @property(cc.Label) finalScoreLabel: cc.Label = null;
    @property(cc.Button) restartButton: cc.Button = null;
    @property(cc.Button) menuButton: cc.Button = null;
    @property(cc.Button) inputName: cc.Button = null;
    @property(cc.EditBox) playerNameInput: cc.EditBox = null;
    @property(ScoreController) scoreController: ScoreController = null;

    onLoad() {
        cc.systemEvent.on('game-over', this.finalScore, this);
    }

    public finalScore() {
        const finalScore = this.scoreController.getFinalScore();
        this.finalScoreLabel.string = 'Score: ' +  finalScore;
    }

    public savePlayer() {
        this.playerNameInput.node.active = true;

        const playerName = this.playerNameInput.string.trim();
        const finalScore = this.scoreController.getFinalScore();

        if (playerName) {
            leaderboardStorage.add(playerName, finalScore);
            this.playerNameInput.node.active = false;
        }
    }

    public restartGame() {
        cc.director.loadScene('Game_scene');
    }

    public goToMenu() {
        cc.director.loadScene('Menu_scene');
    }

    onDestroy() {
        cc.systemEvent.off('game-over', this.finalScore, this);
    }
}
