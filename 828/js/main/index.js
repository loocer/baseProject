import '../libs/weapp-adapter';
import '../libs/symbol';
import Main from './main';
import DataBus from './databus';
import { normal } from '../utils/tools';
import { netResourse } from '../utils/picss.js';
import { initRender } from './loading';
import { groundWidth, groundHeight, screenWidth, loadingImage } from '../utils/common';
let databus = new DataBus();
export const run = () => {
  const image = tt.createImage();
  image.src = 'images/bg/loader.png'; // const canvas = wx.createCanvas();

  const ctx = canvas.getContext('2d', {
    antialias: true
  });
  const wground = groundWidth;
  const hground = groundHeight;
  let sysInfo = tt.getSystemInfoSync(),
    width = sysInfo.windowWidth,
    height = sysInfo.windowHeight;
  tt.setKeepScreenOn({
    value: .8
  });
  tt.setPreferredFramesPerSecond(30)
  tt.setPreferredFramesPerSecond=30
  // tt.setPreferredFramesPerSecond=1  //  tt.setPreferredFramesPerSecond(60)
  // tt.showShareMenu({
  //   withShareTicket: true
  // });
  // tt.onShareAppMessage(function () {
  //   return {
  //     title: '子弹上膛，一梭子下去死一片，就是这么燃！',
  //     // imageUrlId: 'EaPjTeGFSY-aOIUlhIIWOw',
  //     imageUrl: 'images/share.png'
  //   };
  // });
  // normal();
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.height = height * window.devicePixelRatio;
  canvas.width = width * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  // databus.banner = tt.createBannerAd({
  //   adUnitId: 'adunit-5d516669164fc3c6',
  //   adIntervals: 50,
  //   style: {
  //     left: (screenWidth - 400) / 2,
  //     top: 10,
  //     width: 400
  //   }
  // });
  // databus.banner.onError(e => {
  //   console.log(e);
  // });
  // databus.videoAd = tt.createRewardedVideoAd({
  //   adUnitId: 'adunit-dc5ba2a345c46dc9'
  // });
  // databus.videoAd.onError(e => {
  //   console.log(e);
  // });
  // tt.setInnerAudioOption({
  //   mixWithOther: true
  // }); 

  // tt.getStorage({
  //   key: 'isShowLearn',

  //   success(res) {
  //     databus.isShowLearn = res.data;
  //   },

  //   fail(res) {
  //     databus.isShowLearn = true;
  //     console.log(res);
  //   }

  // });
  let df = [...netResourse]
  let downloadTaskList = [];
  let list = [];
  let index = 0;

  function downLoadPic() {
    list = [];
    downloadTaskList = [];
    index = 0;
    // console.log(netResourse)
    for (let obb of netResourse) {
      let task = tt.downloadFile({
        url: 'http://39.103.132.21/'+obb.fileId,
        success(res) {
          if (res.statusCode === 200) {
            index++;
            let obj = obb;
            obj.url = res.tempFilePath;
            list.push(obj);
            console.log(netResourse.length,list.length);
            initRender(ctx, index / netResourse.length * 100, image);

            if (netResourse.length == list.length) {
              databus.allImages = list;
              loadingImage();
              new Main(ctx);
            }
          }
        },
        fail(res) {
          console.log(`downloadFile调用失败`);
        },
      });
      downloadTaskList.push(task);

      // let task = tt.cloud.downloadFile({
      //   fileID: obb.fileId,
      //   // 文件 ID
      //   success: res => {
      //     index++;
      //     let obj = obb;
      //     obj.url = res.tempFilePath;
      //     list.push(obj);
      //     initRender(ctx, index / netResourse.length * 100, image);

      //     if (netResourse.length == list.length) {
      //       databus.allImages = list;
      //       loadingImage();
      //       new Main(ctx);
      //     }
      //   },
      //   fail: () => { }
      // });
      // downloadTaskList.push(task);
    }
  }

  image.onload = function () {
    downLoadPic();
    setTimeout(() => {
      if (netResourse.length != list.length) {
        tt.showToast({
          title: '网络无连接，加载失败，正在重新加载！',
          icon: 'none',
          duration: 2000
        });

        for (let obj of downloadTaskList) {
          obj.abort();
        }

        run();
      }
    }, 20000);
  };
};