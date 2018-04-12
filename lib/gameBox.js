// import imgLog from '../../base/js/imgLog';
// import help from './help';
import AndroidConnect from 'AndroidConnect';
window.TopicApp = {};
var gameBox = {
    isLogin: function() {
        /*登陆判断*/
        if (!config.isLogin) {
            if (config.isAndroid) {
                window.login.onJSIvoke();
            } else if (config.isIDevice) {
                jumpToClickLogin();
            }
            return false;
        } else {
            return true
        }
    },
    jumpToProfile: function(uid) {
        /*跳转个人主页*/
        if (this.isLogin() == true) {
            if (config.isAndroid) {
                android.onJsToProfileDetailsByPtUid(uid);
            } else if (config.isIDevice) {
                jumpToProfileDetailsByPtUid(uid)
            }
        }
    },
    showToast: function(text) {
        /*小黑窗*/
        if (config.isAndroid) {
            android.onJsToShowToast(text);
        } else if (config.isIDevice) {
            onJsToast(text)
        }
    },
    userSface: function() {
        /*头像*/
        var str;
        if (config.isAndroid) {
            str = JSON.parse(login.onLoadUserInfo()).sface;
        } else if (config.isIDevice) {
            str = onJsLoadUserInfo().avatarUrl
        }
        return str
    },
    userInfo: function() {
        /*用户信息，nick：昵称，sex：性别*/
        var str;
        if (config.isAndroid) {
            str = JSON.parse(login.onLoadUserInfo());
        } else if (config.isIDevice) {
            str = onJsLoadUserInfo()
        }
        return str
    },
    //跳转--新游--预约专区
    toReserveArea: function() {
      if (config.isAndroid) {
          android.toReserveArea()
      }
    },
    //跳转--找游戏--分类--街机游戏
    openMameList: function() {
      if (config.isAndroid) {
          android.openMameList()
      }
    },
    //跳转--找游戏--推荐--付费游戏
    onJsToPayGame: function() {
      if (config.isAndroid) {
          android.onJsToPayGame()
      }
    },
    //根据标签跳转频道
    onJsToTagDetail: function(tag) {
      if (config.isAndroid) {
          android.onJsToTagDetail(tag)
      }
    },
    //判断任务是否完成
    isTaskFinish: function(type,time) {
      if (config.isAndroid) {
          return android.isTaskFinish(type,'')
      }
    },
    //浏览视频资讯详情
    onJsToStrategyVideoDetail: function(videoId,gameId) {
      if (config.isAndroid) {
          android.onJsToStrategyVideoDetail(videoId,gameId)
      }
    },
    //打开游戏直播分类-全部分类
    onJsToLiveAllGameCategory: function() {
      if (config.isAndroid) {
          android.onJsToLiveAllGameCategory()
      }
    },
    //普通网页
    openWeb: function (url) {
      if (config.isAndroid) {
          android.openWeb(url)
      }
    },
    pageBackCallBack : function(callback) {
        window.android&&window.android.bindEvent("resume",'pageCallBack');
        window.pageCallBack = function() {
            callback && callback();
        }
    },
    share : function(){
        window.onJsShare && window.onJsShare();
    },
    shareForType : function(iosType){
        if (config.isIDevice) {
            onJsShareForType(iosType);
        }
    },
    downloadGameBox: function (showWechat) {
        var getQueryString = function (name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
        };
        var createWeChatTips = function () {
            let template = `<div class="m_filter" style="z-index:9999;position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5);">
            <div style="position:absolute;right:1.2rem;top:0.5rem;width:9.275rem;height:3.6rem;background:url(https://fs.img4399.com/ma~330_20170522071810_59222032b8ef5.png?t=1495408690) no-repeat;background-size:100% auto;"></div>
        </div>`;
            let oDiv = document.createElement('div');
            oDiv.innerHTML = template;
            document.body.appendChild(oDiv);
        }
        var downUrl = 'http://app.4399.cn/app-qd-game4399.html';
        var Emt = (function () {
          var env = {},
          navigator = window.navigator,
          userAgent = navigator.userAgent,
          ios = userAgent.match(/(iPad|iPhone|iPod)[^;]*;.+OS\s([\d_\.]+)/),
          android = userAgent.match(/(Android)\s([\d\.]+)/);

          env.isAndroid = (/android/gi).test(navigator.appVersion);
          env.isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
          env.isWebkit = /WebKit\/[\d.]+/i.test(userAgent);
          env.isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(userAgent) && !/CriOS/i.test(userAgent) && !/MQQBrowser/i.test(userAgent))) : false;

          if (ios) {
            env.device = ios[1];
            env.version = ios[2].replace(/_/g, '.');
          } else if (android) {
            env.version = android[2];
          }

          env.standalone = navigator.standalone;
          env.wechat = navigator.userAgent.indexOf("MicroMessenger") >= 0;
          env.gameStoreHD = navigator.userAgent.indexOf('GameStoreHD') >= 0;
          env.isMiui = /MiuiBrowser/gi.test(navigator.userAgent);
          return env;
        })();
        var IsPC = function () {
          var userAgentInfo = navigator.userAgent;
          var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
          var flag = true;
          for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.toLowerCase().indexOf(Agents[v].toLowerCase()) > 0) {
              flag = false;
              break;
            }
          }
          return flag;
        }
        if (Emt.wechat) {
          /*显示微信分享弹窗*/
          createWeChatTips && createWeChatTips();
          return false;
        }
        if (Emt.isIDevice) {
          location.href = "https://itunes.apple.com/cn/app/4399you-xi-mi-you-xi-zi-xun/id743599908?mt=8";
          return false;
        }
        AndroidConnect.launch("m4399://activityDetail?id=" + getQueryString('id') + "&url=" + config.indexUrl, function () {
          if (Emt.wechat) {
            location.href = "//app.4399.cn/app-qd-game4399.html";
            return false;
          }
          location.href = downUrl;
        });
  },
  checkAppVersion(w) {
      var str = window.navigator.userAgent.toLowerCase();
      var indexStr = '4399gamecenter/';
      var result = str.indexOf(indexStr);
      var startIndex = indexStr.length + result;
      var version = str.substring(startIndex, startIndex + 3);
      if (w == 3) {
          var num = parseInt(str.substring(startIndex, startIndex + 5).split('.').join(''));
      }
      if (w == 4) {
          var num = parseInt(str.substring(startIndex, startIndex + 7).split('.').join(''));
      }
      return { num: num, version: version };
  },
  checkGameBoxVersion(limitedVersion,cb) {
    let testVersion = {
      getVersionCode: function () {
        let ua = window.navigator.userAgent.split(';');
        let len = ua.length;
        let curVer = parseFloat(ua[len - 2]);
        if (isNaN(curVer)) {
            curVer = parseFloat(ua[len - 1]);
        }
        return curVer;
      },
      isVersionQuality: function () {
        let newVer=parseFloat(limitedVersion);
        let curVer = this.getVersionCode();
        if (curVer >= newVer) {
          return true;
        } else {
          return false;
        }
      },
      init: function () {
        if (cb) {
          cb(this.isVersionQuality())
        } else {
          if (!this.isVersionQuality()) {
            document.onclick = function () {
              location.href = 'http://huodong.4399.cn/daily/app-yxh.html?chn=game4399';
            };
          }
        }
      }
    };
    testVersion.init();
  },
  jumpToAddFeed: function(content) {
      //打开意见反馈
      console.log('jump');
      if(config.isAndroid){
          let id = window.location.href.indexOf('localhost') != '-1' ? 875 : 134196
          let str = `{"id":`+id+`,"content":"#`+content+`#"}`
          android.jumpToAddFeed(str);
      }
  },
  toFeedBack: function(defaultContent) {
      //打开意见反馈
      if(config.isAndroid){
          android.onJsToFeedBack(defaultContent);
      }
  },
  playVideo: function (title, url) {
    if (!window.isPhone) {
      alert('打开视频' + title);
      return
    }
    if (config.isAndroid) {
      android.playVideo(title, url)
    }
  },
  downloadApp: function(data) {
      if(window.android && android.exceFunc) {
        console.log(data);
          // var data = JSON.parse(android.exceFunc("getAppData", ""));
          var detail = {
              downUrl: data.downurl, //下载url
              is_plugin: 0,
              titleBgUrl: data.img,  //弹窗头部背景图片
              packageName: data.intro,  //package
              versionName: data.version,   //弹窗显示版本号
              versionCode: data.versioncode,   //versionCode
              desc: data.description,   //弹窗显示文本
              md5: data.md5_file,   //md5
              size_byte: data.size   //弹窗显示大小
          };
          android.exceFunc("onDownloadStart", JSON.stringify(detail));
      }
  }
};
module.exports = gameBox;
