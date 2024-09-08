
const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuController extends cc.Component {
    @property(cc.Prefab) leaderboardPrefab: cc.Prefab = null;

    private leaderboardPanel: cc.Node = null

    showLeaderboard() {
        if (!this.leaderboardPanel) {
            this.leaderboardPanel = cc.instantiate(this.leaderboardPrefab);
            this.leaderboardPanel.setPosition(cc.v2(0,0));
            this.node.addChild(this.leaderboardPanel);
        }

        this.leaderboardPanel.active = true;
    }

    hideLeaderboard() {
        if (this.leaderboardPanel) {
            this.leaderboardPanel.active = false;
        }
    }
}
