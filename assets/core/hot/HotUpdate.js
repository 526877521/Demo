let ObserverMgr = require('ObserverMgr');
let HotUpdateModule = require('HotUpdateModule');

module.exports = {
    _assetsMgr: null,
    _isUpdating: null,//是否正在热更中
    // --------------------------------检查更新--------------------------------
    _compareVersion(versionA, versionB) {
        console.log("客户端版本: " + versionA + ', 当前最新版本: ' + versionB);
        ObserverMgr.dispatchMsg(HotUpdateModule.Msg.OnGetVersionInfo, {curVer: versionA, newVersion: versionB});
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        for (let i = 0; i < vA.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            } else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        } else {
            return 0;
        }
    },
    reCheckVersion: function () {
        this._assetsMgr.downloadFailedAssets();
    },
    // 检查更新
    checkUpdate() {
        if (!this._assetsMgr.getLocalManifest() || !this._assetsMgr.getLocalManifest().isLoaded()) {
            console.log('加载本地 manifest 失败 ...');
            return;
        }
        if (this._isUpdating) {
            return
        }

        console.log("[HotUpdate] checkUpdate");
        this._assetsMgr.setEventCallback(this._checkCallBack.bind(this));
        this._assetsMgr.checkUpdate();
    },

    _checkCallBack(event) {
        cc.log('热更新检查结果: ' + event.getEventCode());
        /*let remoteManifest = this._assetsMgr.getRemoteManifest();
        let v = remoteManifest.getSearchPaths();
        for (let k = 0; k < v.length; k++) {
            let item = v[k];
            console.log(JSON.stringify(v[k]));
        }*/
        let code = event.getEventCode();
        switch (event.getEventCode()) {
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
                console.log('发现新版本,请更新');
                break;
            default:
                return;
        }
        ObserverMgr.dispatchMsg(HotUpdateModule.Msg.OnTipUpdateVersion, code);
    },
    // --------------------------------开始更新--------------------------------
    hotUpdate() {
        console.log("开始热更", this._assetsMgr, this._isUpdating);
        if (this._assetsMgr && !this._isUpdating) {
            this._isUpdating = true;
            this._assetsMgr.setEventCallback(this._hotUpdateCallBack.bind(this));
            this._assetsMgr.update();
        }
        console.log("客户端开始热更");
    },
    _hotUpdateCallBack(event) {
        console.log("hotUpdate Code: " + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('没有发现本地的 manifest, 跳过热更新.');
                this._onUpdateFailed();
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:// 下载成功
                let data = {};
                // console.log(JSON.stringify(event));
                let filePro = event.getPercentByFile();
                if (!filePro) {
                    filePro = 0;
                }
                data.fileProgress = filePro.toFixed(2) || 1;
                data.byteProgress = event.getPercent().toFixed(2);
                data.msg = "";
                let msg = event.getMessage();
                if (msg) {
                    console.log('Updated file: ' + msg);
                    cc.log(event.getPercent().toFixed(2) + '% : ' + msg);
                    data.msg = msg;
                }
                ObserverMgr.dispatchMsg(HotUpdateModule.Msg.OnUpdateProgress, data);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('下载 manifest 失败, 跳过热更新.');
                this._onUpdateFailed();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('已经和远程版本一致 ');
                this._onUpdateFailed();
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('更新完成 ' + event.getMessage());
                this._onUpdateFinished();
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('更新失败. ' + event.getMessage());
                this._onUpdateFailed();
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('资源更新发生错误: ' + event.getAssetId() + ', ' + event.getMessage());
                this._onUpdateFailed();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log("hotUpdateCallBack", event.getMessage());
                this._onUpdateFailed();
                break;
            default:
                //this._onUpdateFailed();
                break;
        }
    },
    _onUpdateFailed() {

        ObserverMgr.dispatchMsg(HotUpdateModule.Msg.OnUpdateVersionResult, false);
    },
    // 更新完成
    _onUpdateFinished() {
        let searchPaths = jsb.fileUtils.getSearchPaths();
        let newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
        console.log("onUpdateFinished", JSON.stringify(newPaths));
        Array.prototype.unshift(searchPaths, newPaths);
        cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));

        jsb.fileUtils.setSearchPaths(searchPaths);
        ObserverMgr.dispatchMsg(HotUpdateModule.Msg.OnUpdateVersionResult, true);
    },

    // 移除临时manifest文件
    removeTmpManifestFile(storagePath) {
        // let tempStoragePath = storagePath + '_temp';// /
        //jsb.fileUtils.renameFile(this._storagePath+'/', this.TEMP_VERSION_FILENAME, this.VERSION_FILENAME);//
    },
    removeFile(file) {
        if (jsb.fileUtils.isFileExist(file)) {
            jsb.fileUtils.removeFile(file);
            if (!jsb.fileUtils.isFileExist(file)) {
                console.log('[HotUpdate] remove file success: ' + file);
            } else {
                console.log('[HotUpdate] remove file failed: ' + file);
            }
        } else {
            console.log("[HotUpdate] file not exist: " + file);
        }
    },
    // 移除临时资源目录
    removeTempDir(storagePath) {
        let tempStoragePath = storagePath + '_temp';
        this.removeDirectory(tempStoragePath);
    },
    removeDirectory: function (path) {
        if (jsb.fileUtils.isDirectoryExist(path)) {
            jsb.fileUtils.removeDirectory(path);
            if (!jsb.fileUtils.isDirectoryExist(path)) {
                console.log("[HotUpdate] removeDir success: " + path);
            } else {
                console.log("[HotUpdate] removeDir failed: " + path);
            }
        } else {
            console.log("[HotUpdate] dir not exist: " + path);
        }
    },
    // ------------------------------初始化------------------------------
    init(manifestProject) {
        if (!cc.sys.isNative) {
            return;
        }
        let storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset';
        console.log('热更新资源存放路径 : ' + storagePath);

        this._assetsMgr = new jsb.AssetsManager("", storagePath, this._compareVersion.bind(this));

        //加载manifest文件
        let manifest = new jsb.Manifest(manifestProject, storagePath);
        this._assetsMgr.loadLocalManifest(manifest, storagePath);

        console.log('[HotUpdate] local packageUrl:' + this._assetsMgr.getLocalManifest().getPackageUrl());
        console.log('[HotUpdate] project.manifest remote url:' + this._assetsMgr.getLocalManifest().getManifestFileUrl());
        console.log('[HotUpdate] version.manifest remote url:' + this._assetsMgr.getLocalManifest().getVersionFileUrl());

        // 比较版本
        this._assetsMgr.setVersionCompareHandle(this._compareVersion.bind(this));

        this._assetsMgr.setVerifyCallback((path, asset) => {
            let compressed = asset.compressed;
            let expectedMD5 = asset.md5;
            let relativePath = asset.path;
            let size = asset.size;
            if (compressed) {
                console.log("客户端热更Verification passed compress : " + relativePath);
                return true;
            } else {
                console.log(" 客户端热更 Verification passed : " + relativePath + " (" + expectedMD5);
                return true;
            }
        });

        // 安卓手机设置 最大并发任务数量限制为2
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._assetsMgr.setMaxConcurrentTask(10);
        }
    },

};
