import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { REJECT_MAPPING } from '../../utils/reject-util';

export default class BaseFormContext extends PureComponent {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { form: this.props.form };
  }

  getFieldDecorator = (field, options, isNull) => {
    const { getFieldProps } = this.props.form;
    const { error, reasons } = this.state;
    let { info } = this.state;
    if (!info) {
      const { loan, id } = this.props;
      info = (loan && loan[id] && loan[id].info) || {};
    }
    const rejectError = {};

    if (!isNull) {
      options.initialValue = options.initialValue || info[field];

      if (options.initialValue && options.initialValue.length && !options.initialValue[0]) {
        options.initialValue = null;
      }
    } else {
      options.initialValue = null;
    }

    if (reasons && reasons[REJECT_MAPPING[field]]) {
      rejectError[field] = { reason: reasons[REJECT_MAPPING[field]].reason };
    }

    return Object.assign(
      { id: field, error: Object.assign(rejectError, error) },
      getFieldProps(field, options),
    );
  }

  initRejectError = (props, categories) => {
    const { loan, id } = props;

    if (loan && loan[id] && loan[id].fieldsMap && !this.initederror) {
      const reasons = {};
      const messages = [];

      this.initederror = true;
      Object.values(loan[id].fieldsMap).forEach((field) => {
        if (categories !== field.category && categories.indexOf(field.category) < 0) return;

        if (!field.property || field.property.indexOf(',') >= 0) {
          messages.push(field.reason);
        }

        if (reasons[field.property]) {
          reasons[field.property].reason = `${reasons[field.property].reason},${field.reason}`;
        } else {
          reasons[field.property] = field;
        }
      });

      this.setState({ reasons });
    }
  }
}
