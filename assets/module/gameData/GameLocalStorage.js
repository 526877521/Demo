module.exports = {
    catchKey: "gameCatchKey",
    catchData: {
        curVer: "1.0",
        newVer: "1.0",
        localName: "",
        localPwd: "",
        userPhone: "",
        visitorToken: null,
        userToken: null,

        musicVolume: 1,// 音乐音量
        effectVolume: 1,// 音效音量

        noticeShowTime: null,// 公告上次展示时间
        serverEnterCode: null,
    },
    _isInit: false,
    initLocalStorage() {
        if (this._isInit === false) {
            this._isInit = true;

            let saveStr = cc.sys.localStorage.getItem(this.catchKey);
            if (saveStr) {
                let saveObj = JSON.parse(saveStr);

                this.catchData.curVer = saveObj.curVer;
                this.catchData.newVer = saveObj.newVer;
                this.catchData.userPhone = saveObj.userPhone;
                this.catchData.visitorToken = saveObj.visitorToken;
                this.catchData.userToken = saveObj.userToken;
                this.catchData.musicVolume = saveObj.musicVolume === undefined ? 1 : saveObj.musicVolume;
                this.catchData.effectVolume = saveObj.effectVolume === undefined ? 1 : saveObj.effectVolume;
                this.catchData.noticeShowTime = saveObj.noticeShowTime === undefined ? new Date() : saveObj.noticeShowTime;
                this.catchData.serverEnterCode = saveObj.serverEnterCode;
            } else {
                this.catchData.curVer = "1.0";
                this.catchData.newVer = "1.0";
            }
        } else {
            console.log("[GameLocalStorage] has init");
        }
    },
    setServerEnterCode(v) {
        this.catchData.serverEnterCode = v;
        this._save();
    },
    getServerEnterCode() {
        return this.catchData.serverEnterCode;
    },
    updateNoticeShowTime() {
        this.catchData.noticeShowTime = new Date();
        this._save();
    },
    _save() {
        let saveStr = JSON.stringify(this.catchData);
        cc.sys.localStorage.setItem(this.catchKey, saveStr);
    },
    getEffectVolume() {
        let ret = this.catchData.effectVolume;
        if (ret === undefined) {
            ret = 1;
        }
        return ret;
    },
    getMusicVolume() {
        let ret = this.catchData.musicVolume;
        if (ret === undefined) {
            ret = 1;
        }
        return ret;
    },
    setVolume(music, effect) {
        this.catchData.musicVolume = music;
        this.catchData.effectVolume = effect;
        // console.log("save: music=%s, effect=%s", music, effect);
        this._save();
    },
    setVersion(curVer, newVer) {
        this.initLocalStorage();
        this.catchData.curVer = curVer.toString();
        this.catchData.newVer = newVer.toString();
        this._save();
    },
    getCurVersion() {
        this.initLocalStorage();
        return this.catchData.curVer;
    },
    setLocalSaveNameAndPwd(name, pwd) {
        this.catchData.localName = name;
        this.catchData.localPwd = pwd;
        this._save();
    },
    getLocalSaveName() {

    },
    getLocalSavePwd() {

    },
    setUserPhone(phone) {
        this.catchData.userPhone = phone;
        this._save();
    },
    getUserPhone() {
        return this.catchData.userPhone;
    },
    setVisitorToken(token) {
        this.catchData.visitorToken = token;
        this._save();
    },
    getVisitorToken() {
        return this.catchData.visitorToken;
    },

    setUserToken(token) {
        this.catchData.userToken = token;
        this._save();
    },
    getUserToken() {
        return this.catchData.userToken;
    }


};