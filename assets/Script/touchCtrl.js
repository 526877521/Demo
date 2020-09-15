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
        },

        // efaults, set visually when attaching this script to the Canvas

    },
    checkCard(cardArr, touch) {
        for (var k = cardArr.length - 1; k >= 0; k--) {
            var box = cardArr[k].getBoundingBox();
            if (cc.rectContainsPoint(box, touch)) {
                cardArr[k].isCheck = true;
                cardArr[k].opacity = 200;
                return cardArr[k];
            }
        }
    },
    moveCard(cardArr){
        for (var k in cardArr) {
            if (cardArr[k].isCheck == true) {
                cardArr[k].isCheck =false;
                cardArr[k].y+=50;
            }
        }
    },
    getCheckCount: function (cardArr) {
        var sum = 0;
        for (var k in cardArr) {
            if (cardArr[k].isCheck == true) {
                sum++;
            }
        }
      
        return sum;
    },
    // use this for initialization
    onLoad: function () {
        var self = this;
        this.cards = [];
        for (let i = 0; i < 10; i++) {
            var cardPrefab = cc.instantiate(this.card);
            cardPrefab.isCheck = false;
            cardPrefab.index = i;
            cardPrefab.parent = this.node;
            cardPrefab.position = cc.p(300 + i * 30, 300);
            this.cards.push(cardPrefab);
        }

        self.touchCtrl.on("touchstart", function (event) {

            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.checkCard(self.cards, touchLoc);
        });
        self.touchCtrl.on("touchmove", function (event) {

            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.checkCard(self.cards, touchLoc);
        });
        self.touchCtrl.on("touchend", function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveCard(self.cards);
            // self.label.string=`end:(${Math.ceil(touchLoc.x)},${Math.ceil(touchLoc.y)})`;
        });
        self.touchCtrl.on("touchcancel", function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            // self.label.string=`touchcancel:(${Math.ceil(touchLoc.x)},${Math.ceil(touchLoc.y)})`;
        });
    },

    // called every frame
    update: function (dt) {
        this.label.string = "选中：" + this.getCheckCount(this.cards);
    },
});
