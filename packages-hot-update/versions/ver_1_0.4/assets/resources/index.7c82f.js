window.__require = function t(e, n, i) {
function o(s, l) {
if (!n[s]) {
if (!e[s]) {
var a = s.split("/");
a = a[a.length - 1];
if (!e[a]) {
var r = "function" == typeof __require && __require;
if (!l && r) return r(a, !0);
if (c) return c(a, !0);
throw new Error("Cannot find module '" + s + "'");
}
s = a;
}
var u = n[s] = {
exports: {}
};
e[s][0].call(u.exports, function(t) {
return o(e[s][1][t] || t);
}, u, u.exports, t, e, n, i);
}
return n[s].exports;
}
for (var c = "function" == typeof __require && __require, s = 0; s < i.length; s++) o(i[s]);
return o;
}({
DialogLayer: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "8b1b4Xrxh9G6KgL3qqWeYpU", "DialogLayer");
cc.Class({
extends: cc.Component,
properties: {
okBtn: {
displayName: "确定按钮",
default: null,
type: cc.Node
},
cancelBtn: {
displayName: "取消按钮",
default: null,
type: cc.Node
},
closeBtn: {
displayName: "关闭按钮",
default: null,
type: cc.Node
},
tipsLabel: {
displayName: "提示语",
default: null,
type: cc.Label
},
_okCb: null,
_cancelCb: null,
_closeCb: null
},
onLoad: function() {},
showTipsWithOkBtn: function(t, e, n, i) {
this.okBtn.active = !0;
this.cancelBtn.active = !1;
this.tipsLabel.string = t;
this._okCb = e;
this._cancelCb = n;
this._closeCb = i;
},
showTipsWithOkCancelBtn: function(t, e, n, i) {
this.okBtn.active = !0;
this.cancelBtn.active = !0;
this.tipsLabel.string = t;
this._okCb = e;
this._cancelCb = n;
this._closeCb = i;
},
setCloseBtnVisible: function(t) {
this.closeBtn.active = t;
},
onClickBtnOk: function() {
this._okCb && this._okCb();
this.node && this.node.destroy();
},
onClickBtnCancel: function() {
this._cancelCb && this._cancelCb();
this.node && this.node.destroy();
},
onClickBtnClose: function() {
this._closeCb && this._closeCb();
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
LogViewItem: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "be9647MsTRK4JDhNnyYZAii", "LogViewItem");
cc.Class({
extends: cc.Component,
properties: {
word: {
displayName: "提示语",
default: null,
type: cc.Label
}
},
onLoad: function() {},
start: function() {},
runLogAction: function(t) {
this.word.string = t;
var e = cc.delayTime(2), n = cc.removeSelf(!0), i = cc.sequence([ e, n ]);
this.node.runAction(i);
}
});
cc._RF.pop();
}, {} ],
LogView: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "eb182sjYsxMFZGOjfhiLfL8", "LogView");
cc.Class({
extends: cc.Component,
properties: {
logNode: {
displayName: "log节点",
default: null,
type: cc.Node
},
logItem: {
displayName: "item",
default: null,
type: cc.Prefab
}
},
onLoad: function() {},
start: function() {},
addLog: function(t) {
var e = cc.instantiate(this.logItem);
this.logNode.addChild(e);
var n = e.getComponent("LogViewItem");
n && n.runLogAction(t);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "DialogLayer", "LogView", "LogViewItem" ]);