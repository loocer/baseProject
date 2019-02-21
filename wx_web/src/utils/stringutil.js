export function formatMoney(num, p, s, t, d) {
  let places = !Number.isNaN(places = Math.abs(p)) ? p : 2;
  const symbol = s !== undefined ? s : '';
  const thousand = t || ',';
  const decimal = d || '.';
  const negative = num < 0 ? '-' : '';
  const number = Math.abs(+num || 0).toFixed(places);
  const i = `${parseInt(number, 10)}`;
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousand}`) +
    (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
}

export function formatCardNum(str) {
  if (!str) return '';
  return str.replace(/(\d{4})/ig, (num, arg1, position, no) => (position === 0 || position === no.length - 4 ? `${num} ` : '**** '));
}
