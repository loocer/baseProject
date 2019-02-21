import React from 'react';
import { connect } from 'dva';
import OrderComponent from '../components/Order/Order';

function Order() {
  return (
    <OrderComponent />
  );
}

export default connect()(Order);
