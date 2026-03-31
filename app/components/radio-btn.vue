<script lang="ts" setup>
defineProps<{
  label: string;
  name: string;
  value: string | boolean | null;
  required?: boolean;
}>();

const modelValue = defineModel<boolean | null>("modelValue", { default: null });
</script>

<template>
  <label class="radio-btn">
    <input v-model="modelValue" class="radio-btn__input" :value="value" :name="name" type="radio" :required="required">
    <span class="radio-btn__box"/>

    <span class="radio-btn__text text-m">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss">
.radio-btn {
  @include flex-list(16px, center);

  & {
    position: relative;
    cursor: pointer;
  }
}

.radio-btn__input {
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
}

.radio-btn__box {
  @include flex-center;

  & {
    border: 2px solid #de5d83;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    padding: 4px;
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #de5d83;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
}

.radio-btn__input:checked ~ .radio-btn__box::before {
  opacity: 1;
}
</style>
