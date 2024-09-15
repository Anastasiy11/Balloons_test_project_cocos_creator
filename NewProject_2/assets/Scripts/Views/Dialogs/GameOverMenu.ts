import ScoreController from "../../Controllers/ScoreController";
import leaderboardStorage from "../../Utils/LeaderboardStorage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverMenu extends cc.Component {
    @property(cc.Label) finalScoreLabel: cc.Label = null;
    @property(cc.EditBox) playerNameInput: cc.EditBox = null;
    @property(ScoreController) scoreController: ScoreController = null;

    onLoad() {
        this.subscribe();
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

    public restartGameButton() {
        cc.director.loadScene('Game_scene');
    }

    public goToMenuButton() {
        cc.director.loadScene('Menu_scene');
    }

    private subscribe() {
        cc.systemEvent.on('game-over', this.finalScore, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('game-over', this.finalScore, this);
    }

    onDestroy() {
        this.unsubscribe();
    }
}
