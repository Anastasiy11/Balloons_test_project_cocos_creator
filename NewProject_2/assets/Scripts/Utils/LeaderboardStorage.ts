import LeaderboardItemModel from "../Models/LeaderboardItem";


const {ccclass} = cc._decorator;

@ccclass
export default class leaderboardStorage {
   public static add(playerName: string, points: number) {
        const playerData = {
            playerName: playerName,
            points: points
        };

        let scoresJson = cc.sys.localStorage.getItem('scoreData')
        if (scoresJson == null) {
            var list = []
            list.push(playerData)
            cc.sys.localStorage.setItem('scoreData', JSON.stringify(list));
            return
        }

        let score = JSON.parse(scoresJson)
        score.push(playerData)
 
        cc.sys.localStorage.setItem('scoreData', JSON.stringify(score));
    }

    public static getAll(): LeaderboardItemModel[] {
        let scoresJson = cc.sys.localStorage.getItem('scoreData')

        cc.log(scoresJson)
        if (scoresJson == null) return []
        
        const playerData = JSON.parse(scoresJson);
        //TODO прочитать про map
        return playerData.map(score => new LeaderboardItemModel(score.playerName, Number.parseInt(score.points)))
    }
}
