// 身份证号验证
export function isIdCardNo(num) {
  const len = num.length;
  let re;
  if (len === 15) {
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
  } else if (len === 18) {
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
  } else {
    return false;
  }
  const a = num.match(re);
  let B;
  if (a != null) {
    if (len === 15) {
      const D = new Date(`19${a[3]}/${a[4]}/${a[5]}`);
      B = D.getYear() === Number(a[3]) &&
        (D.getMonth() + 1) === Number(a[4]) && D.getDate() === Number(a[5]);
    } else {
      const D = new Date(`${a[3]}/${a[4]}/${a[5]}`);
      B = D.getFullYear() === Number(a[3]) &&
        (D.getMonth() + 1) === Number(a[4]) && D.getDate() === Number(a[5]);
    }
    if (!B) {
      return false;
    }
  }
  if (!re.test(num)) {
    return false;
  }
  return true;
}
