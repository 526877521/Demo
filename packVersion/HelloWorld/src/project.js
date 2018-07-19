require = function a(o, n, s) {
function l(t, e) {
if (!n[t]) {
if (!o[t]) {
var c = "function" == typeof require && require;
if (!e && c) return c(t, !0);
if (d) return d(t, !0);
var r = new Error("Cannot find module '" + t + "'");
throw r.code = "MODULE_NOT_FOUND", r;
}
var i = n[t] = {
exports: {}
};
o[t][0].call(i.exports, function(e) {
return l(o[t][1][e] || e);
}, i, i.exports, a, o, n, s);
}
return n[t].exports;
}
for (var d = "function" == typeof require && require, e = 0; e < s.length; e++) l(s[e]);
return l;
}({
ButtonScaler: [ function(e, t, c) {
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
Collision: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "3860ac6i71KHqtSpC905LJN", "Collision");
t.exports = {
detectCollision: function(e, t) {
var c = 0, r = 0, i = this.degToRad(e.angle), a = e.x, o = e.y, n = Math.cos(i) * (t.x - a) - Math.sin(i) * (t.y - o) + a, s = Math.sin(i) * (t.x - a) + Math.cos(i) * (t.y - o) + o;
c = n < e.x - e.width / 2 ? e.x - e.width / 2 : n > e.x + e.width / 2 ? e.x + e.width / 2 : n;
r = s < e.y - e.height / 2 ? e.y - e.height / 2 : s > e.y + e.height / 2 ? e.y + e.height / 2 : s;
var l = {};
if (this.distance(n, s, c, r) < t.r) {
l.bool = !0;
l.fishId = e.id;
}
return l;
},
distance: function(e, t, c, r) {
return Math.sqrt(Math.pow(c - e, 2) + Math.pow(r - t, 2));
},
degToRad: function(e) {
return e * Math.PI / 180;
}
};
cc._RF.pop();
}, {} ],
ComUIBg: [ function(e, t, c) {
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
DialogMgr: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "49e1ba7Z/RCPLkkLRCNWLRp", "DialogMgr");
e("Util");
t.exports = {
showTipsWithOkBtn: function(i, a, o, n) {
var s = cc.director.getScene();
if (s) {
var l = cc.view.getVisibleSize().width, d = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(e, t) {
if (!e) {
var c = cc.instantiate(t);
c.x = l / 2;
c.y = d / 2;
s.addChild(c);
var r = c.getComponent("DialogLayer");
r && r.showTipsWithOkBtn(i, a, o, n);
}
});
}
},
showTipsWithOkCancelBtn: function(i, a, o, n, s) {
var l = cc.director.getScene();
if (l) {
var d = cc.view.getVisibleSize().width, u = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(e, t) {
if (!e) {
var c = cc.instantiate(t);
c.x = d / 2;
c.y = u / 2;
l.addChild(c);
var r = c.getComponent("DialogLayer");
r && r.showTipsWithOkCancelBtn(i, a, o, n);
s && s(c);
}
});
}
},
showTipsWithOkBtnAndNoCloseBtn: function(i, a, o, n) {
var s = cc.director.getScene();
if (s) {
var l = cc.view.getVisibleSize().width, d = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/dialog/DialogLayer", function(e, t) {
if (!e) {
var c = cc.instantiate(t);
c.x = l / 2;
c.y = d / 2;
s.addChild(c);
var r = c.getComponent("DialogLayer");
if (r) {
r.showTipsWithOkBtn(i, a, o);
r.setCloseBtnVisible();
}
n && n(c);
}
});
}
}
};
cc._RF.pop();
}, {
Util: "Util"
} ],
HelloWorld: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
var r = e("Observer"), i = e("ObserverMgr");
cc.Class({
extends: r,
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
},
onBtnClickDirect: function() {
cc.director.loadScene("Index");
},
update: function(e) {}
});
cc._RF.pop();
}, {
Observer: "Observer",
ObserverMgr: "ObserverMgr"
} ],
HotUpdateModule: [ function(e, t, c) {
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
HotUpdate: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "3c083vkHGxHfKDu2z9Cbmt9", "HotUpdate");
var n = e("ObserverMgr"), s = e("HotUpdateModule");
t.exports = {
_assetsMgr: null,
_checkListener: null,
_updateListener: null,
_compareVersion: function(e, t) {
console.log("客户端版本: " + e + ", 当前最新版本: " + t);
n.dispatchMsg(s.Msg.OnGetVersionInfo, {
curVer: e,
newVersion: t
});
for (var c = e.split("."), r = t.split("."), i = 0; i < c.length; ++i) {
var a = parseInt(c[i]), o = parseInt(r[i] || 0);
if (a !== o) return a - o;
}
return r.length > c.length ? -1 : 0;
},
reCheckVersion: function() {
this._assetsMgr.downloadFailedAssets();
},
checkUpdate: function() {
if (this._assetsMgr.getLocalManifest().isLoaded()) {
if (null !== this._checkListener) {
cc.eventManager.removeListener(this._checkListener);
this._checkListener = null;
}
this._checkListener = new jsb.EventListenerAssetsManager(this._assetsMgr, this._checkCallBack.bind(this));
cc.eventManager.addListener(this._checkListener, 1);
console.log("[HotUpdate] checkUpdate");
this._assetsMgr.checkUpdate();
} else console.log("加载本地 manifest 失败 ...");
},
_checkCallBack: function(e) {
cc.log("热更新检查结果: " + e.getEventCode());
for (var t = this._assetsMgr.getRemoteManifest().getSearchPaths(), c = 0; c < t.length; c++) {
t[c];
console.log(JSON.stringify(t[c]));
}
var r = e.getEventCode();
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
if (null !== this._checkListener) {
cc.eventManager.removeListener(this._checkListener);
this._checkListener = null;
}
n.dispatchMsg(s.Msg.OnTipUpdateVersion, r);
},
hotUpdate: function() {
if (this._assetsMgr) {
this._updateListener = new jsb.EventListenerAssetsManager(this._assetsMgr, this._hotUpdateCallBack.bind(this));
cc.eventManager.addListener(this._updateListener, 1);
this._assetsMgr.update();
}
},
_hotUpdateCallBack: function(e) {
console.log("hotUpdate Code: " + e.getEventCode());
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("没有发现本地的 manifest, 跳过热更新.");
this._onUpdateFailed();
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
var t = {}, c = e.getPercentByFile();
c || (c = 0);
t.fileProgress = c.toFixed(2) || 1;
t.byteProgress = e.getPercent().toFixed(2);
t.msg = "";
var r = e.getMessage();
if (r) {
console.log("Updated file: " + r);
cc.log(e.getPercent().toFixed(2) + "% : " + r);
t.msg = r;
}
n.dispatchMsg(s.Msg.OnUpdateProgress, t);
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
if (null !== this._updateListener) {
cc.eventManager.removeListener(this._updateListener);
this._updateListener = null;
}
n.dispatchMsg(s.Msg.OnUpdateVersionResult, !1);
},
_onUpdateFinished: function() {
if (null !== this._updateListener) {
cc.eventManager.removeListener(this._updateListener);
this._updateListener = null;
}
var e = jsb.fileUtils.getSearchPaths(), t = this._assetsMgr.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(t));
Array.prototype.unshift(e, t);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(e));
jsb.fileUtils.setSearchPaths(e);
n.dispatchMsg(s.Msg.OnUpdateVersionResult, !0);
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
console.log("本地 manifest 路径 : " + e);
this._assetsMgr = new jsb.AssetsManager(e, t);
cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS || this._assetsMgr.retain();
console.log("[HotUpdate] local packageUrl:" + this._assetsMgr.getLocalManifest().getPackageUrl());
console.log("[HotUpdate] project.manifest remote url:" + this._assetsMgr.getLocalManifest().getManifestFileUrl());
console.log("[HotUpdate] version.manifest remote url:" + this._assetsMgr.getLocalManifest().getVersionFileUrl());
this._assetsMgr.setVersionCompareHandle(this._compareVersion.bind(this));
this._assetsMgr.setVerifyCallback(function(e, t) {
t.compressed, t.md5, t.path, t.size;
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
Index: [ function(e, t, c) {
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
LoaderImage: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "66b88xH7bVGhLws9IhgOSzP", "LoaderImage");
function u(e) {
null == e.retain && (e.retain = 0);
}
function a(e) {
return !!e && (null != e.bk_retain && null != e.bk_retain || !(e.bk_retain = 1));
}
function i(e, t) {
e._children.forEach(function(e) {
(function(e, t) {
var c = e.getComponent(cc.Sprite);
if (c && c.spriteFrame) {
u(cc.loader._cache[c.spriteFrame._textureFilename]);
cc.loader._cache[c.spriteFrame._textureFilename].retain += t;
}
var r = e.getComponent(cc.Button);
if (r) {
if (r.normalSprite) {
u(cc.loader._cache[r.normalSprite._textureFilename]);
cc.loader._cache[r.normalSprite._textureFilename].retain += t;
}
if (r.pressedSprite) {
u(cc.loader._cache[r.pressedSprite._textureFilename]);
cc.loader._cache[r.pressedSprite._textureFilename].retain += t;
}
if (r.hoverSprite) {
u(cc.loader._cache[r.hoverSprite._textureFilename]);
cc.loader._cache[r.hoverSprite._textureFilename].retain += t;
}
if (r.disabledSprite) {
u(cc.loader._cache[r.disabledSprite._textureFilename]);
cc.loader._cache[r.disabledSprite._textureFilename].retain += t;
}
}
var i = e.getComponent(cc.Label);
if (i && i.font && i.font instanceof cc.BitmapFont && i.font.spriteFrame) {
u(cc.loader._cache[i.font.spriteFrame._textureFilename]);
cc.loader._cache[i.font.spriteFrame._textureFilename].retain += t;
}
var a = e.getComponent(cc.RichText);
if (a && a.imageAtlas) {
var o = Object.keys(a.imageAtlas._spriteFrames);
if (0 < o.length) {
u(cc.loader._cache[a.imageAtlas._spriteFrames[o[0]]._textureFilename]);
cc.loader._cache[a.imageAtlas._spriteFrames[o[0]]._textureFilename].retain += t;
}
}
var n = e.getComponent(cc.ParticleSystem);
if (n && n._texture) {
u(cc.loader._cache[n._texture]);
cc.loader._cache[n._texture].retain += t;
}
var s = e.getComponent(cc.PageViewIndicator);
if (s && s.spriteFrame) {
u(cc.loader._cache[s.spriteFrame._textureFilename]);
cc.loader._cache[s.spriteFrame._textureFilename].retain += t;
}
var l = e.getComponent(cc.EditBox);
if (l && l.backgroundImage) {
u(cc.loader._cache[l.backgroundImage._textureFilename]);
cc.loader._cache[l.backgroundImage._textureFilename].retain += t;
}
var d = e.getComponent(cc.Mask);
if (d && d.spriteFrame) {
u(cc.loader._cache[d.spriteFrame._textureFilename]);
cc.loader._cache[d.spriteFrame._textureFilename].retain += t;
}
})(e, t);
i(e, t);
});
}
function o(t, c) {
if (t instanceof cc.Texture2D) {
cc.loader._cache[t.url].isStatic = !0;
cc.loader._cache[t.url].cusTag = c;
} else if (t instanceof cc.SpriteFrame) {
cc.loader._cache[t._textureFilename].isStatic = !0;
cc.loader._cache[t._textureFilename].cusTag = c;
} else if (t instanceof cc.Prefab) (function t(e, c) {
var r = e;
e.data && (r = e.data);
r instanceof cc.Scene || n(r, c);
var i = r._children;
i.forEach(function(e) {
n(e, c);
t(e, c);
});
})(t, c); else if (t instanceof cc.BitmapFont) {
cc.loader._cache[t.spriteFrame._textureFilename].isStatic = !0;
cc.loader._cache[t.spriteFrame._textureFilename].cusTag = c;
} else if (t instanceof cc.SpriteAtlas) {
Object.keys(t._spriteFrames).forEach(function(e) {
cc.loader._cache[t._spriteFrames[e]._textureFilename].isStatic = !0;
cc.loader._cache[t._spriteFrames[e]._textureFilename].cusTag = c;
});
} else t instanceof cc.AnimationClip ? cc.log("AnimationClip 资源加载未做处理") : t instanceof Object && t.name && cc.log("Object 资源加载未做处理");
}
function n(e, t) {
var c = e.getComponent(cc.Sprite);
if (c && c.spriteFrame && _isNullObj(cc.loader._cache[c.spriteFrame._textureFilename])) {
cc.loader._cache[c.spriteFrame._textureFilename].isStatic = !0;
cc.loader._cache[c.spriteFrame._textureFilename].cusTag = t;
}
var r = e.getComponent(cc.Button);
if (r) {
if (r.normalSprite && _isNullObj(cc.loader._cache[r.normalSprite._textureFilename])) {
cc.loader._cache[r.normalSprite._textureFilename].isStatic = !0;
cc.loader._cache[r.normalSprite._textureFilename].cusTag = t;
}
if (r.pressedSprite && _isNullObj(cc.loader._cache[r.pressedSprite._textureFilename])) {
cc.loader._cache[r.pressedSprite._textureFilename].isStatic = !0;
cc.loader._cache[r.pressedSprite._textureFilename].cusTag = t;
}
if (r.hoverSprite && _isNullObj(cc.loader._cache[r.hoverSprite._textureFilename])) {
cc.loader._cache[r.hoverSprite._textureFilename].isStatic = !0;
cc.loader._cache[r.hoverSprite._textureFilename].cusTag = t;
}
if (r.disabledSprite && _isNullObj(cc.loader._cache[r.disabledSprite._textureFilename])) {
cc.loader._cache[r.disabledSprite._textureFilename].isStatic = !0;
cc.loader._cache[r.disabledSprite._textureFilename].cusTag = t;
}
}
var i = e.getComponent(cc.Label);
if (i && i.font && i.font instanceof cc.BitmapFont && i.font.spriteFrame && _isNullObj(cc.loader._cache[i.font.spriteFrame._textureFilename])) {
cc.loader._cache[i.font.spriteFrame._textureFilename].isStatic = !0;
cc.loader._cache[i.font.spriteFrame._textureFilename].cusTag = t;
}
var a = e.getComponent(cc.RichText);
if (a && a.imageAtlas) {
var o = Object.keys(a.imageAtlas._spriteFrames);
if (0 < o.length && _isNullObj(cc.loader._cache[a.imageAtlas._spriteFrames[o[0]]._textureFilename])) {
cc.loader._cache[a.imageAtlas._spriteFrames[o[0]]._textureFilename].isStatic = !0;
cc.loader._cache[a.imageAtlas._spriteFrames[o[0]]._textureFilename].cusTag = t;
}
}
var n = e.getComponent(cc.ParticleSystem);
if (n && n._texture && _isNullObj(cc.loader._cache[n._texture])) {
cc.loader._cache[n._texture].isStatic = !0;
cc.loader._cache[n._texture].cusTag = t;
}
var s = e.getComponent(cc.PageViewIndicator);
if (s && s.spriteFrame && _isNullObj(cc.loader._cache[s.spriteFrame._textureFilename])) {
cc.loader._cache[s.spriteFrame._textureFilename].isStatic = !0;
cc.loader._cache[s.spriteFrame._textureFilename].cusTag = t;
}
var l = e.getComponent(cc.EditBox);
if (l && l.backgroundImage && _isNullObj(cc.loader._cache[l.backgroundImage._textureFilename])) {
cc.loader._cache[l.backgroundImage._textureFilename].isStatic = !0;
cc.loader._cache[l.backgroundImage._textureFilename].cusTag = t;
}
var d = e.getComponent(cc.Mask);
if (d && d.spriteFrame && _isNullObj(cc.loader._cache[d.spriteFrame._textureFilename])) {
cc.loader._cache[d.spriteFrame._textureFilename].cusTag = t;
cc.loader._cache[d.spriteFrame._textureFilename].isStatic = !0;
}
}
function h(e) {
var t, c = Array.isArray(e) ? [] : {};
for (t in e) e.hasOwnProperty(t) && (c[t] = "Object" == typeof e[t] ? h(e[t]) : e[t]);
return c;
}
function s() {
cc.director.getScene().dependAssets;
var e = h(cc.loader._cache), t = [];
for (var c in e) if (!e[c].isStatic && e[c].retain <= 0) {
t.push(e[c].url);
cc.loader.release(e[c].url);
}
var r = [];
for (var i in cc.loader._cache) if (cc.loader._cache[i].dependKeys && 0 < cc.loader._cache[i].dependKeys.length) {
for (var a = !1, o = 0; o < cc.loader._cache[i].dependKeys.length; o++) -1 !== t.indexOf(cc.loader._cache[i].dependKeys[o]) && (a = !0);
if (a) {
r.push(cc.loader._cache[i].url);
cc.loader.release(cc.loader._cache[i].url);
}
}
for (var n in cc.loader._cache) if (cc.loader._cache[n].dependKeys && 0 < cc.loader._cache[n].dependKeys.length) {
for (var s = !1, l = 0; l < cc.loader._cache[n].dependKeys.length; l++) -1 !== r.indexOf(cc.loader._cache[n].dependKeys[l]) && (s = !0);
s && cc.loader.release(cc.loader._cache[n].url);
}
t = [];
}
function l(e, t, c) {
if (e[t]) {
u(cc.loader._cache[e[t]._textureFilename]);
cc.loader._cache[e[t]._textureFilename].retain -= 1;
}
u(cc.loader._cache[c._textureFilename]);
cc.loader._cache[c._textureFilename].retain += 1;
e[t] = c;
}
var d = {}, p = null, r = {
loadRes: function(e, t, c) {
cc.loader.loadRes(e, t, function(e, t) {
e ? cc.log("[资源加载] 错误 " + e) : c(t);
});
},
loadStaticRes: function(e, t, c, r) {
e && t && r ? cc.loader.loadRes(e, t, function(e, t) {
if (e) cc.log("[资源加载] 错误 " + e); else {
r(t);
o(t, c);
}
}) : cc.log("参数错误");
},
retainScene: function(e) {
i(e, 1);
},
replaceSpriteTexture: function(e, t) {
if (e && t) if (e.getComponent(cc.Sprite)) {
l(e.getComponent(cc.Sprite), "spriteFrame", t);
s();
} else cc.log("目标节点没有Sprite组件"); else cc.log("参数错误");
},
replaceButtonTexture: function(e, t, c, r, i) {
if (e && t) if (e.getComponent(cc.Button)) {
var a = e.getComponent(cc.Button);
t && l(a, "normalSprite", t);
c && l(a, "pressedSprite", c);
r && l(a, "hoverSprite", r);
i && l(a, "disabledSprite", i);
s();
} else cc.log("目标节点没有Button组件"); else cc.log("参数错误");
},
instantiate: function(e, t, c) {
t && c || cc.log("参数不对, 请检查参数");
var r = cc.instantiate(e);
t.addChild(r);
c(r);
i(r, 1);
},
releaseStaticRes: function(e) {
(function(e) {
cc.director.getScene().dependAssets;
var t = h(cc.loader._cache), c = [];
for (var r in t) if (!e || t[r].cusTag == e) if (0 < t[r].retain && t[r].isStatic) cc.log(r + " 还在使用中..., 该纹理不会释放"); else if (t[r].retain <= 0) {
c.push(t[r].url);
cc.loader.release(t[r].url);
}
var i = [];
for (var a in cc.loader._cache) if (cc.loader._cache[a].dependKeys && 0 < cc.loader._cache[a].dependKeys.length) {
for (var o = !1, n = 0; n < cc.loader._cache[a].dependKeys.length; n++) -1 !== c.indexOf(cc.loader._cache[a].dependKeys[n]) && (o = !0);
if (o) {
i.push(cc.loader._cache[a].url);
cc.loader.release(cc.loader._cache[a].url);
}
}
for (var s in cc.loader._cache) if (cc.loader._cache[s].dependKeys && 0 < cc.loader._cache[s].dependKeys.length) {
for (var l = !1, d = 0; d < cc.loader._cache[s].dependKeys.length; d++) -1 !== i.indexOf(cc.loader._cache[s].dependKeys[d]) && (l = !0);
l && cc.loader.release(cc.loader._cache[s].url);
}
c = [];
})(e);
},
destroy: function(e) {
if (!e instanceof cc.Node) cc.log("你要销毁的不是一个节点"); else {
i(e, -1);
e.destroy();
s();
}
},
beforeSceneLoading: function(e, t) {
d = {};
var c = e.currentTarget._scene.dependAssets;
if (c && 0 < c.length) for (var r = 0; r < c.length; r++) {
if (cc.loader._cache[c[r]] && cc.loader._cache[c[r]].isStatic) {
d[r] = c[r];
delete c[r];
}
a(cc.loader._cache[c[r]]) && (cc.loader._cache[c[r]].retain -= 1);
}
Object.keys(cc.loader._cache).forEach(function(e) {
cc.loader._cache[e] && !cc.loader._cache[e].isStatic && 0 < cc.loader._cache[e].retain && a(cc.loader._cache[e]) && (cc.loader._cache[e].retain = 0);
});
},
afterSceneLaunch: function(e, t) {
for (var c in d) e.currentTarget._scene.dependAssets[c] = d[c];
var r = e.currentTarget._scene.dependAssets;
if (r && 0 < r.length) for (var i = r.length - 1; 0 <= i; i--) cc.loader._cache[r[i]] && cc.loader._cache[r[i]].isStatic || a(cc.loader._cache[r[i]]) && (cc.loader._cache[r[i]].retain += 1);
s();
},
playEffect: function(e, t) {
if (e && t) {
var c = cc.audioEngine.play(e, !1, t);
cc.audioEngine.setFinishCallback(c, function(e, t) {
cc.loader.release(cc.loader._cache[e.target.src].url);
});
return c;
}
cc.log("参数错误");
},
playMusic: function(e, t, c) {
if (e && c) {
p && cc.loader.release(cc.loader._cache[p].url);
p = e;
var r = cc.audioEngine.playMusic(e, t, c);
cc.audioEngine.setFinishCallback(r, function(e, t) {
cc.log("触发回调函数");
cc.loader.release(cc.loader._cache[e.target.src].url);
});
return r;
}
cc.log("参数错误");
}
};
t.exports = r;
cc._RF.pop();
}, {} ],
MemoryDetector: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "98487l0VuNIY55wSKLtCbl8", "MemoryDetector");
var r = {
_inited: !1,
showMemoryStatus: function() {
if (!cc.sys.isNative && !this._inited) {
var l = null, t = cc.profiler;
t.showStats();
(function() {
l = document.createElement("div");
t._fps = document.getElementById("fps");
t._fps.style.height = "100px";
var e = l.style;
e.color = "rgb(0, 255, 255)";
e.font = "bold 12px Helvetica, Arial";
e.lineHeight = "20px;";
e.width = "100%";
t._fps.appendChild(l);
})();
cc.director.on(cc.Director.EVENT_AFTER_VISIT, function() {
var e = 0, t = cc.textureCache._textures;
for (var c in t) {
var r = t[c];
e += r.getPixelWidth() * r.getPixelHeight() * 4;
}
var i = cc.textureCache._textureColorsCache;
for (var a in i) {
var o = i[a];
for (var n in o) {
var s = o[n];
e += s.width * s.height * 4;
}
}
l.innerHTML = "  Memory  " + (e / 1048576).toFixed(2) + " M";
});
this._inited = !0;
}
}
};
t.exports = r;
cc._RF.pop();
}, {} ],
ObserverMgr: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "e92c72NcxhJx5iFdLtdqt/A", "ObserverMgr");
t.exports = {
obsArray: {},
addEventListener: function(e, t, c) {
"undefined" == typeof c && console.log("[ObserverMgr] 注册消息 [%s]:%s 的作用于未定义", e, t.name);
"undefined" == typeof this.obsArray[e] && (this.obsArray[e] = []);
for (var r = 0; r < this.obsArray[e].length; r++) {
var i = this.obsArray[e][r];
if (i.func === t && i.ob === c) return;
}
this.obsArray[e].push({
func: t,
ob: c
});
},
removeEventListener: function(e, t, c) {
var r = !1, i = this.obsArray[e];
if (i) for (var a = 0; a < i.length; ) {
var o = i[a], n = o.func, s = o.ob;
if (t === n && c === s) {
i.splice(a, 1);
r = !0;
} else a++;
}
return r;
},
removeEventListenerWithMsg: function(e) {
var t = this.obsArray[e];
if (t) for (var c = 0; c < t.length; c++) t.splice(c, 1);
},
removeEventListenerWithObject: function(e) {
for (var t in this.obsArray) for (var c = this.obsArray[t], r = 0; r < c.length; ) {
c[r].ob === e ? c.splice(r, 1) : r++;
}
},
cleanAllEventListener: function() {
this.obsArray = {};
},
dispatchMsg: function(e, t) {
var c = this.obsArray[e];
if ("undefined" != typeof c) for (var r = 0; r < c.length; r++) {
var i = c[r], a = i.func, o = i.ob;
a && o && a.apply(o, [ e, t ]);
} else console.log("消息列表中不存在: " + e);
}
};
cc._RF.pop();
}, {} ],
Observer: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "2ab8eVyRspHdJWrPlYr1Egp", "Observer");
var r = e("ObserverMgr");
cc.Class({
extends: cc.Component,
_initMsg: function() {
for (var e = this._getMsgList(), t = 0; t < e.length; t++) {
var c = e[t];
r.addEventListener(c, this._onMsg, this);
}
},
onLoad: function() {},
_getMsgList: function() {
return [];
},
_onMsg: function(e, t) {},
_onError: function(e, t, c) {},
_onNetOpen: function() {},
_onErrorDeal: function(e, t) {
var c = t[0], r = t[1], i = t[2];
this._onError(c, r, i);
},
onDisable: function() {
r.removeEventListenerWithObject(this);
},
onEnable: function() {},
onDestroy: function() {
r.removeEventListenerWithObject(this);
}
});
cc._RF.pop();
}, {
ObserverMgr: "ObserverMgr"
} ],
Tips: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "534b8bkZKFE1qSf7u0IJi2O", "Tips");
t.exports = {
_logView: null,
show: function(i) {
this._logView && !1 === this._logView.isValid && (this._logView = null);
if (null === this._logView) {
var a = cc.director.getScene();
if (a) {
var o = cc.view.getVisibleSize().width, n = cc.view.getVisibleSize().height;
cc.loader.loadRes("prefab/log/LogView", function(e, t) {
if (!e) {
var c = cc.instantiate(t);
c.x = o / 2;
c.y = n / 2;
a.addChild(c);
var r = c.getComponent("LogView");
r && (this._logView = r).addLog(i);
}
}.bind(this));
}
} else {
var e = this._logView.node.parent.children.length;
this._logView.addLog(i);
this._logView.node.setLocalZOrder(e);
}
}
};
cc._RF.pop();
}, {} ],
UIMgr: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "7fff1Pn665PRISUtHP/Z26r", "UIMgr");
t.exports = {
_uiMap: {},
createPrefab: function(o, n) {
o ? cc.loader.loadRes("prefab/ComUIBg", function(e, t) {
if (e) console.log(e.errorMessage); else {
var c = cc.instantiate(t), r = c.getComponent("ComUIBg");
if (r) {
var i = r.addUI(o), a = i.uuid.toString();
this._uiMap[a] = c;
n && n(c, i);
}
}
}.bind(this)) : console.log("[UIMgr] 无法创建Prefab: " + o);
},
createPrefabAddToRunningScene: function(l, d) {
l ? cc.loader.loadRes("prefab/ComUIBg", function(e, t) {
var c = cc.instantiate(t), r = c.getComponent("ComUIBg");
if (r) {
var i = r.addUI(l), a = i.uuid.toString();
this._uiMap[a] = c;
var o = cc.director.getScene();
if (o) {
var n = cc.view.getVisibleSize().width, s = cc.view.getVisibleSize().height;
c.x = n / 2;
c.y = s / 2;
o.addChild(c);
d && d(i);
} else console.log("[UIMgr] 没有运行Scene,无法添加UI界面!");
}
}.bind(this)) : console.log("[UIMgr] 无法创建Prefab: " + l);
},
destroyUI: function(e) {
if (e) if (e.node) {
var t = e.node.uuid.toString(), c = this._uiMap[t];
if (c) {
c.destroy();
this._uiMap[t] = null;
} else console.log("[UIMgr]界面不是UIMgr创建的,无法销毁:" + e.node.name);
} else console.log("[UIMgr] " + e.name + " 没有node属性"); else console.log("[UIMgr] 缺少参数");
}
};
cc._RF.pop();
}, {} ],
Util: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "08ce3tyQidD1p66cpyoKlmR", "Util");
var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
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
var t = parseInt(e / 1e3), c = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = Math.floor(t % 3600 % 60);
return (c = this.prefix(c, 2)) + ":" + (r = this.prefix(r, 2)) + ":" + (i = this.prefix(i, 2));
},
randomByMaxValue: function(e) {
return Math.floor(Math.random() * e);
},
randomByMinToMax: function(e, t) {
return Math.floor(Math.random() * (t - e)) + e;
},
removeElementsFromArray: function(e, t) {
for (var c = -1, r = e.length, i = 0; i < r; i++) if (e[i] === t) {
c = i;
break;
}
0 <= c && e.splice(c, 1);
},
makeRdmStr: function(e) {
e = e || 32;
for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", c = t.length, r = "", i = 0; i < e; i++) r += t.charAt(Math.floor(Math.random() * c));
return r;
},
numCutOut: function(e, t) {
var c = (parseInt(e * Math.pow(10, t)) / Math.pow(10, t)).toString(), r = c.split(".");
if (1 === r.length) {
c += ".";
for (var i = 0; i < t; i++) c += "0";
} else if (2 === r.length) for (var a = r[1].length; a < t; a++) c += "0";
return c;
},
getUnixTime: function() {
return Math.round(new Date().getTime() / 1e3);
},
deepCopy: function(e) {
for (var t = [], c = 0, r = e.length; c < r; c++) e[c] instanceof Array ? t[c] = this.deepCopy(e[c]) : t[c] = e[c];
return t;
},
getRandomItemFromArray: function(e, t) {
var c = [];
for (var r in e) c.push(e[r]);
for (var i = [], a = 0; a < t && 0 < c.length; a++) {
var o = Math.floor(Math.random() * c.length);
i[a] = c[o];
c.splice(o, 1);
}
return i;
},
getMaxFromArray: function(e) {
return Math.max.apply(null, e);
},
getMaxCbFromArray: function(e, t) {
this.assert(1 <= e.length);
for (var c = t(e[0]), r = 0, i = 1; i < e.length; ++i) {
var a = t(e[i]);
if (c < a) {
c = a;
r = i;
}
}
return e[r];
},
getFiltedArray: function(e, t) {
var c = [], r = !0, i = !1, a = void 0;
try {
for (var o, n = e[Symbol.iterator](); !(r = (o = n.next()).done); r = !0) {
var s = o.value;
t(s) && c.push(s);
}
} catch (e) {
i = !0;
a = e;
} finally {
try {
!r && n.return && n.return();
} finally {
if (i) throw a;
}
}
return c;
},
getNowTime: function() {
var e = new Date();
return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
},
getIP: function() {
var e = new XMLHttpRequest();
e.onreadystatechange = function() {
4 === e.readyState && 200 <= e.status && e.status < 400 && console.log(e.responseText);
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
(function e(t, c) {
if (!(5 <= c)) {
for (var r = "", i = 0; i < c; ++i) r += "    ";
var a = r + "    ";
for (var o in t) {
var n = "值无法查看", s = "类型无法查看";
try {
n = t[o];
s = l(t[o]);
} catch (e) {}
console.log(r, o);
if ("object" == s) {
console.log(a, "type:", s);
console.log(a, "value: {");
e(t[o], c + 1);
console.log(a, "}");
} else {
console.log(a, "type:", s);
console.log(a, "value:", n);
}
}
if (t.prototype) {
console.log(r, "prototype: {");
e(t.prototype, c + 1);
console.log(r, "}");
}
}
})(e, 0);
console.log("=============print_tree end  ============");
}
};
cc._RF.pop();
}, {} ]
}, {}, [ "HelloWorld", "Index", "HotUpdate", "HotUpdateModule", "Observer", "ObserverMgr", "ButtonScaler", "Collision", "ComUIBg", "DialogMgr", "LoaderImage", "MemoryDetector", "Tips", "UIMgr", "Util" ]);