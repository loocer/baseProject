import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Progress, Toast, Modal } from 'antd-mobile';
import Viewer from '../image/Viewer';
import upload from '../../../utils/file-uploader';
import getUUID from '../../../utils/uuid';
import { detect, takePhoto, takeNewPhoto } from '../../../utils/platform';
import { getImageUrl } from '../../../utils/image-util';
import styles from './ImagePicker.less';

function getImgName(suffix, type) {
  const now = new Date();
  const time = moment(now).format('YYYY_MM_DD/HH_mm_ss');
  return `upload/image/${time}_${now.getTime()}_${~~(Math.random() * 1000000)}${suffix || getType(type)}`;
}

function getType(type) {
  const arr = /image\/(.*)/.exec(type);

  if (arr && arr[1]) {
    return arr[1] === 'jpeg' ? '.jpg' : `.${arr[1]}`;
  } else {
    return '';
  }
}

export default class ImagePicker extends PureComponent {
  static propTypes = {
    camera: PropTypes.string,
    title: PropTypes.string,
    overlayer: PropTypes.element, // eslint-disable-line
    onChange: PropTypes.func, // eslint-disable-line
  }

  static defaultProps = {
    title: '',
    camera: '',
  }

  constructor(props) {
    super(props);
    const { token, src } = props;
    this.state = {
      token,
      src,
      canTakePhoto: false,
      canTakeNewPhoto: false,
    };
  }

  componentDidMount() {
    detect.canTakePhoto(() => {
      this.setState({ canTakePhoto: true });
    });
    detect.canTakeNewPhoto(() => {
      this.setState({ canTakeNewPhoto: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { token, src } = nextProps;
    if (!this.state.token || src) {
      this.setState({ token, src });
    }
  }

  onUploadHandler = (e) => {
    try {
      const { files } = e.target;
      if (!files) {
        Toast.info('获取不到要上传的文件');
        return;
      }
      const type = Object.prototype.toString.call(files);
      const inputFile = type === '[object File]' ? files : files[files.length ? files.length - 1 : 0];
      const { token } = this.state;

      if (inputFile.size === 0) {
        Toast.fail('找不到上传的文件，请重新选择');
        return;
      }

      upload([inputFile], {
        data: { token, key: getImgName(inputFile.name.substr(inputFile.name.lastIndexOf('.')), inputFile.type) },
        onProgress: ({ percent }) => {
          this.setState({ progress: percent });
          if (this.props.onProgress) this.props.onProgress(percent);
        },
        onSuccess: (response, file) => {
          const reader = new FileReader();
          const { key, size } = response;

          if (size !== undefined && ~~size === 0) {
            Toast.fail('文件上传失败');
            return;
          }

          if (this.props.onChange) {
            this.props.onChange(key);
          }

          reader.onload = (event) => {
            this.setState({ src: event.target.result, progress: null });
          };

          reader.readAsDataURL(file);
        },
        onError: () => {
          Toast.fail('上传失败', 2, null, false);
          this.setState({ progress: null });
        },
      });
      this.setState({ visible: false });
    } catch (error) {
      Toast.fail(error.message);
    }
  }

  onNativeUpload = () => {
    if (!this.props.disabled) this.onTakePhotoHandler();
  }

  onShowActionSheetHandler = () => {
    if (!this.props.disabled) this.setState({ visible: true });
  }

  onTakePhotoHandler = (type) => {
    this.setState({ visible: false });
    const { camera } = this.props;
    if (this.state.canTakeNewPhoto) {
      takeNewPhoto(type, camera, (url) => {
        this.setState({ src: getImageUrl(url), visible: false });
        if (this.props.onChange && this.state.canTakeNewPhoto) {
          this.props.onChange(url, 'native');
        }
      });
    } else {
      takePhoto(type, camera, (url) => {
        this.setState({ src: getImageUrl(url), visible: false });
        this.props.onChange(url);
      });
    }
  }

  getFileInput = () => {
    return (<input
      type="file"
      id={this.id}
      key="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(this.onUploadHandler)}
      multiple
    />);
  }

  id = getUUID('ip-');

  renderPreview = (className, style) => {
    return (<div className={className} style={Object.assign({ zIndex: 0 }, style)}>
      {this.getFileInput()}
      <div onClick={this.onShowActionSheetHandler}>
        <div className={styles.preview}>
          <img src={this.state.src} alt="" />
        </div>
        <div className="preview-title"><span>{this.props.title}</span></div>
        {typeof this.state.progress === 'number' ? <Progress percent={this.state.progress} /> : null}
      </div>
    </div>);
  }

  renderUpload = (className, children, style) => {
    const inputFile = this.getFileInput();
    const progress = typeof this.state.progress === 'number' && <Progress percent={this.state.progress} key={4} />;
    if (this.state.canTakeNewPhoto) {
      return (<div className={className} style={style} onClick={this.onNativeUpload}>
        {children}
      </div>);
    }
    if (this.state.canTakePhoto) {
      return (<div className={className} style={style} onClick={this.onShowActionSheetHandler}>
        {children}
      </div>);
    }

    if (this.props.overlayer) {
      const picker = <div className={className} style={style}>{inputFile}{children}{progress}</div>;
      return typeof this.state.progress === 'number' ? picker : React.cloneElement(this.props.overlayer, { picker, id: this.id });
    } else {
      return (<label htmlFor={this.id} className={className} style={style}>
        {inputFile}
        {children}
        {progress}
      </label>);
    }
  }

  renderActionSheet = () => {
    const children = [];

    if (this.state.src) children.push(<li onClick={() => { this.setState({ preview: true, visible: false }); }} key="preview">查看大图</li>);
    if (this.state.canTakeNewPhoto) {
      children.push(<li onClick={this.onTakePhotoHandler.bind(this, 1)} key="camera">修改图片</li>);
    } else if (this.state.canTakePhoto) {
      children.push(<li onClick={this.onTakePhotoHandler.bind(this, 0)} key="photo">读取相册</li>);
      children.push(<li onClick={this.onTakePhotoHandler.bind(this, 1)} key="camera">拍摄照片</li>);
    } else {
      children.push(<li key="edit">
        {
          this.props.overlayer ? React.cloneElement(this.props.overlayer, {
            picker: <div>{this.getFileInput()}修改图片</div>,
            id: this.id,
          }) : <label htmlFor={this.id}>{this.getFileInput()}修改图片</label>
        }
      </li>);
    }
    return children;
  }

  renderPicker(className, children, style = {}) {
    return (<div className={this.props.error ? styles.error : ''}>
      {this.state.src && !this.hide ?
        this.renderPreview(className, style)
        : this.renderUpload(className, children, style)
      }
      <Modal
        popup
        visible={this.state.visible}
        animationType="slide-up"
        onClose={() => { this.setState({ visible: false }); }}
        className={styles.modal}
      >
        <ul className={styles['op-group']}>
          {this.renderActionSheet()}
          <li onClick={() => { this.setState({ visible: false }); }}>取消</li>
        </ul>
      </Modal>
      <Viewer
        visible={this.state.preview}
        onClose={() => { this.setState({ preview: false }); }}
        src={this.state.src}
      />
    </div>);
  }

  render() {
    const { className, style, children } = this.props;
    return this.renderPicker(className, children, style);
  }
}
