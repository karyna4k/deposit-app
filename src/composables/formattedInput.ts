import { ref } from 'vue';

export function useCardNumberFormatting() {
  const cardNumber = ref('');

  const formatCardNumber = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    return onlyNumbers.match(/.{1,4}/g)?.join(' ') || '';
  };

  const handleCardInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    cardNumber.value = formatCardNumber(input.value);
  };

  return {
    cardNumber,
    handleCardInputChange
  };
}

export function useNameFormatting() {
  const cardName = ref('');

  const formatName = (value: string) => {
    return value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
  };

  const handleNameInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    cardName.value = formatName(input.value);
  };

  return {
    cardName,
    handleNameInputChange
  };
}

export function useCvvFormatting() {
  const cvv = ref('');

  const formatCvv = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    return onlyNumbers.match(/.{1,4}/g)?.join(' ') || '';
  }

  const handleCvvInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    cvv.value = formatCvv(input.value);
  };

  return {
    cvv,
    handleCvvInputChange
  }
}