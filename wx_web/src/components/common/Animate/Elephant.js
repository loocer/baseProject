import React, { PureComponent } from 'react';

export default class Elephant extends PureComponent {
  render() {
    return (<section className="ym-animate-elephant-wrap">
      <div className="ele-wrapper">
        <div className="ele-tail" />
        <div className="ele-body">
          <div className="ele-head">
            <div className="ele-eyebrows" />
            <div className="ele-eyes" />
            <div className="ele-mouth" />
            <div className="ele-fang-front" />
            <div className="ele-fang-back" />
            <div className="ele-ear" />
          </div>
        </div>
        <div className="ele-leg-1 ele-leg-back">
          <div className="ele-foot" />
        </div>
        <div className="ele-leg-2 ele-leg-front">
          <div className="ele-foot" />
        </div>
        <div className="ele-leg-3 ele-leg-back">
          <div className="ele-foot" />
        </div>
        <div className="ele-leg-4 ele-leg-front">
          <div className="ele-foot" />
        </div>
      </div>
    </section>);
  }
}
