import ScoreController from "../ScoreController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    @property(ScoreController)
    scoreController: ScoreController = null;

    @property(cc.Node)
    pauseMenu: cc.Node = null;

    @property(cc.Node)
    gameOverMenu: cc.Node = null;

    private isPause: boolean = false;
    private isGameOver: boolean = false;


    onLoad() {
        cc.systemEvent.on('balloon-missed', this.gameOver, this);
        
        this.pauseMenu.active = false;
        this.gameOverMenu.active = false;
        
        this.scoreController.resetScore();
    }

    onBalloonMissed() {
       if (!this.isPause && !this.isGameOver) {
            this.gameOver();
        }
    }

    pauseGame() {
        this.isPause = true;
        this.pauseMenu.active = true;
        
        cc.systemEvent.emit('pause-game');
    }

    resumeGame() {
        this.isPause = false;
    }

    gameOver() {
        this.gameOverMenu.active = true;
        cc.systemEvent.emit('game-over');

        const finalScore = this.scoreController.getFinalScore();
        const gameOverScript = this.gameOverMenu.getComponent('game_over_menu');
    
        if (gameOverScript) {
            gameOverScript.finalScore(finalScore);
        }
    }

    onDestroy() {
        cc.systemEvent.off('balloon-missed', this.gameOver, this);
    }
}