export default class LeaderboardItemModel {
    private _playerName: string
    private _points: number

    get playerName() { return this._playerName }
    get points() { return this._points }

    constructor(playerName: string, points: number) {
        this._playerName = playerName
        this._points = points
    }
}