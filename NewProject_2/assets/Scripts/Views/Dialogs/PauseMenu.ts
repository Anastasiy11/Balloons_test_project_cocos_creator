const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseMenu extends cc.Component {
    @property(cc.Button) resumeButton: cc.Button = null;
    @property(cc.Button) menuButton: cc.Button = null;
    @property(cc.Button) restartGameButton: cc.Button = null;

    public onResumeGame() {
        this.node.active = false;
        cc.systemEvent.emit('resume-game');
    }

    public goToMenu() {
        cc.director.loadScene('Menu_scene');
    }

    public restartGame() {
        cc.director.loadScene('Game_scene');
    }
}