let ObserverMgr = require("ObserverMgr");
//let GameCfg = require("GameNetCfg");
//let DataEnCode = require('DataEnCode');
let DialogMgr = require('DialogMgr');
//let Native = require("Native");
module.exports = {
    // 保存上次的请求
    _tmpQuest: {
        msg: null,
        data: null,
    },
    quest(msg, data) {
        // 暂定按钮点击都会发送请求  按钮点击在这里处理
        let clientType = require('Util').getClientType();
        let version = require('GameLocalStorage').getCurVersion();
        //let channel = require('GameNetCfg').getCurServer().channel;
        data.clientType = clientType;
        data.version =version;
        data.channel = "123";

        this._tmpQuest.msg = msg;
        this._tmpQuest.data = data;
        /*if (Native.getNetIsConnect() === false) {
            ObserverMgr.dispatchMsg(GameMsgGlobal.Net.DisConn, null);
            return;
        }*/

        //let url = GameCfg.getHttpUrl();
        // console.log('[Http] con url: ' + url);
        this._showSendData(msg, data);
        let xhr = new XMLHttpRequest();
        xhr.ontimeout = this._onTimeout.bind(this);
        xhr.timeout = 6000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && ((xhr.status >= 200 && xhr.status < 400))) {
                let text = xhr.responseText;
                // console.log("[HTTP===<] " + text);
                let result = JSON.parse(text);
                ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Recv, result);
                // let netMsg = msg.msg;
                let msgID = result[0];
                let msgCode = result[1];
                let msgData = result[2];
                let msgStr = GameMsgHttp.getMsgById(msgID);
                this._showRecvData(msgStr, msgCode, msgData);

                if (msgCode !== undefined && msgStr !== null) {
                    if (msgCode === GameMsgGlobal.NetCode.SuccessHttp.id) {
                        ObserverMgr.dispatchMsg(msgStr, msgData);
                    } else {
                        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.MsgErr, result);
                    }
                } else {
                    console.log("[Http] 缺少code字段");
                }
            } else {
                // console.log("NetHttpMgr error :" + xhr.readyState);
            }
        }.bind(this);

        xhr.onerror = function (err) {
            //ObserverMgr.dispatchMsg(GameMsgGlobal.Net.DisConn, null);
            this._onTimeout();
        }.bind(this);

        let enCodeData = {
            msg_id: msg.id,
            data: data,
        };
        //let sendData = DataEnCode.encodeHttp(enCodeData);
        let dataStr = JSON.stringify(enCodeData);
        xhr.open("post", url, true);
        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.Send, null);
        try {
            xhr.send(dataStr);
        } catch (e) {
            // 似乎捕获不到
            console.log("网络超时");
        }
    },
    _showRecvData(msg, code, data) {
        let recvData = {time: this._getTime(), msg: msg, code: code, data: data};
        if (cc.sys.isBrowser) {
            console.log("[Http<===]%c %s", "color:blue;font-weight:bold;", JSON.stringify(recvData));
        } else {
            console.log("[Http<===]%s", JSON.stringify(recvData));

        }
    },
    _showSendData(msg, data) {
        let dataStr = data;
        let msgStr = msg.msg;
        let sendData = {time: this._getTime(), msg: msgStr, msgID: msg.id, data: dataStr};
        if (cc.sys.isBrowser) {
            console.log("[Http===>]%c %s ", "color:green;font-weight:bold;", JSON.stringify(sendData));
        } else {
            console.log("[Http===>]%s ", JSON.stringify(sendData));
        }
    },
    _getTime() {
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        return hour + ":" + min + ":" + sec;
    },
    _onTimeout() {
        console.log('[HTTP] %c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
        ObserverMgr.dispatchMsg(GameMsgGlobal.Net.TimeOut, null);
        DialogMgr.showTipsWithOkBtnAndNoCloseBtn(
            "网络连接失败,是否重试?",
            function () {
                // 重新请求之前的数据
                let msg = this._tmpQuest.msg;
                let data = this._tmpQuest.data;
                if (msg !== null && data !== null) {
                    this.quest(msg, data);
                }
            }.bind(this),
            null,
            function (node) {
                require('Util').reZorderToTop(node);
            });
    },
};
