let ObserverMgr = require("ObserverMgr");
//let GameCfg = require("GameNetCfg");
let Util = require('Util');
module.exports = {
    ws: null,
    isNetOpen: false,
    heartID: null,
    init() {
        if (this.ws === null) {
           // let url = GameCfg.getSockUrl();
            console.log("[Socket] con url:" + url);
            this.ws = new WebSocket("192");
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onclose = this.onClose.bind(this);
        } else {
            console.log("[Socket] has init");
        }
    },

    _onHeartBeat() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // this.send(GameNetMessage.send.heart, {});
        }
    },
    _beganHeartBeat() {
        this._cleanHeartBeat();
        // 30s心跳
        this.heartID = setInterval(this._onHeartBeat.bind(this), 1000 * 30);
    },
    _cleanHeartBeat() {
        if (this.heartID !== null) {
            clearInterval(this.heartID);
            this.heartID = null;
        }
    },
    onOpen: function () {
        console.log("[Socket] Open: " + this._getTime());
        this.isNetOpen = true;
        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Open, null);
        this._beganHeartBeat();
    },
    onError: function () {
        console.log("[Socket] Error: " + this._getTime());
        this.ws = null;
        this.isNetOpen = false;
        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Error, null);
        this._cleanHeartBeat();
    },
    onClose: function () {
        console.log("[Socket] Close: " + this._getTime());
        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Close, null);
        this.ws = null;
        this.isNetOpen = false;
        this._cleanHeartBeat();
        this.init();
    },
    onMessage: function (event) {
        let receiveData = null;
        try {
            receiveData = JSON.parse(event.data);
        } catch (e) {
            // console.log(e);
            receiveData = null;
        }
        if (receiveData !== null) {
            let msg = receiveData[0];

            let netData = GameMsgSocket.getRecvDataByCode(msg);
            if (netData) {
                let code = receiveData[1];
                let data = receiveData[2];
                this._showRecvData(netData.msg, receiveData);
                ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Recv, receiveData);
                if (code === undefined) {
                    console.log("[SocketMgr] 缺少Code字段");
                } else {
                    if (code === 0) {
                        if (netData) {
                            ObserverMgr.dispatchMsg(netData.msg, data);
                        }
                    } else {
                        console.log("[SocketMgr] netData 错误码: " + code);
                        let errString = receiveData.msg;
                        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.MsgErr, [code, netData.msg, data, errString]);
                    }
                }
            } else {
                console.log("[SocketMgr] 客户端未发现网络配置: " + event.data);
            }
        } else {
            console.log("[Socket] 服务器返回数据不是json格式: " + event.data);
        }
    },
    send(msg, data) {
        if (this.ws) {
            if (this.ws.readyState === WebSocket.OPEN) {
                let code = msg.code;
                let sendData = [code, data];
                this._showSendData(msg.msg, data);
                this.ws.send(JSON.stringify(sendData));
            } else {
                console.log("[Socket] 网络失去连接");
            }
        } else {
            console.log("网络连接出现问题:可能没有初始化网络,或网络失去连接!");
        }
    },
    _showSendData(msg, data) {
        // if (msg === GameNetMessage.send.heart) {
        //     return;
        // }
        let dataStr = data;
        let msgStr = msg.msg;
        let sendData = {time: this._getTime(), msg: msgStr, data: dataStr};
        if (cc.sys.isBrowser) {
            console.log("[Socket===>]%c %s ", "color:green;font-weight:bold;", JSON.stringify(sendData));
        } else {
            console.log("[Socket===>]%s ", JSON.stringify(sendData));
        }
    },
    _showRecvData(msg, data) {
        let recvData = {time: this._getTime(), msg: msg, data: data};
        if (cc.sys.isBrowser) {
            console.log("[Socket<===]%c %s", "color:red;font-weight:bold;", JSON.stringify(recvData));
        } else {
            console.log("[Socket<===]%s", JSON.stringify(recvData));

        }
    },
    _getTime() {
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        return hour + ":" + min + ":" + sec;
    },

}