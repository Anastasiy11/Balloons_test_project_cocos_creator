const { ccclass, property } = cc._decorator;

@ccclass
export default class BalloonsGenerate extends cc.Component {
    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null;

    private isPaused: boolean = false;

    onLoad() {
        this.schedule(this.generateBalloons, 0.5);

        cc.systemEvent.on('game-over', this.gameOver, this);
        cc.systemEvent.on('pause-game', this.pauseGame, this);
        cc.systemEvent.on('resume-game', this.resumeGame, this);
    }

    generateBalloons() {
        if(this.isPaused) return;

        const balloon = cc.instantiate(this.balloonPrefab);

        const screenWidth = cc.winSize.width;
        const balloonWidth = balloon.width;

        const minX = -screenWidth / 2 + balloonWidth / 2;
        const maxX = screenWidth / 2 - balloonWidth / 2;
        const randomX = minX + Math.random() * (maxX - minX);

        const startPosition = cc.v2(randomX, this.node.position.y);

        balloon.setPosition(startPosition);
        balloon.active = true;

        this.node.addChild(balloon);
    }

    gameOver() {
        this.unschedule(this.generateBalloons);
    }

    pauseGame() {
        this.isPaused = true;
    }

    resumeGame() {
        this.isPaused = false;
    }

    onDestroy() {
        cc.systemEvent.off('game-over', this.gameOver, this);
        cc.systemEvent.off('pause-game', this.pauseGame, this);
        cc.systemEvent.off('resume-game', this.resumeGame, this);
    }
}