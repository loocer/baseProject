export const RENT_WORDS = [
  '巴乐兔',
  '自如白条',
  '蘑菇租房',
  '磐谷分期',
  '房司令',
  '58月付',
  '会分期',
  '盈家生活',
  '应花分期',
  '趣租',
  '小雨滴',
  '租房宝',
  '租金易',
  '租了么',
  '斑马王国',
  '优客逸家',
  'V领地',
];

export const DECORATION_WORDS = [
  '小窝金服',
  '星易家居贷',
  '易日盛金融',
  '燕子安家',
  '土巴兔',
  '优装美家',
  '乐首付',
  '点分期',
  '万家分期',
  '齐家专享贷',
];

export const COMMON_WORDS = [
  '百度有钱花',
  '京东白条',
  '蚂蚁白领',
];

export const KW_RENT = 'rent';
export const KW_DECORATION = 'decoration';

const MAPPING = {
  rent: RENT_WORDS.concat(COMMON_WORDS),
  decoration: DECORATION_WORDS.concat(COMMON_WORDS),
};
const TREE = {};

export function getTree(name, words) {
  if (TREE[name]) return TREE[name];
  let cur = {};
  const root = cur;

  words.forEach((word) => {
    const arr = word.split('');
    arr.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(cur, key)) {
        cur = cur[key];
      } else {
        cur = cur[key] = {};
      }
    });
    cur.end = true;
    cur = root;
  });

  TREE[name] = root;
  return root;
}

export function search(type, content) {
  if (!content || !content.length) return [];
  const tree = getTree(type, MAPPING[type]);
  const size = content.length;
  const matchArr = [];
  let start = 0;
  let end;
  let cur;
  let match;
  let matchKey;
  let matchStr;

  while (start < size) {
    cur = tree;
    end = start;
    matchStr = '';
    match = false;

    /* eslint-disable no-constant-condition */
    do {
      matchKey = content.charAt(end);

      if (!(cur = cur[matchKey])) {
        start += 1;
        break;
      } else {
        matchStr += matchKey;
      }

      end += 1;

      if (cur.end) match = true;
    } while (true);

    if (match) {
      matchArr.push({
        key: matchStr,
        begin: start - 1,
        end,
      });
      start = end;
    }
  }

  return matchArr;
}
