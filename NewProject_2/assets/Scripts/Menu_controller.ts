// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    leaderboardPrefab: cc.Prefab = null;

    private leaderboardPanel: cc.Node = null

    start () {

    }

    showLeaderboard(){
        if(!this.leaderboardPanel){
            this.leaderboardPanel = cc.instantiate(this.leaderboardPrefab);
            this.leaderboardPanel.setPosition(cc.v2(0,0));
            this.node.addChild(this.leaderboardPanel);
        }

        this.leaderboardPanel.active = true;
    }

    hideLeaderboard(){
        if(this.leaderboardPanel){
            this.leaderboardPanel.active = false;
        }
    }

    // update (dt) {}
}
