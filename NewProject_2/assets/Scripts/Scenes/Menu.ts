
import LeaderboardNode from "../Views/Nodes/Leaderboards/LeaderboardNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    @property(cc.Node) leaderboardPanelNode: cc.Node = null;
        
    public startGameButton () {
        cc.director.loadScene('Game_scene');
    }

    public showLeaderboardButton() {
        if (this.leaderboardPanelNode.active == true) return

        this.leaderboardPanelNode.active = true
        this.leaderboardPanelNode.getComponent(LeaderboardNode).init()
    }
}
