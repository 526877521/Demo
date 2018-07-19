let Util = require("Util");
module.exports = {
    //没有取消按钮
    showTipsWithOkBtn(word, okCb, cancelCb, closeCb) {
        let scene = cc.director.getScene();
        if (scene) {
            let w = cc.view.getVisibleSize().width;
            let h = cc.view.getVisibleSize().height;
            cc.loader.loadRes("prefab/dialog/DialogLayer", function (err, prefab) {
                if (!err) {
                    let layer = cc.instantiate(prefab);
                    layer.x = w / 2;
                    layer.y = h / 2;
                    scene.addChild(layer);
                    let script = layer.getComponent("DialogLayer");
                    if (script) {
                        script.showTipsWithOkBtn(word, okCb, cancelCb, closeCb);
                    }
                }
            });
        }
    },
    //有取消按钮
    showTipsWithOkCancelBtn(word, okCb, cancelCb, closeCb, showCb) {
        let scene = cc.director.getScene();
        if (scene) {
            let w = cc.view.getVisibleSize().width;
            let h = cc.view.getVisibleSize().height;
            cc.loader.loadRes("prefab/dialog/DialogLayer", function (err, prefab) {
                if (!err) {
                    let layer = cc.instantiate(prefab);
                    layer.x = w / 2;
                    layer.y = h / 2;
                    scene.addChild(layer);
                    let script = layer.getComponent("DialogLayer");
                    if (script) {
                        script.showTipsWithOkCancelBtn(word, okCb, cancelCb, closeCb);
                    }
                    if(showCb){
                        showCb(layer);
                    }
                }
            });
        }
    },
    // 只有一个确定按钮
    showTipsWithOkBtnAndNoCloseBtn(word, okCb, cancelCb,showCb) {
        let scene = cc.director.getScene();
        if (scene) {
            let w = cc.view.getVisibleSize().width;
            let h = cc.view.getVisibleSize().height;
            cc.loader.loadRes("prefab/dialog/DialogLayer", function (err, prefab) {
                if (!err) {
                    let layer = cc.instantiate(prefab);
                    layer.x = w / 2;
                    layer.y = h / 2;
                    scene.addChild(layer);
                    let script = layer.getComponent("DialogLayer");
                    if (script) {
                        script.showTipsWithOkBtn(word, okCb, cancelCb);
                        script.setCloseBtnVisible();
                    }
                    if(showCb){
                        showCb(layer);
                    }
                }
            });
        }
    },
}