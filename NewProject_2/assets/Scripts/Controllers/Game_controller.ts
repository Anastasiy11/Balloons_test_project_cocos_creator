const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Node)
    pauseMenu: cc.Node = null;

    @property(cc.Node)
    gameOverMenu: cc.Node = null;

    private score: number = 0;
    private isPause: boolean = false;
    private isGameOver: boolean = false;
    private balloonSpeed: number = 2;

    onLoad(){
        cc.systemEvent.on('balloon-popped', this.incrementScore, this);
        this.schedule(this.generateBalloon, 0.5);
        this.score = 0;
        this.pauseMenu.active = false;
        this.gameOverMenu.active = false;
        cc.systemEvent.on('resume-game', this.resumeGame, this);
    }

    start() {
        this.updateScore(0);
    }

    generateBalloon() {
        if(this.isPause || this.isGameOver) return;

        const balloon = cc.instantiate(this.balloonPrefab);

        const screenWidth = cc.winSize.width;
        const screenHeight = cc.winSize.height;
        const balloonWidth = balloon.width;

        const minX = -screenWidth / 2 + balloonWidth / 2;
        const maxX = screenWidth / 2 - balloonWidth / 2;
        const randomX = minX + Math.random() * (maxX - minX);

        const startPosition = cc.v2(randomX, -cc.winSize.height / 2);

        balloon.setPosition(startPosition);
        this.node.addChild(balloon);

        const moveUp = cc.moveBy(this.balloonSpeed, cc.v2(0, screenHeight));
        const remove = cc.callFunc(() => {
            if(balloon && balloon.isValid){
                this.onBalloonMissed();
            }

         balloon.destroy();
    });
    
    balloon.runAction(cc.sequence(moveUp, remove));
    }

    onBalloonMissed(){
        if(!this.isPause === true){
            this.gameOver();
        }
    }

    incrementScore(){
        this.updateScore(1);
        this.updateBalloonSpeed;
    }

    updateScore(points: number) {
        this.score += points;
        this.scoreLabel.string = "Score: " + this.score;
    }

    pauseGame() {
        this.isPause = true;
        this.pauseMenu.active = true;
        
        cc.director.getScheduler().pauseTarget(this);
        cc.director.pause;

        cc.systemEvent.emit('pause-game');
    }

    resumeGame() {
        this.isPause = false;
        this.pauseMenu.active = false;

        cc.director.getScheduler().resumeTarget(this);
        cc.director.resume;

    }

    updateBalloonSpeed(){
        if(this.score % 10 === 0){
             this.balloonSpeed * 0.9;
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.gameOverMenu.active = true;
        this.unschedule(this.generateBalloon);

        const gameOverScript = this.gameOverMenu.getComponent('game_over_menu');

        if(gameOverScript) {
            gameOverScript.finalScore(this.score);
        }
    }

    onDestroy() {
        cc.systemEvent.off('balloon-popped', this.incrementScore, this);
        cc.systemEvent.off('pause-game', this.pauseGame, this);
        cc.systemEvent.off('resume-game', this.resumeGame, this);
    }
}