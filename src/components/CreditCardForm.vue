<script setup lang="ts">
import { computed, ref } from 'vue';
import { generateMonths, generateYears } from '@/utils';
import {
  useCardNumberFormatting,
  useNameFormatting,
  useCvvFormatting,
} from '@/composables/formattedInput';
import { useValidation } from '@/composables/validation';
import { CardType } from '@/models';
import CreditCard from './CreditCard.vue';
import AppInput from './AppInput.vue';
import AppSelect from './AppSelect.vue';

const { cardNumber, handleCardInputChange } = useCardNumberFormatting();
const { cardName, handleNameInputChange } = useNameFormatting();
const expiryMonth = ref('01');
const expiryYear = ref(new Date().getFullYear().toString());
const { cvv, handleCvvInputChange } = useCvvFormatting();
const cardType = ref(CardType.UNKNOWN);

const validation = useValidation();

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

const submitForm = () => {
  validation.validateCardNumber(cardNumber.value);
  validation.validateName(cardName.value);
  validation.validateExpiry(expiryMonth.value, expiryYear.value);
  validation.validateCardCVV(cvv.value);
  if (
    !validation.cardNumber.value &&
    !validation.cardName.value &&
    !validation.expiryMonth.value &&
    !validation.expiryYear.value &&
    !validation.cvv.value
  ) {
    console.table([
      cardNumber.value,
      cardName.value,
      expiryMonth.value,
      expiryYear.value,
      cvv.value,
    ]);
  }
};
</script>

<template>
  <div class="card">
    <credit-card
      :card-number="cardNumber"
      :name="cardName"
      :expire-month="expiryMonth"
      :expire-year="expiryYear"
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
          <template #error>
            {{ validation.cardNumber.value }}
          </template>
        </app-input>
        <app-input
          id="cardName"
          v-model:model-value="cardName"
          placeholder="John Smith"
          @input="handleNameInputChange"
        >
          Card Holder
          <template #error>
            {{ validation.cardName.value }}
          </template>
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
          >
            <template #error>
              {{ validation.expiryMonth.value }}
            </template>
          </app-select>
          <app-select
            id="cardYear"
            v-model:model-value="expiryYear"
            :options="years"
            default-option="Year"
          >
            <template #error>
              {{ validation.expiryYear.value }}
            </template>
          </app-select>
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
          <template #error>
            {{ validation.cvv.value }}
          </template>
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
  @use '@/assets/scss/utils/index' as utils;
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    @media (min-width: utils.$lg) {
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    &-form {
      width: 100%;
      max-width: 24rem;
      padding: 1.5rem 1rem;
      border-radius: 1rem;
      background-color: utils.$c-white;
      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      @media (min-width: utils.$sm) {
        padding: 3rem 2rem;
      }
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
