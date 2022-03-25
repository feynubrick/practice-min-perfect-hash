const { charSet } = require('./data');
const PositionalNotationNumber = require('./positional-notation-number');

const CODE_LENGTH = 6;

const hash = function ({ numBase10 }) {
  const ceil = Math.pow(charSet.length, CODE_LENGTH) - 1;
  if (numBase10 > ceil) {
    throw new Error(`number exceeds limit: ${ceil}`);
  }

  const maxPosition = PositionalNotationNumber.findMaxPosition({ numBase10: ceil, base: 2 });
  const numberToBase2 = PositionalNotationNumber.convertBase({ numBase10, base: 2 });
  let zeroFilled = numberToBase2.fillZeroesToLeft({ length: maxPosition + 1 });
  let reversed = zeroFilled.reverseDigits();

  return reversed.base10Number;
};

const getCode = ({ numBase10 }) => {
  let hashedNumber = hash({ numBase10 });

  const convertedNum = PositionalNotationNumber.convertBase({ numBase10: hashedNumber, base: charSet.length });
  convertedNum.fillZeroesToLeft({ length: CODE_LENGTH });
  const code = convertedNum.digits.map((d) => charSet[d]).join('');
  return code;
};

let number = 9;
console.log('number: ', number);
let code = getCode({ numBase10: number });
console.log('code: ', code);
