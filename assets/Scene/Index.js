cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },
    onBtnClickDirect() {
        cc.director.loadScene("HelloWorld");
    }

    // update (dt) {},
});
