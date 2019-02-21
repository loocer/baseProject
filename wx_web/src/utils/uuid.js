const now = +(new Date());
let index = 0;

export default function (prefix = 'y-id') {
  return `${prefix}-${now}-${++index}`;
}
