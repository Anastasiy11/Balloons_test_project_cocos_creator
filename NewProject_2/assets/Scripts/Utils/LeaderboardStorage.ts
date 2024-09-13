import LeaderboardItem from "../Models/LeaderboardItem";


const {ccclass} = cc._decorator;

@ccclass
export default class leaderboardStorage {
   public static add(playerName: string, points: number) {
        const playerData = {
            playerName: playerName,
            points: points
        };

        cc.sys.localStorage.setItem('playerData', JSON.stringify(playerData));
    }

   public static getAll(): LeaderboardItem {
        const playerData = JSON.parse(cc.sys.localStorage.getItem('playerData'));
        let leaderboardItem = new LeaderboardItem(playerData.playerName, playerData.points);

        return leaderboardItem;
    }
}
