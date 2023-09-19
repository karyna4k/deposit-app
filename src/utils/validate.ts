export const determineCardType = (number: string): boolean => {
  const regex = /^[0-9]{16}$/;
  return regex.test(number.trim());
};

export const validateCardHolderName = (name: string): boolean => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name.trim());
};

export const validateExpiryMonth = (month: string, year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const inputYear = parseInt(year);
  const inputMonth = parseInt(month);

  if (inputYear === currentYear) {
    return inputMonth >= currentMonth;
  }
  return true;
};

export const validateExpiryYear = (year: string): boolean => {
  const currentYear = new Date().getFullYear();

  return parseInt(year) >= currentYear;
};

export const validateCVV = (cvv: string): boolean => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};