/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

export function isEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export function isEmpty(v) {
  if (v === null || v === undefined) return true;

  const isRealObject =
    v === Object(v) && Object.prototype.toString.call(v) === '[object Object]';
  const isRealArray =
    v === Object(v) && Object.prototype.toString.call(v) === '[object Array]';

  if (isRealArray) return v.length === 0;
  if (isRealObject) return Object.getOwnPropertyNames(v).length === 0;

  return undefined;
}

export function isValidateBSN(bsn) {
  return !((i = 1),
  (t = bsn.reduceRight((t, v) => t - v * ++i)),
  !t | t % 11 | ((i | 1) - 9));
}
