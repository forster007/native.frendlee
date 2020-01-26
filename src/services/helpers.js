/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

export function isValidateBSN(bsn) {
  return !((i = 1),
  (t = bsn.reduceRight((t, v) => t - v * ++i)),
  !t | t % 11 | ((i | 1) - 9));
}
