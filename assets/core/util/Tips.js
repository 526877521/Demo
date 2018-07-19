module.exports = {
    _logView: null,
    show(str) {
        // 跳转场景会销毁logView
        if (this._logView && this._logView.isValid === false) {
            this._logView = null;
        }
        if (this._logView === null) {
            let scene = cc.director.getScene();
            if (scene) {
                let w = cc.view.getVisibleSize().width;
                let h = cc.view.getVisibleSize().height;
                cc.loader.loadRes("prefab/log/LogView", function (err, prefab) {
                    if (!err) {
                        let layer = cc.instantiate(prefab);
                        /*layer.x = w / 2;
                        layer.y = 0;*/
                        layer.x = w / 2;
                        layer.y = h / 2;
                        scene.addChild(layer);
                        /*  let action = cc.moveTo(0.3, cc.p(568, 320));
                          layer.runAction(action);*/
                        let script = layer.getComponent("LogView");
                        if (script) {
                            this._logView = script;
                            script.addLog(str);
                        }
                    }
                }.bind(this));
            }
        } else {
            //let action = cc.moveTo(0.3, cc.p(568, 320));
            let parent = this._logView.node.parent;
            //this._logView.node.setPosition(568, 0);
            //this._logView.node.runAction(action);
            let childrenLen = parent.children.length;
            this._logView.addLog(str);
            this._logView.node.setLocalZOrder(childrenLen);
        }
    }
};
