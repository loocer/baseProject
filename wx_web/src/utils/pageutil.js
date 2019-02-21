export function close() {
  if (window.WeixinJSBridge) {
    window.WeixinJSBridge.call('closeWindow');
  } else if (window.android) {
    window.android.close();
  } else if (window.webkit && window.webkit.messageHandlers
    && window.webkit.messageHandlers.resultMsg) {
    window.webkit.messageHandlers.resultMsg.postMessage('{"action":"back"}');
  } else {
    window.open(window.location, '_self', '').close();
  }
}
