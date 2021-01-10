/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import InitUI from "./script/InitUI"
import Ioading from "./script/Ioading"
import GameUI from "./script/GameUI"
import RightHand from "./script/hander/RightHand"
import LeftHand from "./script/hander/LeftHand"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("script/InitUI.js",InitUI);
		reg("script/Ioading.js",Ioading);
		reg("script/GameUI.js",GameUI);
		reg("script/hander/RightHand.js",RightHand);
		reg("script/hander/LeftHand.js",LeftHand);
    }
}
GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode ="full";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "test/loading.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
