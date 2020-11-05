/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameUI from "./script/GameUI"
import Right from "./script/hander/Right"
import Left from "./script/hander/Left"
import LeftHand from "./script/hander/LeftHand"
import RightHand from "./script/hander/RightHand"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("script/GameUI.js",GameUI);
		reg("script/hander/Right.js",Right);
		reg("script/hander/Left.js",Left);
		reg("script/hander/LeftHand.js",LeftHand);
		reg("script/hander/RightHand.js",RightHand);
    }
}
GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode ="full";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "test/TestScene.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
