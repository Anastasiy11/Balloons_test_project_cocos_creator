

import LeaderboardItem from "../../../Models/LeaderboardItem";
import leaderboardStorage from "../../../Utils/LeaderboardStorage";
import LeaderboardItemNode from "./LeaderboardItemNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderboardNode extends cc.Component {
    @property(cc.Node) content: cc.Node = null;
    @property(cc.Prefab) leaderboardPrefab: cc.Prefab = null;

    private scores: LeaderboardItem[] = [];

    public init() {
        this.scores = [
            leaderboardStorage.getAll()
        ];

        this.scores.forEach((leaderboardItem: LeaderboardItem) => {
            let node = cc.instantiate(this.leaderboardPrefab)

            let leaderboardItemNodeComponent = node.getComponent(LeaderboardItemNode)
            leaderboardItemNodeComponent.init(leaderboardItem)

            this.content.addChild(node)
        })
    }

    public exitButton() {
        this.node.active = false
    }
}
