let Observer = require("Observer");
let ObserverMgr = require("ObserverMgr");
cc.Class({
    extends: Observer,

    properties: {
        label: {default: null, displayName: "", type: cc.Label},
    },

    // use this for initialization
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
        ObserverMgr.dispatchMsg("dispatchMsg", this.index)
    },
    onBtnClickDirect(){
        cc.director.loadScene("Index");
    },
    // called every frame
    update: function (dt) {

    },
});
