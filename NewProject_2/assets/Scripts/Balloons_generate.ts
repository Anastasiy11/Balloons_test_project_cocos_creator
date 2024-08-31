// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BalloonsGenerate extends cc.Component {

    @property(cc.Prefab)
    balloonPrefab: cc.Prefab = null;

    @property
    generateInterval: number = 1.5;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.schedule(this.generateBalloon, this.generateInterval);
     }

     generateBalloon(){
        const balloon = cc.instantiate(this.balloonPrefab);
        const xPosition = (Math.random() - 0.5) * this.node.width;

        balloon.setPosition(xPosition, -this.node.height/2);
        this.node.addChild(balloon);

        balloon.runAction(cc.moveBy(4, 0, this.node.height).easing(cc.easeIn(3.0)));
     }



    //start () {}

    

    // update (dt) {}
}
