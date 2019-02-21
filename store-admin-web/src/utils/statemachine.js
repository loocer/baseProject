import debug from 'debug';

const echo = debug('statemachine');

export default class StateMachine {
  constructor(cfg, context) {
    this.initial = cfg.initial;
    this.states = cfg.states;
    this.ended = false;
    this.ctx = context;
  }

  start(state) {
    this.current = state || this.initial;
    return this;
  }

  execute(arg0, ...arg1) {
    if (this.ended) return;
    const args = arg1;
    let nextState = arg0;
    if (typeof arg0 !== 'string' && !arg1.length) {
      args.push(arg0);
      nextState = undefined;
    }
    if (nextState) {
      echo(`set next state is ${nextState}`);
      this.current = nextState;
    } else {
      const state = this.states[this.current];
      const flag = state.handle ? state.handle.bind(this.ctx)(...args) : NEXT;

      echo(`current state is ${this.current}, step into next ? ${flag === NEXT}`);

      if (flag === NEXT) {
        this.current = state.next;
        this.ended = !this.states[this.current].next;
        echo(`this ended ? ${this.ended}`);
      } else if (flag === PREV) {
        this.current = state.prev;
      }
    }

    return this;
  }

  end() {
    this.ended = true;
    return this;
  }

  reset() {
    this.ended = false;
    this.current = this.initial;
    return this;
  }
}

export const NEXT = 1;  // 流转到下一状态的标识
export const CURRENT = 0; // 保持当前状态的标识
export const PREV = -1; // 流转到上一状态的标识
