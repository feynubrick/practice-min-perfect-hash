const { charSet } = require('./data');
const PositionalNotationNumber = require('./positional-notation-number');

const CODE_LENGTH = 6;

const hash = function ({ numBase10 }) {
  const ceilPow = Math.floor(Math.log(Math.pow(charSet.length, CODE_LENGTH) - 1) / Math.log(2));
  console.log('ceilPow: ', ceilPow);
  const ceil = Math.pow(2, ceilPow) - 1;
  console.log('ceil: ', ceil);
  if (numBase10 > ceil) {
    throw new Error(`number exceeds limit: ${ceil}`);
  }

  const maxPositionIndex = PositionalNotationNumber.findMaxPositionIndex({ numBase10: ceil, base: 2 });
  console.log('maxPositionIndex: ', maxPositionIndex);
  const numberToBase2 = PositionalNotationNumber.convertBase({ numBase10, base: 2 });
  console.log('numberToBase2: ', numberToBase2);
  let zeroFilled = numberToBase2.fillZeroesToLeft({ length: maxPositionIndex + 1 });
  console.log('zeroFilled: ', zeroFilled);
  let reversed = zeroFilled.reverseDigits();
  console.log('reversed: ', reversed);

  return reversed.base10Number;
};

const getCode = ({ numBase10 }) => {
  let hashedNumber = hash({ numBase10 });
  console.log('hashedNumber: ', hashedNumber);
  const convertedNum = PositionalNotationNumber.convertBase({ numBase10: hashedNumber, base: charSet.length });
  convertedNum.fillZeroesToLeft({ length: CODE_LENGTH });
  const code = convertedNum.digits.map((d) => charSet[d]).join('');
  return code;
};

let number = 4;
console.log('number: ', number);
let code = getCode({ numBase10: number });
console.log('code: ', code);
