const { charSet } = require('./data');
const { findMaxPosition, convertBase } = require('./convert-base');

const CODE_LENGTH = 6;

const hash = function ({ number }) {
  const ceil = Math.pow(charSet.length, CODE_LENGTH) - 1;
  if (number > ceil) {
    throw new Error(`number exceeds limit: ${ceil}`);
  }

  const numberToBase2 = convertBase({ number, base: 2 });
  const maxPosition = findMaxPosition({ number: ceil, base: 2 });

  let zeroFilled = numberToBase2.fillZeroesToLeft({ length: maxPosition + 1 });
  let reversed = zeroFilled.reverseDigits();

  return reversed.base10Number;
};

const getCode = (number) => {
  let hashedNumber = hash({ number });
  // console.log('number: ', number);
  // console.log('hashedNumber: ', hashedNumber);

  const convertedNum = convertBase({ number: hashedNumber, base: charSet.length });
  convertedNum.fillZeroesToLeft({ length: CODE_LENGTH });
  // console.log('convertedNum: ', convertedNum);
  const code = convertedNum.digits.map((d) => charSet[d]).join('');
  return code;
};

let number = 9;
console.log('number: ', number);
let code = getCode(number);
console.log('code: ', code);
