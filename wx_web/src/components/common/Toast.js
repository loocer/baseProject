import classnames from 'classnames';
import React from 'react';
import Notification from 'rmc-notification';
import Icon from './Icon';

let messageInstance;
const prefixCls = 'am-toast';

function getMessageInstance(mask, callback) {
  if (messageInstance) {
    messageInstance.destroy();
    messageInstance = null;
  }
  Notification.newInstance(
    {
      prefixCls,
      style: {}, // clear rmc-notification default style
      transitionName: 'am-fade',
      className: classnames({
        [`${prefixCls}-mask`]: mask,
        [`${prefixCls}-nomask`]: !mask,
      }),
    },
    notification => callback && callback(notification),
  );
}

function notice(
  content,
  icon,
  duration = 3,
  onClose,
  mask = true,
) {
  getMessageInstance(mask, (notification) => {
    messageInstance = notification;

    notification.notice({
      duration,
      style: {},
      content: (<div
        className={`${prefixCls}-text ${prefixCls}-text-icon`}
        role="alert"
        aria-live="assertive"
      >
        <Icon type={icon} />
        <div className={`${prefixCls}-text-info`}>{content}</div>
      </div>),
      closable: true,
      onClose() {
        if (onClose) {
          onClose();
        }
        notification.destroy();
        notification = null; // eslint-disable-line
        messageInstance = null;
      },
    });
  });
}

export default (content, icon, duration, onClose, mask) =>
  notice(content, icon, duration, onClose, mask);
