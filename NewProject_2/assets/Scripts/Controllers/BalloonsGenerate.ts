const { ccclass, property } = cc._decorator;

@ccclass
export default class BalloonsGenerate extends cc.Component {
    @property(cc.Prefab) balloonPrefab: cc.Prefab = null;
    @property(cc.Prefab) badBalloonPrefab: cc.Prefab = null;
    @property(cc.Node) generatorContainer: cc.Node = null;

    private isPaused: boolean = false;

    onLoad() {
        // TODO вынести в startGenerate вызывать из Game
        // TODO заенить schedule на Update cc.Component
        this.schedule(this.generateBalloons, 0.5);

        cc.systemEvent.on('game-over', this.gameOver, this);
        cc.systemEvent.on('pause-game', this.pauseGame, this);
        cc.systemEvent.on('resume-game', this.resumeGame, this);
    }

    protected update(dt: number): void {
        // cc.log("KEK")
    }

    public generateBalloons() {
        if (this.isPaused) return;

        let balloon = cc.instantiate(
            Math.random() < 0.2 
            ? this.badBalloonPrefab 
            : this.balloonPrefab)
       
        const screenWidth = this.generatorContainer.width;
        const balloonWidth = balloon.width;

        const minX = -screenWidth / 2 + balloonWidth / 2;
        const maxX = screenWidth / 2 - balloonWidth / 2;
        const randomX = minX + Math.random() * (maxX - minX);

        const startPosition = cc.v2(randomX, this.generatorContainer.position.y);

        balloon.setPosition(startPosition);
        balloon.active = true;

        this.generatorContainer.addChild(balloon);
    }

    public gameOver() {
        this.unschedule(this.generateBalloons);
    }

    public pauseGame() {
        this.isPaused = true;
    }

    public resumeGame() {
        this.isPaused = false;
    }

    onDestroy() {
        cc.systemEvent.off('game-over', this.gameOver, this);
        cc.systemEvent.off('pause-game', this.pauseGame, this);
        cc.systemEvent.off('resume-game', this.resumeGame, this);
    }
}