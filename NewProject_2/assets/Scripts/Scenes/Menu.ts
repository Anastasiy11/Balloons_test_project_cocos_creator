// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LeaderboardNode from "../Views/Nodes/Leaderboards/LeaderboardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    @property(cc.Node) leaderboardNode: cc.Node = null;

    onLoad () {}
        
    public startGameButton () {
        cc.director.loadScene('Game_scene');
        cc.log("Start game");
    }

    public showLeaderboardButton() {
        if (this.leaderboardNode.active == true) return

        this.leaderboardNode.active = true
        this.leaderboardNode.getComponent(LeaderboardNode).init()
    }
}
