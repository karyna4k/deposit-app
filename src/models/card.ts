export enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex',
  DISCOVER = 'discover',
  UNION = 'union',
  MAESTRO = 'maestro',
  UNKNOWN = 'unknown',
}

export interface CardPattern {
  type: CardType;
  pattern: RegExp;
}

export const cardPatterns: CardPattern[] = [
  { type: CardType.VISA, pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
  { type: CardType.MASTERCARD, pattern: /^(?:5[1-5][0-9]{14})$/ },
  { type: CardType.AMEX, pattern: /^3[47][0-9]{13}$/ },
  { type: CardType.DISCOVER, pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/ },
  { type: CardType.UNION, pattern: /^(62[0-9]{14,17})$/ },
  {
    type: CardType.MAESTRO,
    pattern: /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$/,
  },
];
