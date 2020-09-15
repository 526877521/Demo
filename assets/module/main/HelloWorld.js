let Observer = require("Observer");
let ObserverMgr = require("ObserverMgr");
let Tips = require("Tips");
let DialogMgr = require("DialogMgr");

cc.Class({
    extends: Observer,

    properties: {
        label: {default: null, displayName: "", type: cc.Label},
    },


    onLoad: function () {
        this.index = 0;
        this._initMsg();
    },
    _getMsgList() {
        return [
            "dispatchMsg"
        ]

    },
    _onMsg(msg, data) {
        if (msg === "dispatchMsg") {
            this.label.string = data;
        }
    },
    onBtnClickDispatchMsg() {
        this.index++;
        ObserverMgr.dispatchMsg("dispatchMsg", this.index);
        Tips.show("你好");
       /* DialogMgr.showTipsWithOkCancelBtn("你好", () => {
            console.log("点击确定按钮");
        }, () => {
            console.log("点击取消按钮");
        }, () => {
            console.log("点击关闭按钮");
        })*/
    },
    onBtnClickDirect() {
        cc.director.loadScene("Index");
    },
    // called every frame
    update: function (dt) {

    },
});
