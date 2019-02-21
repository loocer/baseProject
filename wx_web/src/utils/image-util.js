import { QINIU_BASE_PATH } from '../constants';

function getUrl(url) {
  return /^\/?upload\/.*/.test(url) ? `${QINIU_BASE_PATH}${url.charAt(0) === '/' ? '' : '/'}${url}` : url;
}

export function getImageUrl(url) {
  if (/^data:image.*/.test(url)) return url;
  return `${getUrl(url).split('#')[0]}${/\?/.test(url) ? '&imageslim' : '?imageslim'}`;
}

export function getImageThumbUrl(url) {
  return `${getUrl(url).split('#')[0]}${/\?/.test(url) ? '&imageView2/0/w/100/h/100' : '?imageView2/0/w/100/h/100'}`;
}

export function getImageCameraType(url) {
  if (url) {
    const imgArr = url.split('_');
    const imgType = imgArr[imgArr.length - 1];
    const [type] = imgType.split('.');
    if (type === 'photo' || type === 'camera') return type;
    return false;
  }
}
