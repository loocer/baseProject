import React from 'react';
import { connect } from 'dva';
import HouseComponent from '../components/House/House';

function House() {
  return (
    <HouseComponent />
  );
}

export default connect()(House);
