// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
import LeaderboardItem from "../../../Models/LeaderboardItem"

const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderboardItemNode extends cc.Component {

    @property(cc.Label) nameLabel: cc.Label = null;
    @property(cc.Label) pointLabel: cc.Label = null;

    public init(leaderboardItem: LeaderboardItem): void {
        this.nameLabel.string = leaderboardItem.playerName
        this.pointLabel.string = leaderboardItem.points.toString()
    }
}
