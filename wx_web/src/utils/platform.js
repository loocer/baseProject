import { Toast } from 'antd-mobile';

export const ANDROID = 'android';
export const IOS = 'ios';
export const WEB_VIEW = 'webview';

export function deducePlatform() {
  if (window.android) return ANDROID;
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.resultMsg) {
    return IOS;
  }
  return null;
}

let $cantakePhoto;
let $cantakeNewPhoto;
const EVENTS = {
  canTakePhoto: [],
  canTakeNewPhoto: [],
};

export const detect = {
  canTakePhoto: (callback) => {
    if (deducePlatform() === ANDROID) {
      if (window.android.selectImage !== undefined) callback();
    } else if (deducePlatform() === IOS) {
      if ($cantakePhoto === undefined) {
        EVENTS.canTakePhoto.push(callback);
        if (!window.detectCallback) {
          window.detectCallback = () => {
            $cantakePhoto = true;
            while (EVENTS.canTakePhoto.length) EVENTS.canTakePhoto.pop()();
          };
        }
        window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
          action: 'detect',
          type: 'openCustomCamera',
        }));
        setTimeout(() => { if ($cantakePhoto === undefined) $cantakePhoto = false; }, 2000);
      } else if ($cantakePhoto) {
        callback();
      }
    }
  },
  canTakeNewPhoto: (callback) => {
    if (deducePlatform() === ANDROID) {
      if (window.android.openImage !== undefined) callback();
    } else if (deducePlatform() === IOS) {
      if ($cantakeNewPhoto === undefined) {
        EVENTS.canTakeNewPhoto.push(callback);
        if (!window.canOpenNewCameraCallback) {
          window.canOpenNewCameraCallback = () => {
            $cantakeNewPhoto = true;
            while (EVENTS.canTakeNewPhoto.length) EVENTS.canTakeNewPhoto.pop()();
          };
        }
        window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
          action: 'detect',
          type: 'openNewUICamera',
        }));
        setTimeout(() => { if ($cantakeNewPhoto === undefined) $cantakeNewPhoto = false; }, 2000);
      } else if ($cantakeNewPhoto) {
        callback();
      }
    }
  },
};

let logined = false;
export function getAuthention(callback) {
  switch (deducePlatform()) {
    case ANDROID:
      callback({ userId: window.android.getUserId(), token: window.android.getToken() });
      break;
    case IOS:
      if (!window.getUserInfo) {
        window.getUserInfo = (userId, token) => {
          if (!logined) callback({ userId, token });
          logined = true;
        };
      }
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'getUserInfo',
      }));
      break;
    default:
      callback({});
  }
}

export function checkFace(id, idCard, idCardName, callback) {
  window.faceServiceFinish = (score, message) => {
    callback(score, message);
  };

  switch (deducePlatform()) {
    case ANDROID:
      window.android.startFaceService(id, idCard, idCardName);
      break;
    case IOS:
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'startFaceService',
        userId: id,
        loanId: id,
        idCard,
        idCardName,
      }));
      break;
    default:
      callback();
  }
}

let auditing = false;
export function startAutoReview(loanId, canSkip, callback) {
  if (auditing) return;
  auditing = true;
  setTimeout(() => { auditing = false; }, 1000 * 10);
  window.hasReviewInterface = window.hasReviewInterface || false;
  if (!window.selfHelpCensorServiceFinish) {
    window.selfHelpCensorServiceFinish = callback;
  }

  switch (deducePlatform()) {
    case ANDROID:
      if (!window.android.startReview) Toast.fail('没有检测到自动电核，请您升级app到最新版本后重试');
      window.android.startReview(loanId, canSkip ? 1 : 0);
      break;
    case IOS:
      window.selfHelpCensorServiceStart = () => { window.hasReviewInterface = true; };
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'startselfHelpCensorService',
        loanId,
        canSkip: canSkip ? 1 : 0,
      }));
      setTimeout(() => {
        if (!window.hasReviewInterface) Toast.fail('没有检测到自动电核，请您升级app到最新版本后重试');
      }, 2000);
      break;
    default:
      callback();
  }
}

export function showBar() {
  switch (deducePlatform()) {
    case ANDROID:
      if (window.android.showBar) window.android.showBar(1);
      break;
    case IOS:
      break;
    default:
      break;
  }
}

export function hideBar() {
  switch (deducePlatform()) {
    case ANDROID:
      if (window.android.showBar) window.android.showBar(0);
      break;
    case IOS:
      break;
    default:
      break;
  }
}

export function takePhoto(type, camera, callback) {
  window.selectImageCallback = (url) => {
    if (!url || !url.length) return;
    if (Array.isArray(url)) {
      callback(url[0]);
    } else if (/^\[.*\]$/.test(url)) {
      callback(JSON.parse(url)[0]);
    } else {
      callback(url);
    }
  };
  switch (deducePlatform()) {
    case ANDROID:
      window.android.selectImage(type);
      break;
    case IOS:
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'openCustomCamera',
        camera,
        type,
      }));
      break;
    default:
      break;
  }
}

export function takeNewPhoto(type, camera, callback) {
  window.selectImageCallback = (url) => {
    if (!url || !url.length) return;
    if (Array.isArray(url)) {
      callback(url[0]);
    } else if (/^\[.*\]$/.test(url)) {
      callback(JSON.parse(url)[0]);
    } else {
      callback(url);
    }
  };
  switch (deducePlatform()) {
    case ANDROID:
      window.android.openImage(camera);
      break;
    case IOS:
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'openNewUICamera',
        camera,
        type,
      }));
      break;
    default:
      break;
  }
}

export function openWindow(url) {
  switch (deducePlatform()) {
    case IOS:
      window.webkit.messageHandlers.resultMsg.postMessage(JSON.stringify({
        action: 'openNewPageWithOrderdDetailUrl',
        url,
      }));
      break;
    case ANDROID:
      window.android.goWeb(`page/${url}`);
      break;
    default:
      break;
  }
}
