window.__require = function e(t, o, s) {
function i(r, a) {
if (!o[r]) {
if (!t[r]) {
var c = r.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!a && l) return l(c, !0);
if (n) return n(c, !0);
throw new Error("Cannot find module '" + r + "'");
}
r = c;
}
var g = o[r] = {
exports: {}
};
t[r][0].call(g.exports, function(e) {
return i(t[r][1][e] || e);
}, g, g.exports, e, t, o, s);
}
return o[r].exports;
}
for (var n = "function" == typeof __require && __require, r = 0; r < s.length; r++) i(s[r]);
return i;
}({
ButtonScaler: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5cc63s8F7lPCLT+AdcqP7mg", "ButtonScaler");
cc.Class({
extends: cc.Component,
properties: {
pressedScale: .9,
time: .1
},
onLoad: function() {
var e = this;
this.initScale = this.node.scale;
this.downAction = new cc.ScaleTo(this.time, this.pressedScale);
this.upAction = new cc.ScaleTo(this.time, this.initScale);
this.node.on(cc.Node.EventType.TOUCH_START, function() {
this.stopAllActions();
this.runAction(e.downAction);
this.opacity = 255;
return !0;
}, this.node);
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.stopAllActions();
this.runAction(e.upAction);
this.opacity = 255;
}, this.node);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
this.stopAllActions();
this.runAction(e.upAction);
this.opacity = 255;
}, this.node);
this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {}, this.node);
}
});
cc._RF.pop();
}, {} ],
ComUIBg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "38322XPHb9FLKLi3XkrmCXr", "ComUIBg");
cc.Class({
extends: cc.Component,
properties: {
bgNode: {
displayName: "背景节点",
default: null,
type: cc.Node
}
},
onLoad: function() {
var e = cc.view.getVisibleSize().width, t = cc.view.getVisibleSize().height;
this.bgNode.width = e;
this.bgNode.height = t;
this.bgNode.on(cc.Node.EventType.MOUSE_ENTER, function(e) {
e.stopPropagation();
e.stopPropagationImmediate();
return !1;
}.bind(this));
this.bgNode.on(cc.Node.EventType.MOUSE_LEAVE, function(e) {
e.stopPropagation();
e.stopPropagationImmediate();
return !1;
}.bind(this));
this.bgNode.on(cc.Node.EventType.MOUSE_WHEEL, function(e) {
e.stopPropagation();
e.stopPropagationImmediate();
}.bind(this));
},
start: function() {},
addUI: function(e) {
var t = cc.instantiate(e);
t.x = t.y = 0;
this.node.addChild(t);
return t;
}
});
cc._RF.pop();
}, {} ],
DialogMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "49e1ba7Z/RCPLkkLRCNWLRp", "DialogMgr");
e("Util");
t.exports = {
showTipsWithOkBtn: function(e, t, o, s) {
var i = cc.director.getScene();
if (i) {
var n = cc.view.getVisibleSize().width, r = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(a, c) {
if (!a) {
var l = cc.instantiate(c);
l.x = n / 2;
l.y = r / 2;
i.addChild(l);
var g = l.getComponent("DialogLayer");
g && g.showTipsWithOkBtn(e, t, o, s);
}
});
}
},
showTipsWithOkCancelBtn: function(e, t, o, s, i) {
var n = cc.director.getScene();
if (n) {
var r = cc.view.getVisibleSize().width, a = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(c, l) {
if (!c) {
var g = cc.instantiate(l);
g.x = r / 2;
g.y = a / 2;
n.addChild(g);
var h = g.getComponent("DialogLayer");
h && h.showTipsWithOkCancelBtn(e, t, o, s);
i && i(g);
}
});
}
},
showTipsWithOkBtnAndNoCloseBtn: function(e, t, o, s) {
var i = cc.director.getScene();
if (i) {
var n = cc.view.getVisibleSize().width, r = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(a, c) {
if (!a) {
var l = cc.instantiate(c);
l.x = n / 2;
l.y = r / 2;
i.addChild(l);
var g = l.getComponent("DialogLayer");
if (g) {
g.showTipsWithOkBtn(e, t, o);
g.setCloseBtnVisible();
}
s && s(l);
}
});
}
}
};
cc._RF.pop();
}, {
Util: "Util"
} ],
GameLocalStorage: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "033a1DVjMVOeq/WP+wmvOA3", "GameLocalStorage");
t.exports = {
catchKey: "gameCatchKey",
catchData: {
curVer: "1.0",
newVer: "1.0",
localName: "",
localPwd: "",
userPhone: "",
visitorToken: null,
userToken: null,
musicVolume: 1,
effectVolume: 1,
noticeShowTime: null,
serverEnterCode: null
},
_isInit: !1,
initLocalStorage: function() {
if (!1 === this._isInit) {
this._isInit = !0;
var e = cc.sys.localStorage.getItem(this.catchKey);
if (e) {
var t = JSON.parse(e);
this.catchData.curVer = t.curVer;
this.catchData.newVer = t.newVer;
this.catchData.userPhone = t.userPhone;
this.catchData.visitorToken = t.visitorToken;
this.catchData.userToken = t.userToken;
this.catchData.musicVolume = void 0 === t.musicVolume ? 1 : t.musicVolume;
this.catchData.effectVolume = void 0 === t.effectVolume ? 1 : t.effectVolume;
this.catchData.noticeShowTime = void 0 === t.noticeShowTime ? new Date() : t.noticeShowTime;
this.catchData.serverEnterCode = t.serverEnterCode;
} else {
this.catchData.curVer = "1.0";
this.catchData.newVer = "1.0";
}
} else console.log("[GameLocalStorage] has init");
},
setServerEnterCode: function(e) {
this.catchData.serverEnterCode = e;
this._save();
},
getServerEnterCode: function() {
return this.catchData.serverEnterCode;
},
updateNoticeShowTime: function() {
this.catchData.noticeShowTime = new Date();
this._save();
},
_save: function() {
var e = JSON.stringify(this.catchData);
cc.sys.localStorage.setItem(this.catchKey, e);
},
getEffectVolume: function() {
var e = this.catchData.effectVolume;
void 0 === e && (e = 1);
return e;
},
getMusicVolume: function() {
var e = this.catchData.musicVolume;
void 0 === e && (e = 1);
return e;
},
setVolume: function(e, t) {
this.catchData.musicVolume = e;
this.catchData.effectVolume = t;
this._save();
},
setVersion: function(e, t) {
this.initLocalStorage();
this.catchData.curVer = e.toString();
this.catchData.newVer = t.toString();
this._save();
},
getCurVersion: function() {
this.initLocalStorage();
return this.catchData.curVer;
},
setLocalSaveNameAndPwd: function(e, t) {
this.catchData.localName = e;
this.catchData.localPwd = t;
this._save();
},
getLocalSaveName: function() {},
getLocalSavePwd: function() {},
setUserPhone: function(e) {
this.catchData.userPhone = e;
this._save();
},
getUserPhone: function() {
return this.catchData.userPhone;
},
setVisitorToken: function(e) {
this.catchData.visitorToken = e;
this._save();
},
getVisitorToken: function() {
return this.catchData.visitorToken;
},
setUserToken: function(e) {
this.catchData.userToken = e;
this._save();
},
getUserToken: function() {
return this.catchData.userToken;
}
};
cc._RF.pop();
}, {} ],
HelloWorld: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
var s = e("Observer"), i = e("ObserverMgr"), n = e("Tips");
e("DialogMgr");
cc.Class({
extends: s,
properties: {
label: {
default: null,
displayName: "",
type: cc.Label
}
},
onLoad: function() {
this.index = 0;
this._initMsg();
},
_getMsgList: function() {
return [ "dispatchMsg" ];
},
_onMsg: function(e, t) {
"dispatchMsg" === e && (this.label.string = t);
},
onBtnClickDispatchMsg: function() {
this.index++;
i.dispatchMsg("dispatchMsg", this.index);
n.show("你好");
},
onBtnClickDirect: function() {
cc.director.loadScene("Index");
},
update: function(e) {}
});
cc._RF.pop();
}, {
DialogMgr: "DialogMgr",
Observer: "Observer",
ObserverMgr: "ObserverMgr",
Tips: "Tips"
} ],
HotUpdateModule: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3bb24JQqU1G07rocq58W6a1", "HotUpdateModule");
t.exports = {
Msg: {
OnUpdateProgress: "HotUpdateModule_Msg_OnUpdateProgress",
OnGetVersionInfo: "HotUpdateModule_Msg_OnGetVersionInfo",
OnTipUpdateVersion: "HotUpdateModule_Msg_OnTipUpdateVersion",
OnUpdateVersionResult: "HotUpdateModule_Msg_OnUpdateVersionResult"
}
};
cc._RF.pop();
}, {} ],
HotUpdateScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fb5bcZRYBRDNI3UvstSh+EL", "HotUpdateScene");
var s = e("HotUpdate"), i = e("Observer"), n = e("DialogMgr"), r = e("HotUpdateModule"), a = e("Tips");
cc.Class({
extends: i,
properties: {
versionLabel: {
default: null,
displayName: "版本号",
type: cc.Label
},
updateProgress: {
displayName: "热更新进度条",
default: null,
type: cc.ProgressBar
},
tipsLabel: {
displayName: "消息提示",
default: null,
type: cc.Label
}
},
_onMsg: function(e, t) {
if (e === r.Msg.OnUpdateVersionResult) if (t) {
this.tipsLabel.string = "更新成功";
a.show("更新成功");
this._onShowDownLoadUpdateVersionResult(!0);
} else {
this.tipsLabel.string = "更新失败";
a.show("热更新失败");
this._onShowDownLoadUpdateVersionResult(!1);
} else if (e === r.Msg.OnUpdateProgress) {
console.log("[update]: 进度=" + t.fileProgress);
this.updateProgress.progress = t.fileProgress;
this.tipsLabel.string = "正在更新中,请耐心等待";
console.log(t.msg);
} else if (e === r.Msg.OnTipUpdateVersion) if (t === jsb.EventAssetsManager.NEW_VERSION_FOUND) this._onShowNoticeUpdateLayer(); else if (t === jsb.EventAssetsManager.ALREADY_UP_TO_DATE) {
a.show("版本一致,无需更新,进入游戏中...");
this._enterGame();
} else this._onShowNoticeCheckVersionFailed(); else e === r.Msg.OnGetVersionInfo && this._updateVersionView(t.curVer, t.newVersion);
},
_updateVersionView: function(e, t) {
this.versionLabel.string = "服务器版本号: " + t + ",本地版本:" + e;
},
_getMsgList: function() {
return [ r.Msg.OnGetVersionInfo, r.Msg.OnTipUpdateVersion, r.Msg.OnUpdateProgress, r.Msg.OnUpdateVersionResult ];
},
onLoad: function() {
this._initMsg();
this._initView();
this._checkUpdate();
this._initVersionFlag();
},
_initVersionFlag: function() {},
_onShowNoticeUpdateLayer: function() {
a.show("提示更新");
n.showTipsWithOkBtn("检测到新版本,点击确定开始更新", function() {
s.hotUpdate();
}.bind(this));
},
_onShowNoticeCheckVersionFailed: function() {
a.show("检查更新失败");
n.showTipsWithOkBtn("检查更新失败,点击重试", function() {
s.checkUpdate();
}.bind(this));
},
_onShowDownLoadUpdateVersionResult: function(e) {
e ? n.showTipsWithOkBtn("更新成功,点击确定重启游戏", function() {
cc.audioEngine.stopAll();
cc.game.restart();
}.bind(this)) : n.showTipsWithOkBtn("更新失败,点击重试", function() {
s.checkUpdate();
}.bind(this));
},
_initView: function() {
this.tipsLabel.string = "";
this.versionLabel.string = "";
this.updateProgress.progress = 0;
},
_checkUpdate: function() {
if (cc.sys.isNative) {
this.tipsLabel.string = "正在获取版本...";
a.show("正在获取版本...");
cc.resources.load("manifest/project", function(e, t) {
if (e) console.log("load project manifest fail", JSON.stringify(e)); else {
try {
var o = JSON.parse(t._nativeAsset);
console.log("热更版本文件： ver: " + o.version + "  url:" + o.packageUrl);
} catch (e) {
console.log(e);
}
s.init(t._nativeAsset);
s.checkUpdate();
}
});
} else {
a.show("web 平台不需要热更新");
this._enterGame();
}
},
onBtnClickCheckUpdate: function() {
this._checkUpdate();
},
_enterGame: function() {
a.show("进入游戏成功");
console.log("不需要热更新，直接进入到游戏");
this.updateProgress.node.active = !1;
cc.director.loadScene("HelloWorld");
}
});
cc._RF.pop();
}, {
DialogMgr: "DialogMgr",
HotUpdate: "HotUpdate",
HotUpdateModule: "HotUpdateModule",
Observer: "Observer",
Tips: "Tips"
} ],
HotUpdate: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3c083vkHGxHfKDu2z9Cbmt9", "HotUpdate");
var s = e("ObserverMgr"), i = e("HotUpdateModule");
t.exports = {
_assetsMgr: null,
_isUpdating: null,
_compareVersion: function(e, t) {
console.log("客户端版本: " + e + ", 当前最新版本: " + t);
s.dispatchMsg(i.Msg.OnGetVersionInfo, {
curVer: e,
newVersion: t
});
for (var o = e.split("."), n = t.split("."), r = 0; r < o.length; ++r) {
var a = parseInt(o[r]), c = parseInt(n[r] || 0);
if (a !== c) return a - c;
}
return n.length > o.length ? -1 : 0;
},
reCheckVersion: function() {
this._assetsMgr.downloadFailedAssets();
},
checkUpdate: function() {
if (this._assetsMgr.getLocalManifest() && this._assetsMgr.getLocalManifest().isLoaded()) {
if (!this._isUpdating) {
console.log("[HotUpdate] checkUpdate");
this._assetsMgr.setEventCallback(this._checkCallBack.bind(this));
this._assetsMgr.checkUpdate();
}
} else console.log("加载本地 manifest 失败 ...");
},
_checkCallBack: function(e) {
cc.log("热更新检查结果: " + e.getEventCode());
for (var t = this._assetsMgr.getRemoteManifest().getSearchPaths(), o = 0; o < t.length; o++) {
t[o];
console.log(JSON.stringify(t[o]));
}
var n = e.getEventCode();
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("没有发现本地的manifest, 跳过热更新.");
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
console.log("下载 manifest 失败, 跳过热更新.");
break;

case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
console.log("解析 manifest 失败, 跳过热更新.");
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
console.log("已经和远程版本一致");
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
console.log("发现新版本,请更新");
break;

default:
return;
}
s.dispatchMsg(i.Msg.OnTipUpdateVersion, n);
},
hotUpdate: function() {
this._isUpdating = !0;
this._assetsMgr.setEventCallback(this._hotUpdateCallBack.bind(this));
this._assetsMgr.update();
},
_hotUpdateCallBack: function(e) {
console.log("hotUpdate Code: " + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("没有发现本地的 manifest, 跳过热更新.");
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var t = {}, o = e.getPercentByFile();
o || (o = 0);
t.fileProgress = o.toFixed(2) || 1;
t.byteProgress = e.getPercent().toFixed(2);
t.msg = "";
var n = e.getMessage();
if (n) {
console.log("Updated file: " + n);
cc.log(e.getPercent().toFixed(2) + "% : " + n);
t.msg = n;
}
s.dispatchMsg(i.Msg.OnUpdateProgress, t);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
console.log("下载 manifest 失败, 跳过热更新.");
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
console.log("已经和远程版本一致 ");
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
console.log("更新完成 " + e.getMessage());
this._onUpdateFinished();
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
console.log("更新失败. " + e.getMessage());
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
console.log("资源更新发生错误: " + e.getAssetId() + ", " + e.getMessage());
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
console.log(e.getMessage());
this._onUpdateFailed();
}
},
_onUpdateFailed: function() {
s.dispatchMsg(i.Msg.OnUpdateVersionResult, !1);
},
_onUpdateFinished: function() {
var e = jsb.fileUtils.getSearchPaths(), t = this._assetsMgr.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(t));
Array.prototype.unshift(e, t);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(e));
jsb.fileUtils.setSearchPaths(e);
s.dispatchMsg(i.Msg.OnUpdateVersionResult, !0);
},
removeTmpManifestFile: function(e) {},
removeFile: function(e) {
if (jsb.fileUtils.isFileExist(e)) {
jsb.fileUtils.removeFile(e);
jsb.fileUtils.isFileExist(e) ? console.log("[HotUpdate] remove file failed: " + e) : console.log("[HotUpdate] remove file success: " + e);
} else console.log("[HotUpdate] file not exist: " + e);
},
removeTempDir: function(e) {
var t = e + "_temp";
this.removeDirectory(t);
},
removeDirectory: function(e) {
if (jsb.fileUtils.isDirectoryExist(e)) {
jsb.fileUtils.removeDirectory(e);
jsb.fileUtils.isDirectoryExist(e) ? console.log("[HotUpdate] removeDir failed: " + e) : console.log("[HotUpdate] removeDir success: " + e);
} else console.log("[HotUpdate] dir not exist: " + e);
},
init: function(e) {
if (cc.sys.isNative) {
var t = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "remote-asset";
console.log("热更新资源存放路径 : " + t);
this._assetsMgr = new jsb.AssetsManager("", t, this._compareVersion.bind(this));
var o = new jsb.Manifest(e, t);
this._assetsMgr.loadLocalManifest(o, t);
console.log("[HotUpdate] local packageUrl:" + this._assetsMgr.getLocalManifest().getPackageUrl());
console.log("[HotUpdate] project.manifest remote url:" + this._assetsMgr.getLocalManifest().getManifestFileUrl());
console.log("[HotUpdate] version.manifest remote url:" + this._assetsMgr.getLocalManifest().getVersionFileUrl());
this._assetsMgr.setVersionCompareHandle(this._compareVersion.bind(this));
this._assetsMgr.setVerifyCallback(function(e, t) {
var o = t.compressed, s = t.md5, i = t.path;
t.size;
if (o) {
console.log("客户端热更Verification passed compress : " + i);
return !0;
}
console.log(" 客户端热更 Verification passed : " + i + " (" + s);
return !0;
});
cc.sys.os === cc.sys.OS_ANDROID && this._assetsMgr.setMaxConcurrentTask(10);
}
}
};
cc._RF.pop();
}, {
HotUpdateModule: "HotUpdateModule",
ObserverMgr: "ObserverMgr"
} ],
Index: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f53a5tmKA1If50wuASG32MX", "Index");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
onBtnClickDirect: function() {
cc.director.loadScene("HelloWorld");
}
});
cc._RF.pop();
}, {} ],
NetHttpMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "28bb7Pxx3xE0KormXdxwQsr", "NetHttpMgr");
var s = e("ObserverMgr"), i = e("DialogMgr");
t.exports = {
_tmpQuest: {
msg: null,
data: null
},
quest: function(t, o) {
var i = e("Util").getClientType(), n = e("GameLocalStorage").getCurVersion();
o.clientType = i;
o.version = n;
o.channel = "123";
this._tmpQuest.msg = t;
this._tmpQuest.data = o;
this._showSendData(t, o);
var r = new XMLHttpRequest();
r.ontimeout = this._onTimeout.bind(this);
r.timeout = 6e3;
r.onreadystatechange = function() {
if (4 === r.readyState && r.status >= 200 && r.status < 400) {
var e = r.responseText, t = JSON.parse(e);
s.dispatchMsg(GameMsgGlobal.Net.Recv, t);
var o = t[0], i = t[1], n = t[2], a = GameMsgHttp.getMsgById(o);
this._showRecvData(a, i, n);
void 0 !== i && null !== a ? i === GameMsgGlobal.NetCode.SuccessHttp.id ? s.dispatchMsg(a, n) : s.dispatchMsg(GameMsgGlobal.Net.MsgErr, t) : console.log("[Http] 缺少code字段");
}
}.bind(this);
r.onerror = function(e) {
this._onTimeout();
}.bind(this);
var a = {
msg_id: t.id,
data: o
}, c = JSON.stringify(a);
r.open("post", url, !0);
s.dispatchMsg(GameMsgGlobal.Net.Send, null);
try {
r.send(c);
} catch (e) {
console.log("网络超时");
}
},
_showRecvData: function(e, t, o) {
var s = {
time: this._getTime(),
msg: e,
code: t,
data: o
};
cc.sys.isBrowser ? console.log("[Http<===]%c %s", "color:blue;font-weight:bold;", JSON.stringify(s)) : console.log("[Http<===]%s", JSON.stringify(s));
},
_showSendData: function(e, t) {
var o = t, s = e.msg, i = {
time: this._getTime(),
msg: s,
msgID: e.id,
data: o
};
cc.sys.isBrowser ? console.log("[Http===>]%c %s ", "color:green;font-weight:bold;", JSON.stringify(i)) : console.log("[Http===>]%s ", JSON.stringify(i));
},
_getTime: function() {
var e = new Date();
return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
},
_onTimeout: function() {
console.log("[HTTP] %c连%c接%c超%c时", "color:red", "color:orange", "color:purple", "color:green");
s.dispatchMsg(GameMsgGlobal.Net.TimeOut, null);
i.showTipsWithOkBtnAndNoCloseBtn("网络连接失败,是否重试?", function() {
var e = this._tmpQuest.msg, t = this._tmpQuest.data;
null !== e && null !== t && this.quest(e, t);
}.bind(this), null, function(t) {
e("Util").reZorderToTop(t);
});
}
};
cc._RF.pop();
}, {
DialogMgr: "DialogMgr",
GameLocalStorage: "GameLocalStorage",
ObserverMgr: "ObserverMgr",
Util: "Util"
} ],
NetSocketMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8f4feeTQ/xBWZy9wfXQ1UR0", "NetSocketMgr");
var s = e("ObserverMgr");
e("Util");
t.exports = {
ws: null,
isNetOpen: !1,
heartID: null,
init: function() {
if (null === this.ws) {
console.log("[Socket] con url:" + url);
this.ws = new WebSocket("192");
this.ws.onopen = this.onOpen.bind(this);
this.ws.onmessage = this.onMessage.bind(this);
this.ws.onerror = this.onError.bind(this);
this.ws.onclose = this.onClose.bind(this);
} else console.log("[Socket] has init");
},
_onHeartBeat: function() {
this.ws && (this.ws.readyState, WebSocket.OPEN);
},
_beganHeartBeat: function() {
this._cleanHeartBeat();
this.heartID = setInterval(this._onHeartBeat.bind(this), 3e4);
},
_cleanHeartBeat: function() {
if (null !== this.heartID) {
clearInterval(this.heartID);
this.heartID = null;
}
},
onOpen: function() {
console.log("[Socket] Open: " + this._getTime());
this.isNetOpen = !0;
s.dispatchMsg(GameMsgGlobal.Net.Open, null);
this._beganHeartBeat();
},
onError: function() {
console.log("[Socket] Error: " + this._getTime());
this.ws = null;
this.isNetOpen = !1;
s.dispatchMsg(GameMsgGlobal.Net.Error, null);
this._cleanHeartBeat();
},
onClose: function() {
console.log("[Socket] Close: " + this._getTime());
s.dispatchMsg(GameMsgGlobal.Net.Close, null);
this.ws = null;
this.isNetOpen = !1;
this._cleanHeartBeat();
this.init();
},
onMessage: function(e) {
var t = null;
try {
t = JSON.parse(e.data);
} catch (e) {
t = null;
}
if (null !== t) {
var o = t[0], i = GameMsgSocket.getRecvDataByCode(o);
if (i) {
var n = t[1], r = t[2];
this._showRecvData(i.msg, t);
s.dispatchMsg(GameMsgGlobal.Net.Recv, t);
if (void 0 === n) console.log("[SocketMgr] 缺少Code字段"); else if (0 === n) i && s.dispatchMsg(i.msg, r); else {
console.log("[SocketMgr] netData 错误码: " + n);
var a = t.msg;
s.dispatchMsg(GameMsgGlobal.Net.MsgErr, [ n, i.msg, r, a ]);
}
} else console.log("[SocketMgr] 客户端未发现网络配置: " + e.data);
} else console.log("[Socket] 服务器返回数据不是json格式: " + e.data);
},
send: function(e, t) {
if (this.ws) if (this.ws.readyState === WebSocket.OPEN) {
var o = [ e.code, t ];
this._showSendData(e.msg, t);
this.ws.send(JSON.stringify(o));
} else console.log("[Socket] 网络失去连接"); else console.log("网络连接出现问题:可能没有初始化网络,或网络失去连接!");
},
_showSendData: function(e, t) {
var o = t, s = e.msg, i = {
time: this._getTime(),
msg: s,
data: o
};
cc.sys.isBrowser ? console.log("[Socket===>]%c %s ", "color:green;font-weight:bold;", JSON.stringify(i)) : console.log("[Socket===>]%s ", JSON.stringify(i));
},
_showRecvData: function(e, t) {
var o = {
time: this._getTime(),
msg: e,
data: t
};
cc.sys.isBrowser ? console.log("[Socket<===]%c %s", "color:red;font-weight:bold;", JSON.stringify(o)) : console.log("[Socket<===]%s", JSON.stringify(o));
},
_getTime: function() {
var e = new Date();
return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
}
};
cc._RF.pop();
}, {
ObserverMgr: "ObserverMgr",
Util: "Util"
} ],
ObserverMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e92c72NcxhJx5iFdLtdqt/A", "ObserverMgr");
t.exports = {
obsArray: {},
addEventListener: function(e, t, o) {
"undefined" == typeof o && console.log("[ObserverMgr] 注册消息 [%s]:%s 的作用于未定义", e, t.name);
"undefined" == typeof this.obsArray[e] && (this.obsArray[e] = []);
for (var s = 0; s < this.obsArray[e].length; s++) {
var i = this.obsArray[e][s];
if (i.func === t && i.ob === o) return;
}
this.obsArray[e].push({
func: t,
ob: o
});
},
removeEventListener: function(e, t, o) {
var s = !1, i = this.obsArray[e];
if (i) for (var n = 0; n < i.length; ) {
var r = i[n], a = r.func, c = r.ob;
if (t === a && o === c) {
i.splice(n, 1);
s = !0;
} else n++;
}
return s;
},
removeEventListenerWithMsg: function(e) {
var t = this.obsArray[e];
if (t) for (var o = 0; o < t.length; o++) t.splice(o, 1);
},
removeEventListenerWithObject: function(e) {
for (var t in this.obsArray) for (var o = this.obsArray[t], s = 0; s < o.length; ) {
o[s].ob === e ? o.splice(s, 1) : s++;
}
},
cleanAllEventListener: function() {
this.obsArray = {};
},
dispatchMsg: function(e, t) {
var o = this.obsArray[e];
if ("undefined" != typeof o) for (var s = 0; s < o.length; s++) {
var i = o[s], n = i.func, r = i.ob;
n && r && n.apply(r, [ e, t ]);
} else console.log("消息列表中不存在: " + e);
}
};
cc._RF.pop();
}, {} ],
Observer: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2ab8eVyRspHdJWrPlYr1Egp", "Observer");
var s = e("ObserverMgr");
cc.Class({
extends: cc.Component,
_initMsg: function() {
for (var e = this._getMsgList(), t = 0; t < e.length; t++) {
var o = e[t];
s.addEventListener(o, this._onMsg, this);
}
},
onLoad: function() {},
_getMsgList: function() {
return [];
},
_onMsg: function(e, t) {},
_onError: function(e, t, o) {},
_onNetOpen: function() {},
_onErrorDeal: function(e, t) {
var o = t[0], s = t[1], i = t[2];
this._onError(o, s, i);
},
onDisable: function() {
s.removeEventListenerWithObject(this);
},
onEnable: function() {},
onDestroy: function() {
s.removeEventListenerWithObject(this);
}
});
cc._RF.pop();
}, {
ObserverMgr: "ObserverMgr"
} ],
Tips: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "534b8bkZKFE1qSf7u0IJi2O", "Tips");
t.exports = {
_logView: null,
show: function(e) {
this._logView && !1 === this._logView.isValid && (this._logView = null);
if (null === this._logView) {
var t = cc.director.getScene();
if (t) {
var o = cc.view.getVisibleSize().width, s = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/log/LogView", function(i, n) {
if (!i) {
var r = cc.instantiate(n);
r.x = o / 2;
r.y = s / 2;
t.addChild(r);
var a = r.getComponent("LogView");
if (a) {
this._logView = a;
a.addLog(e);
}
}
}.bind(this));
}
} else {
var i = this._logView.node.parent.children.length;
this._logView.addLog(e);
this._logView.node.zIndex = i;
}
}
};
cc._RF.pop();
}, {} ],
UIMgr: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7fff1Pn665PRISUtHP/Z26r", "UIMgr");
t.exports = {
_uiMap: {},
createPrefab: function(e, t) {
e ? cc.loader.loadRes("prefab/ComUIBg", function(o, s) {
if (o) console.log(o.errorMessage); else {
var i = cc.instantiate(s), n = i.getComponent("ComUIBg");
if (n) {
var r = n.addUI(e), a = r.uuid.toString();
this._uiMap[a] = i;
t && t(i, r);
}
}
}.bind(this)) : console.log("[UIMgr] 无法创建Prefab: " + e);
},
createPrefabAddToRunningScene: function(e, t) {
e ? cc.loader.loadRes("prefab/ComUIBg", function(o, s) {
var i = cc.instantiate(s), n = i.getComponent("ComUIBg");
if (n) {
var r = n.addUI(e), a = r.uuid.toString();
this._uiMap[a] = i;
var c = cc.director.getScene();
if (c) {
var l = cc.view.getVisibleSize().width, g = cc.view.getVisibleSize().height;
i.x = l / 2;
i.y = g / 2;
c.addChild(i);
t && t(r);
} else console.log("[UIMgr] 没有运行Scene,无法添加UI界面!");
}
}.bind(this)) : console.log("[UIMgr] 无法创建Prefab: " + e);
},
destroyUI: function(e) {
if (e) if (e.node) {
var t = e.node.uuid.toString(), o = this._uiMap[t];
if (o) {
o.destroy();
this._uiMap[t] = null;
} else console.log("[UIMgr]界面不是UIMgr创建的,无法销毁:" + e.node.name);
} else console.log("[UIMgr] " + e.name + " 没有node属性"); else console.log("[UIMgr] 缺少参数");
}
};
cc._RF.pop();
}, {} ],
Util: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "08ce3tyQidD1p66cpyoKlmR", "Util");
function s(e, t) {
var o;
if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
if (Array.isArray(e) || (o = i(e)) || t && e && "number" == typeof e.length) {
o && (e = o);
var s = 0;
return function() {
return s >= e.length ? {
done: !0
} : {
done: !1,
value: e[s++]
};
};
}
throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
return (o = e[Symbol.iterator]()).next.bind(o);
}
function i(e, t) {
if (e) {
if ("string" == typeof e) return n(e, t);
var o = Object.prototype.toString.call(e).slice(8, -1);
"Object" === o && e.constructor && (o = e.constructor.name);
return "Map" === o || "Set" === o ? Array.from(e) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? n(e, t) : void 0;
}
}
function n(e, t) {
(null == t || t > e.length) && (t = e.length);
for (var o = 0, s = new Array(t); o < t; o++) s[o] = e[o];
return s;
}
t.exports = {
log: function(e) {
console.log("-------------------------------------------");
console.log(e);
console.log("*******************************************");
},
prefix: function(e, t) {
return e.toString().length >= t ? e : (Array(t).join("0") + e).slice(-t);
},
formatTimeRemainTime: function(e) {
var t = parseInt(e / 1e3), o = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), i = Math.floor(t % 3600 % 60);
return (o = this.prefix(o, 2)) + ":" + (s = this.prefix(s, 2)) + ":" + (i = this.prefix(i, 2));
},
randomByMaxValue: function(e) {
return Math.floor(Math.random() * e);
},
randomByMinToMax: function(e, t) {
return Math.floor(Math.random() * (t - e)) + e;
},
removeElementsFromArray: function(e, t) {
for (var o = -1, s = e.length, i = 0; i < s; i++) if (e[i] === t) {
o = i;
break;
}
o >= 0 && e.splice(o, 1);
},
makeRdmStr: function(e) {
e = e || 32;
for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", o = t.length, s = "", i = 0; i < e; i++) s += t.charAt(Math.floor(Math.random() * o));
return s;
},
numCutOut: function(e, t) {
var o = (parseInt(e * Math.pow(10, t)) / Math.pow(10, t)).toString(), s = o.split(".");
if (1 === s.length) {
o += ".";
for (var i = 0; i < t; i++) o += "0";
} else if (2 === s.length) for (var n = s[1].length; n < t; n++) o += "0";
return o;
},
getUnixTime: function() {
return Math.round(new Date().getTime() / 1e3);
},
deepCopy: function(e) {
for (var t = [], o = 0, s = e.length; o < s; o++) e[o] instanceof Array ? t[o] = this.deepCopy(e[o]) : t[o] = e[o];
return t;
},
getRandomItemFromArray: function(e, t) {
var o = [];
for (var s in e) o.push(e[s]);
for (var i = [], n = 0; n < t && o.length > 0; n++) {
var r = Math.floor(Math.random() * o.length);
i[n] = o[r];
o.splice(r, 1);
}
return i;
},
getMaxFromArray: function(e) {
return Math.max.apply(null, e);
},
getMaxCbFromArray: function(e, t) {
this.assert(e.length >= 1);
for (var o = t(e[0]), s = 0, i = 1; i < e.length; ++i) {
var n = t(e[i]);
if (n > o) {
o = n;
s = i;
}
}
return e[s];
},
getFiltedArray: function(e, t) {
for (var o, i = [], n = s(e); !(o = n()).done; ) {
var r = o.value;
t(r) && i.push(r);
}
return i;
},
getNowTime: function() {
var e = new Date();
return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
},
getIP: function() {
var e = new XMLHttpRequest();
e.onreadystatechange = function() {
4 === e.readyState && e.status >= 200 && e.status < 400 && console.log(e.responseText);
};
e.open("GET", "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", !0);
e.send();
},
getClientType: function() {},
reZorderToTop: function(e) {
var t = e.parent.children.length;
e.setLocalZOrder(t);
},
assert: function(e) {
e || ("chrome" === cc.sys.browserType ? alert("error occurs, please open chrome debugger tools and retry ") : "firefox" === cc.sys.browserType ? alert("error occurs, please open firefox debugger tools and debug") : "safari" === cc.sys.browserType ? alert("error occurs, please open safari debugger tools and debug") : console.log("not support browserType: ", cc.sys.browserType));
},
print_tree: function(e) {
console.log("=============print_tree begin ===========");
(function e(t, o) {
if (!(o >= 5)) {
for (var s = "", i = 0; i < o; ++i) s += "    ";
var n = s + "    ";
for (var r in t) {
var a = "值无法查看", c = "类型无法查看";
try {
a = t[r];
c = typeof t[r];
} catch (e) {}
console.log(s, r);
if ("object" == c) {
console.log(n, "type:", c);
console.log(n, "value: {");
e(t[r], o + 1);
console.log(n, "}");
} else {
console.log(n, "type:", c);
console.log(n, "value:", a);
}
}
if (t.prototype) {
console.log(s, "prototype: {");
e(t.prototype, o + 1);
console.log(s, "}");
}
}
})(e, 0);
console.log("=============print_tree end  ============");
}
};
cc._RF.pop();
}, {} ],
touchCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "798e1tH8j1Lp5q/t8OXSqZU", "touchCtrl");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
},
touchCtrl: {
default: null,
type: cc.Node
},
card: {
default: null,
type: cc.Prefab
}
},
checkCard: function(e, t) {
for (var o = e.length - 1; o >= 0; o--) {
var s = e[o].getBoundingBox();
if (cc.rectContainsPoint(s, t)) {
e[o].isCheck = !0;
e[o].opacity = 200;
return e[o];
}
}
},
moveCard: function(e) {
for (var t in e) if (1 == e[t].isCheck) {
e[t].isCheck = !1;
e[t].y += 50;
}
},
getCheckCount: function(e) {
var t = 0;
for (var o in e) 1 == e[o].isCheck && t++;
return t;
},
onLoad: function() {
var e = this;
this.cards = [];
for (var t = 0; t < 10; t++) {
var o = cc.instantiate(this.card);
o.isCheck = !1;
o.index = t;
o.parent = this.node;
o.position = cc.p(300 + 30 * t, 300);
this.cards.push(o);
}
e.touchCtrl.on("touchstart", function(t) {
var o = t.getTouches()[0].getLocation();
e.checkCard(e.cards, o);
});
e.touchCtrl.on("touchmove", function(t) {
var o = t.getTouches()[0].getLocation();
e.checkCard(e.cards, o);
});
e.touchCtrl.on("touchend", function(t) {
t.getTouches()[0].getLocation();
e.moveCard(e.cards);
});
e.touchCtrl.on("touchcancel", function(e) {
e.getTouches()[0].getLocation();
});
},
update: function(e) {
this.label.string = "选中：" + this.getCheckCount(this.cards);
}
});
cc._RF.pop();
}, {} ],
"use_v2.0.x_cc.Toggle_event": [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f26d11ghFlP5LTxuqTmfeP7", "use_v2.0.x_cc.Toggle_event");
cc.Toggle && (cc.Toggle._triggerEventInScript_check = !0);
cc._RF.pop();
}, {} ]
}, {}, [ "touchCtrl", "HotUpdate", "HotUpdateModule", "Observer", "ObserverMgr", "NetHttpMgr", "NetSocketMgr", "ButtonScaler", "ComUIBg", "DialogMgr", "Tips", "UIMgr", "Util", "use_v2.0.x_cc.Toggle_event", "GameLocalStorage", "HotUpdateScene", "HelloWorld", "Index" ]);