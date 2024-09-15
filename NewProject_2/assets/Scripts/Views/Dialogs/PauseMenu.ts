const {ccclass} = cc._decorator;

@ccclass
export default class PauseMenu extends cc.Component {
   
    public resumeGameButton() {
        this.node.active = false;
        cc.systemEvent.emit('resume-game');
    }

    public goToMenuButton() {
        cc.director.loadScene('Menu_scene');
    }

    public restartGameButton() {
        cc.director.loadScene('Game_scene');
    }
}