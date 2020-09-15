const HotUpdate = require("HotUpdate");
const Observer = require("Observer");
const DialogMgr = require('DialogMgr');
const HotUpdateModule = require('HotUpdateModule');
const Tips = require('Tips');

cc.Class({
    extends: Observer,

    properties: {
        versionLabel: {default: null, displayName: "版本号", type: cc.Label},
        updateProgress: {displayName: "热更新进度条", default: null, type: cc.ProgressBar},
        tipsLabel: {displayName: "消息提示", default: null, type: cc.Label},
    },

    _onMsg(msg, data) {
        if (msg === HotUpdateModule.Msg.OnUpdateVersionResult) {// 热更新结果
            if (data) {
                this.tipsLabel.string = "更新成功";
                Tips.show("更新成功");
                this._onShowDownLoadUpdateVersionResult(true);
            } else {
                this.tipsLabel.string = "更新失败";
                Tips.show("热更新失败");
                this._onShowDownLoadUpdateVersionResult(false);
            }
        } else if (msg === HotUpdateModule.Msg.OnUpdateProgress) {// 热更新进度
            console.log("[update]: 进度=" + data.fileProgress);
            this.updateProgress.progress = data.fileProgress;
            // data.msg;
            this.tipsLabel.string = "正在更新中,请耐心等待";
            console.log(data.msg);
        } else if (msg === HotUpdateModule.Msg.OnTipUpdateVersion) {// 提示更新版本
            if (data === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
                this._onShowNoticeUpdateLayer();
            } else if (data === jsb.EventAssetsManager.ALREADY_UP_TO_DATE) {// 版本一致,无需更新
                Tips.show("版本一致,无需更新,进入游戏中...");
                this._enterGame();
            } else {
                this._onShowNoticeCheckVersionFailed();
            }
        } else if (msg === HotUpdateModule.Msg.OnGetVersionInfo) {// 获取到版本信息
            //GameLocalStorage.setVersion(data.curVer, data.newVersion);
            this._updateVersionView(data.curVer, data.newVersion);
        }
    },
    _updateVersionView(curVer, newVer) {
        this.versionLabel.string = "服务器版本号: " + newVer + ",本地版本:" + curVer;
    },
    _getMsgList() {
        return [
            HotUpdateModule.Msg.OnGetVersionInfo,
            HotUpdateModule.Msg.OnTipUpdateVersion,
            HotUpdateModule.Msg.OnUpdateProgress,
            HotUpdateModule.Msg.OnUpdateVersionResult,
        ];
    },
    onLoad: function () {
        this._initMsg();
        this._initView();
        this._checkUpdate();
        this._initVersionFlag();
    },
    _initVersionFlag() {
        /*if (GameCfg.isDebugVersion) {
            Util.log("debug version");
            this.debugLabel.string = "Debug";
            this.debugLabel.node.active = true;
        } else {
            Util.log("release version");
            this.debugLabel.string = "";
            this.debugLabel.node.active = false;
        }*/
    },
    _onShowNoticeUpdateLayer() {
        Tips.show("提示更新");
        DialogMgr.showTipsWithOkBtn("检测到新版本,点击确定按钮开始更新", () => {
            console.log("点击确定键，进入到热更中");
            HotUpdate.hotUpdate();
        });
    },
    _onShowNoticeCheckVersionFailed() {
        Tips.show("检查更新失败");
        DialogMgr.showTipsWithOkBtn("检查更新失败,点击重试", function () {
            HotUpdate.checkUpdate();
        }.bind(this));
    },
    _onShowDownLoadUpdateVersionResult(result) {
        if (result) {
            DialogMgr.showTipsWithOkBtn("更新成功,点击确定重启游戏", function () {
                cc.audioEngine.stopAll();
                cc.game.restart();
            }.bind(this));
        } else {
            DialogMgr.showTipsWithOkBtn("更新失败,点击重试", function () {
                HotUpdate.checkUpdate();
            }.bind(this));
        }
    },
    _initView() {
        this.tipsLabel.string = "";
        this.versionLabel.string = "";
        this.updateProgress.progress = 0;
    },
    // 检查更新
    _checkUpdate() {
        if (cc.sys.isNative) {
            let str = "正在获取版本...";
            this.tipsLabel.string = str;
            console.log(str);
            // Tips.show(str);
            cc.resources.load("manifest/project", (err, data) => {
                if (err) {
                    console.log("load project manifest fail", JSON.stringify(err));
                    return;
                }
                try {
                    let ass = JSON.parse(data._nativeAsset);
                    console.log("热更版本文件： ver: " + ass.version + "  url:" + ass.packageUrl);
                } catch (e) {
                    console.log(e);
                }
                HotUpdate.init(data._nativeAsset);
                HotUpdate.checkUpdate();
            });
        } else {
            Tips.show("web 平台不需要热更新");
            this._enterGame();
        }
    },
    onBtnClickCheckUpdate() {
        this._checkUpdate();
    },
    _enterGame() {
        Tips.show("进入游戏成功");
        console.log("不需要热更新，直接进入到游戏");
        this.updateProgress.node.active = false;
        DialogMgr.showTipsWithOkBtn("点击确定键，进入其他场景", () => {
            console.log("点击确定键，进入其他场景");
            cc.director.loadScene("HelloWorld");
        });

    },
});
