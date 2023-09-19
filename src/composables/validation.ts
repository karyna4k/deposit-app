import { reactive, toRefs } from 'vue';
import {
  determineCardType,
  validateCardHolderName,
  validateCVV,
  validateExpiryMonth,
  validateExpiryYear,
} from '@/utils';

export const useValidation = () => {
  const errors = reactive({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const validators = {
    cardNumber: {
      validate: (value: string) => determineCardType(value),
      message: 'Invalid card number',
    },
    cardName: {
      validate: (value: string) => validateCardHolderName(value),
      message: 'Invalid card owner name',
    },
    expiryMonth: {
      validate: (value: string, year: string) =>
        validateExpiryMonth(value, year),
      message: 'Invalid expiry month',
    },
    expiryYear: {
      validate: (value: string) => validateExpiryYear(value),
      message: 'Invalid expiry year',
    },
    cvv: {
      validate: (value: string) => validateCVV(value),
      message: 'Invalid CVV',
    },
  };

  const validateField = (
    field: keyof typeof errors,
    value: string,
    additionalValue?: string
  ) => {
    if (!value) {
      errors[field] = 'This is a required field';
      return;
    }

    if (!validators[field].validate(value, additionalValue)) {
      errors[field] = validators[field].message;
    } else {
      errors[field] = '';
    }
  };

  const validateCardNumber = (number: string) =>
    validateField('cardNumber', number);
  const validateName = (name: string) => validateField('cardName', name);
  const validateExpiry = (month: string, year: string) => {
    validateField('expiryMonth', month, year);
    validateField('expiryYear', year);
  };
  const validateCardCVV = (cvv: string) => validateField('cvv', cvv);

  return {
    ...toRefs(errors),
    validateCardNumber,
    validateName,
    validateExpiry,
    validateCardCVV,
  };
};
