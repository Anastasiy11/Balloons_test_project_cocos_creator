
import LeaderboardNode from "../Views/Nodes/Leaderboards/LeaderboardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    @property(cc.Node) leaderboardNode: cc.Node = null;

    onLoad () {}
        
    public startGameButton () {
        cc.director.loadScene('Game_scene');
    }

    public showLeaderboardButton() {
        if (this.leaderboardNode.active == true) return

        this.leaderboardNode.active = true
        this.leaderboardNode.getComponent(LeaderboardNode).init()
    }
}
