import { Modal } from 'antd-mobile';

function empty() {}

export default (props) => {
  const {
    title, okText = '确定', cancelText = '取消', onOkHandler = empty, onCancelHandler = empty,
  } = props;

  Modal.alert(title, '', [
    { text: cancelText, onPress: onCancelHandler },
    { text: okText, style: { background: '#1B88EE', color: '#FFF' }, onPress: onOkHandler },
  ]);
};
