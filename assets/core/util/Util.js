module.exports = {
    log(str) {
        console.log("-------------------------------------------");
        console.log(str);
        console.log("*******************************************");
    },
    // 自动补0
    prefix(num, length) {
        if (num.toString().length >= length) {
            return num;
        } else {
            return (Array(length).join('0') + num).slice(-length);
        }
    },
    // 将剩余时间格式化输出
    formatTimeRemainTime(time) {
        let totalSecond = parseInt(time / 1000);
        let preHourSecond = 60 * 60;
        let preMinSecond = 60;

        let hour = Math.floor(totalSecond / preHourSecond);
        let minute = Math.floor(totalSecond % preHourSecond / preMinSecond);
        let second = Math.floor(totalSecond % preHourSecond % preMinSecond);

        hour = this.prefix(hour, 2);
        minute = this.prefix(minute, 2);
        second = this.prefix(second, 2);
        return hour + ":" + minute + ":" + second;
    },
    // 返回[0,maxNum)的数值
    randomByMaxValue(maxNum) {
        return Math.floor(Math.random() * maxNum);
    },
    //返回[min,max] 的数值
    randomByMinToMax(minNum, maxNum) {
        return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
    },
    // 从数组中删除指定元素,不能用于for循环中
    removeElementsFromArray: function (arr, element) {
        let index = -1;
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i] === element) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
        }
    },
    makeRdmStr: function (len) {

        len = len || 32;
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length;
        let ret = '';
        for (let i = 0; i < len; i++) {
            ret += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return ret;
    },
    numCutOut(num, len) {
        let a = parseInt(num * Math.pow(10, len));
        let ret = (a / Math.pow(10, len)).toString();
        let arr = ret.split('.');
        if (arr.length === 1) {
            ret += ".";
            for (let i = 0; i < len; i++) {
                ret += "0";
            }
        } else if (arr.length === 2) {
            let i = arr[1].length;
            for (; i < len; i++) {
                ret += "0";
            }
        }
        return ret;
    },
    getUnixTime: function () {
        return Math.round(new Date().getTime() / 1000);
    },
    // 对象的深拷贝
    deepCopy(obj) {
        let out = [], i = 0, len = obj.length;
        for (; i < len; i++) {
            if (obj[i] instanceof Array) {
                out[i] = this.deepCopy(obj[i]);
            }
            else out[i] = obj[i];
        }
        return out;
    },
    // 从数组中随机取出值
    getRandomItemFromArray(arr, num) {
        let tempArr = [];
        for (let index in arr) {
            tempArr.push(arr[index]);
        }

        let retArr = [];
        for (let i = 0; i < num; i++) {
            if (tempArr.length > 0) {
                let index = Math.floor(Math.random() * tempArr.length);
                retArr[i] = tempArr[index];
                tempArr.splice(index, 1);
            } else {
                break;
            }
        }
        return retArr;
    },
    //从数组中取出最大值
    getMaxFromArray(array) {
        let max = Math.max.apply(null, array);
        return max;
    },

    //对数组中每个元素e，取cb(e)值最大的元素
    getMaxCbFromArray(array, cb) {
        this.assert(array.length >= 1);

        let cb0_value = cb(array[0]);
        let ret_idx = 0;

        for(let i = 1; i < array.length; ++i)
        {
            let cb_value = cb(array[i]);
            if(cb_value > cb0_value)
            {
                cb0_value = cb_value;
                ret_idx = i;
            }
        }
        return array[ret_idx];
    },

    //对数组中每个元素e, 返回 filtedcb(e)为true的集合
    getFiltedArray(array, filtedcb) {
        let ret = [];
        for(let e of array)
        {
            if(filtedcb(e)){
                ret.push(e);
            }
        }
        return ret;
    },


    getNowTime() {
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        return hour + ":" + min + ":" + sec;
    },
    getIP() {
        let url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log(xhr.responseText);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    },

    getClientType() {
        /* let GameEnumValue = require('GameEnumValue');
         if (cc.sys.isNative) {
             if (cc.sys.platform === cc.sys.ANDROID) {
                 return GameEnumValue.ClientType.Android;
             } else if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) {
                 return GameEnumValue.ClientType.Ios;
             } else {
                 return GameEnumValue.ClientType.Other;
             }
         } else if (cc.sys.isBrowser) {
             return GameEnumValue.ClientType.Web;
         } else {
             return GameEnumValue.ClientType.Other;
         }*/
    },
    // 将node的层级调整为Parent下最高级
    reZorderToTop(node) {
        let parent = node.parent;
        let childrenLen = parent.children.length;
        node.setLocalZOrder(childrenLen);
    },


    assert(condition){
        if(!condition) {
            //开启浏览器任意异常暂停
            //https://stackoverflow.com/questions/12163266/break-into-chrome-debugger-when-console-assert-fails
            if(cc.sys.browserType === "chrome")     
            {
                alert("error occurs, please open chrome debugger tools and retry ");
                debugger;           //https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints
                //console.assert(false);
            }
            else if(cc.sys.browserType === "firefox")
            {
                alert("error occurs, please open firefox debugger tools and debug");
                debugger;   
            }else if(cc.sys.browserType === "safari")
            {
                alert("error occurs, please open safari debugger tools and debug");
                debugger;
            }
            else
            {
                console.log("not support browserType: ", cc.sys.browserType);
            }
        }
    },


    print_tree : function(o)
    {
        let print_with_space = function(obj, table_count)
        {
            if(table_count >= 5)//最多打印5层对象防止对象内部的循环引用造成死循环
                return;

            let lable = ""
            for(let i =0; i < table_count; ++i)
            {
                lable += "    ";
            }
            let detal_label = lable + "    "

            for(let member in obj)
            {
                let value = "值无法查看";
                let type = "类型无法查看";
                try 
                {
                    value = obj[member];
                    type = typeof(obj[member]);
                }
                catch(e)
                {
                    //do nothing
                }
                console.log(lable, member);

                if(type == "object")
                {
                    console.log(detal_label, "type:",type);
                    console.log(detal_label, "value: {");
                    print_with_space(obj[member], table_count+1);           
                    console.log(detal_label, "}");
                }
                else
                {
                    console.log(detal_label, "type:", type);
                    console.log(detal_label, "value:", value);
                }
            }

            if(obj.prototype)
            {
                console.log(lable, "prototype: {");
                print_with_space(obj.prototype, table_count+1);
                console.log(lable, "}");
            }
        };

        console.log("=============print_tree begin ===========");
        print_with_space(o, 0);

        console.log("=============print_tree end  ============");
    },
};