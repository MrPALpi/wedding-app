<script lang="ts" setup>
defineProps<{
  label: string;
  name: string;
  value: string;
}>();

const modelValue = defineModel<boolean>("modelValue", { default: false });
</script>

<template>
  <label class="checkbox-btn">
    <input v-model="modelValue" class="checkbox-btn__input" :value="value" :name="name" type="checkbox">
    <span class="checkbox-btn__box"/>
    <span class="checkbox-btn__text text-m">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss">
.checkbox-btn {
  @include flex-list(16px, center);

  & {
    cursor: pointer;
    position: relative;
  }
}

.checkbox-btn__input {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}

.checkbox-btn__box {
  position: relative;
  border: 2px solid var(--pink);
  height: 24px;
  width: 24px;
  padding: 4px;

  &::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 0;
    width: 8px;
    height: 16px;
    border-style: solid;
    border-color: var(--pink);
    border-width: 0 2px 2px 0;
    opacity: 0;
    transform: rotate(45deg);
    transition: opacity 0.2s ease-in-out;
  }
}

.checkbox-btn__input:checked ~ .checkbox-btn__box::before {
  opacity: 1;
}
</style>
