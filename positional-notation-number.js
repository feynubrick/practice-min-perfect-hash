class PositionalNotationNumber {
  // 수의 위치 표기법 참조: https://en.wikipedia.org/wiki/Positional_notation
  constructor({ base, digits = [] } = {}) {
    this.base = base; // or radix
    this.digits = digits;
  }

  get base10Number() {
    let number = 0;
    for (let i = 0; i < this.digits.length; i++) {
      number += this.digits[i] * this.positions[i];
    }
    return number;
  }

  get positions() {
    return PositionalNotationNumber.calculatePositions({ base: this.base, length: this.digits.length });
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

  static calculatePositions({ base, length }) {
    const positions = [...Array(length).keys()].map((n) => Math.pow(base, n)).reverse();
    return positions;
  }

  static convertBase = function ({ numBase10, base = 2 }) {
    const maxPosition = PositionalNotationNumber.findMaxPosition({ numBase10, base });
    const positions = PositionalNotationNumber.calculatePositions({ base, length: maxPosition + 1 });

    const digits = [];
    for (let p of positions) {
      const digit = Math.floor(numBase10 / p) % base;
      digits.push(digit);
    }
    return new PositionalNotationNumber({ base, digits });
  };

  static findMaxPosition = function ({ numBase10, base = 2 }) {
    let val = 0;
    let position = 0;
    while (numBase10 > val) {
      val = Math.pow(base, position);

      if (numBase10 < val) {
        break;
      }

      position++;
    }

    const maxPosition = position > 1 ? position - 1 : 0;
    return maxPosition;
  };
}

module.exports = PositionalNotationNumber;
