<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  determineCardType,
  validateCardHolderName,
  validateExpiryDate,
  validateCVV,
  generateMonths,
  generateYears,
} from '@/utils';
import { useCardNumberFormatting, useNameFormatting, useCvvFormatting } from '@/composables/formattedInput';
import { CardType } from '@/models';
import CreditCard from './CreditCard.vue';
import AppInput from './AppInput.vue';
import AppSelect from './AppSelect.vue';

const { cardNumber, handleCardInputChange } = useCardNumberFormatting();
const { cardName, handleNameInputChange } = useNameFormatting();
const expiryMonth = ref('01');
const expiryYear = ref(new Date().getFullYear().toString());
const {cvv, handleCvvInputChange} = useCvvFormatting();
const cardType = ref(CardType.UNKNOWN);

const showBack = ref(false);

const toggleCardBack = (show: boolean) => {
  showBack.value = show;
};
const months = computed(() => generateMonths());
const years = computed(() => generateYears());

const symbolImage = computed(() => {
  return cardType.value === CardType.UNKNOWN
    ? '/img/card-type/visa.png'
    : `/img/card-type/${cardType.value}.png`;
});

watch(cardNumber, (newValue) => {
  cardType.value = determineCardType(newValue);
});

const validateCardForm = (): boolean => {
  return (
    determineCardType(cardNumber.value) !== CardType.UNKNOWN &&
    validateCardHolderName(cardName.value) &&
    validateExpiryDate(expiryMonth.value, expiryYear.value) &&
    validateCVV(cvv.value)
  );
};

const submitForm = () => {
  if (validateCardForm()) {
    console.table([
      cardNumber.value,
      cardName.value,
      expiryMonth.value,
      expiryYear.value,
      cvv.value,
    ]);
  } else {
    console.log('Invalid card details');
  }
};
</script>

<template>
  <div class="card">
    <credit-card
      :expire-year="expiryYear"
      :expire-month="expiryMonth"
      :card-number="cardNumber"
      :name="cardName"
      :cvv="cvv"
      :show-back="showBack"
      :symbol-image="symbolImage"
    />
    <div class="card-form">
      <form @submit.prevent="submitForm">
        <app-input
          id="cardNumber"
          v-model:model-value="cardNumber"
          autofocus
          placeholder="1234 5678 9012"
          @input="handleCardInputChange"
        >
          Card Number
        </app-input>
        <app-input
          id="cardName"
          v-model:model-value="cardName"
          placeholder="John Smith"
          @input="handleNameInputChange"
        >
          Card Holder
        </app-input>

        <div class="form-group">
          <label
            for="cardMonth"
            class="form-group-label"
          >
            Expiration Date
          </label>
          <app-select
            id="cardMonth"
            v-model:model-value="expiryMonth"
            :options="months"
            default-option="Month"
          />
          <app-select
            id="cardYear"
            v-model:model-value="expiryYear"
            :options="years"
            default-option="Year"
          />
        </div>
        <app-input
          id="cardCvv"
          v-model:model-value="cvv"
          placeholder="***"
          @input="handleCvvInputChange"
          @focus="toggleCardBack(true)"
          @blur="toggleCardBack(false)"
        >
          CVV/CVC
        </app-input>
        <button
          type="submit"
          class="button"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '@/assets/scss/utils/palette';
  @use '@/assets/scss/utils/mixins';
  .card {
    @include mixins.flex-center;
    gap: 4rem;
    &-form {
      width: 100%;
      max-width: 24rem;
      padding: 3rem 2rem;
      border-radius: 1rem;
      background-color: palette.$c-white;
      &-group {
        display: flex;
        flex-wrap: wrap;
        .select {
          flex-grow: 1;
        }
      }
      &-label {
        flex-grow: 2;
        flex-shrink: 0;
        width: 100%;
      }
    }
  }
  .button {
    margin: 0 auto;
  }
</style>
