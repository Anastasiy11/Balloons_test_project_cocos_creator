// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import LeaderboardItem from "../../../Models/LeaderboardItem";
import LeaderBoardStorage from "../../../Utils/LeaderBoardStorage";
import LeaderboardItemNode from "./LeaderboardItemNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderboardNode extends cc.Component {
    @property(cc.Node) content: cc.Node = null;
    @property(cc.Prefab) leaderboardPrefab: cc.Prefab = null;


    // Использовать localStorage
    // cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    private testModel = [
        new LeaderboardItem("Витя", 1000),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Настя", 1),
        new LeaderboardItem("Данил", 0)
    ]

    public init() {
        // LeaderBoardStorage.getAll().forEach((leaderboardItem: LeaderboardItem) => {
        this.testModel.forEach((leaderboardItem: LeaderboardItem) => {
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
