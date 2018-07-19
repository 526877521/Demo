cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 0.9,
        time: 0.1,
    },

    onLoad: function () {
        let self = this;
        this.initScale = this.node.scale;
        this.downAction = new cc.ScaleTo(this.time, this.pressedScale);
        this.upAction = new cc.ScaleTo(this.time, this.initScale);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.stopAllActions();
            this.runAction(self.downAction);
            this.opacity = 255;
            return true;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.stopAllActions();
            this.runAction(self.upAction);
            this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.stopAllActions();
            this.runAction(self.upAction);
            this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
        }, this.node);
    },
});
