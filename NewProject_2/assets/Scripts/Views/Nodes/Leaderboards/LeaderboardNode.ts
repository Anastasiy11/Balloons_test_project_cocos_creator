

import LeaderboardItemModel from "../../../Models/LeaderboardItem";
import leaderboardStorage from "../../../Utils/LeaderboardStorage";
import LeaderboardItemNode from "./LeaderboardItemNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderboardNode extends cc.Component {
    @property(cc.Node) content: cc.Node = null;
    @property(cc.Prefab) leaderboardPrefab: cc.Prefab = null;

    private scores: LeaderboardItemModel[] = [];

    public init() {
        this.initScoresData()
        this.showLeaderboardViewItems()
    }

    public exitButton() {
        this.node.active = false
    }

    private initScoresData() {
        this.scores = leaderboardStorage.getAll()
    } 

    private addLeaderboardViewItem(leaderboardItem: LeaderboardItemModel) {
        let node = cc.instantiate(this.leaderboardPrefab)

        let leaderboardItemNodeComponent = node.getComponent(LeaderboardItemNode)
        leaderboardItemNodeComponent.init(leaderboardItem)

        this.content.addChild(node)
    }

    private showLeaderboardViewItems() {
        this.scores.forEach(scores => this.addLeaderboardViewItem(scores))
    }
}
