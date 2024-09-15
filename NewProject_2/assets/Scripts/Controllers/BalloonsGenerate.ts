const { ccclass, property } = cc._decorator;

@ccclass
export default class BalloonsGenerate extends cc.Component {
    @property(cc.Prefab) balloonPrefab: cc.Prefab = null;
    @property(cc.Prefab) badBalloonPrefab: cc.Prefab = null;
    @property(cc.Node) generatorContainer: cc.Node = null;

    private balloonInterval: number = 0.5;
    private elapsedTime: number = 0;
    private isGenerateBalloons = false;

    public startGenerate() {
        this.subscribe();

        this.isGenerateBalloons = true;
        this.elapsedTime = 0;
    }

    protected update(dt: number): void {
        if (!this.isGenerateBalloons) return;
       this.elapsedTime += dt;

       if (this.elapsedTime >= this.balloonInterval) {
        this.generateBalloons();
        this.elapsedTime = 0;
       }
    }

    public generateBalloons() {
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

    public stopGenerate() {
        this.isGenerateBalloons = false;
    }
    
    private subscribe() {
        cc.systemEvent.on('game-over', this.stopGenerate, this);
        cc.systemEvent.on('pause-game', this.stopGenerate, this);
        cc.systemEvent.on('resume-game', this.startGenerate, this);
    }

    private unsubscribe() {
        cc.systemEvent.off('game-over', this.stopGenerate, this);
        cc.systemEvent.off('pause-game', this.stopGenerate, this);
        cc.systemEvent.off('resume-game', this.startGenerate, this);
    }
    
    onDestroy() {
        this.unsubscribe();
    }
}