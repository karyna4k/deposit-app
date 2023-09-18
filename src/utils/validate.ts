import { cardPatterns, CardType } from '@/models';

export const determineCardType = (number: string): CardType => {
  for (const card of cardPatterns) {
    if (card.pattern.test(number)) return card.type;
  }
  return CardType.UNKNOWN;
};

export const validateCardHolderName = (name: string): boolean => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name.trim());
};

export const validateExpiryDate = (month: string, year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const inputYear = parseInt(year);
  const inputMonth = parseInt(month);

  return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
};

export const validateCVV = (cvv: string): boolean => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};