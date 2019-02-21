import getUUID from './uuid';
import { QINIU_UPLOAD_PATH } from '../constants';

function empty() {}

const reqs = {};
const DEFAULT_OPTIONS = {
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  name: 'file',
  withCredentials: false,
  action: QINIU_UPLOAD_PATH,
};

function post(file, props) {
  let { data } = props;
  const { onStart, onProgress } = props;
  if (typeof data === 'function') {
    data = data(file);
  }
  const { uid } = file;
  const request = props.customRequest || uploadRequest;
  reqs[uid] = request({
    action: props.action,
    filename: props.name,
    file,
    data,
    headers: props.headers,
    withCredentials: props.withCredentials,
    onProgress: onProgress ? (e) => {
      onProgress(e, file);
    } : null,
    onSuccess: (ret, xhr) => {
      delete reqs[uid];
      props.onSuccess(ret, file, xhr);
    },
    onError: (err, ret) => {
      delete reqs[uid];
      props.onError(err, ret, file);
    },
  });
  onStart(file);
}

function upload(file, fileList, props) {
  if (!props.beforeUpload) {
    // always async in case use react state to keep fileList
    return setTimeout(() => post(file, props), 0);
  }

  const before = props.beforeUpload(file, fileList);
  if (before && before.then) {
    before.then((processedFile) => {
      const processedFileType = Object.prototype.toString.call(processedFile);
      if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
        post(processedFile, props);
      } else {
        post(file, props);
      }
    }).catch((e) => {
      console && console.log(e); // eslint-disable-line
    });
  } else if (before !== false) {
    setTimeout(() => post(file, props), 0);
  }
}

export default function doUpload(files, options = {}) {
  const postFiles = Array.prototype.slice.call(files);
  postFiles.forEach((file) => {
    file.uid = getUUID();
    upload(file, postFiles, Object.assign({}, DEFAULT_OPTIONS, options));
  });
}


function getError(option, xhr) {
  const msg = `cannot post ${option.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function uploadRequest(option) {
  const xhr = new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };


  xhr.open('post', option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) { //eslint-disable-line
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
