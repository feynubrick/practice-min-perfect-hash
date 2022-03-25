class PositionalNotationNumber {
  constructor({ base, digits = [] } = {}) {
    this.base = base; // or radix
    this.digits = digits;
  }

  fillZeroesToLeft({ length }) {
    let zerosFilledDigits = this.digits.slice();

    while (zerosFilledDigits.length < length) {
      zerosFilledDigits = [0, ...zerosFilledDigits];
    }

    return new PositionalNotationNumber({ base: this.base, digits: zerosFilledDigits });
  }

  reverseDigits() {
    const reversedDigits = this.digits.reverse();
    return new PositionalNotationNumber({ base: this.base, digits: reversedDigits });
  }

  get positions() {
    return [...Array(this.digits.length).keys()].map((n) => Math.pow(this.base, n)).reverse();
  }

  get base10Number() {
    let number = 0;
    for (let i = 0; i < this.digits.length; i++) {
      number += this.digits[i] * this.positions[i];
    }
    return number;
  }
}

const convertBase = function ({ number, base = 2 }) {
  const maxPosition = findMaxPosition({ number, base });
  const positions = [...Array(maxPosition + 1).keys()].map((n) => Math.pow(base, n)).reverse();

  const digits = [];
  for (let p of positions) {
    const digit = Math.floor(number / p) % base;
    digits.push(digit);
  }
  return new PositionalNotationNumber({ base, digits, positions });
};

const findMaxPosition = function ({ number, base = 2 }) {
  let val = 0;
  let position = 0;
  while (number > val) {
    val = Math.pow(base, position);

    if (number < val) {
      break;
    }

    position++;
  }

  const maxPosition = position > 1 ? position - 1 : 0;
  return maxPosition;
};

module.exports = {
  PositionalNotationNumber,
  findMaxPosition,
  convertBase,
};
