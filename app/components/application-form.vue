<script setup lang="ts">
import type { Alcohol } from "~/types";

import { AlcoholTypeLabels } from "~/config";

const MAX_ADDITIONAL_GUEST = 5;

interface AdditionalGuest {
  id: number;
  fullName: string;
}

interface FormValue {
  fullName: string;
  phone: string;
  presence: boolean;
  alcohol: Alcohol[];
  night: boolean;
  allergia: string | null;
  additionalGuestList: AdditionalGuest[];
}

const DEFAULT_FORM_VALUE: FormValue = {
  fullName: "",
  phone: "",
  presence: true,
  alcohol: [],
  night: false,
  allergia: null,
  additionalGuestList: [],
} as const;

const form = useTemplateRef<HTMLFormElement | null>("form");
const formValue = reactive<FormValue>({ ...DEFAULT_FORM_VALUE });
const visible = shallowRef(false);
const loading = shallowRef<boolean>(false);

let counter = 1;

const disabledAdd = computed<boolean>(() => {
  return formValue.additionalGuestList.length >= MAX_ADDITIONAL_GUEST;
});

function addAdditionalGuest() {
  const list = formValue.additionalGuestList;

  if (disabledAdd.value) return;

  formValue.additionalGuestList = [...list, { id: counter++, fullName: "" }];
}

function removeAdditionalGuest(id: number) {
  formValue.additionalGuestList = formValue.additionalGuestList.filter((item) => item.id !== id);
}

function pushAlcohol(key: Alcohol) {
  formValue.alcohol.push(key);
}

function removeAlcohol(key: Alcohol) {
  formValue.alcohol = formValue.alcohol.filter((al) => al !== key);
}

function setAlcohol(bool: boolean, key: Alcohol) {
  return bool ? pushAlcohol(key) : removeAlcohol(key);
}

function onInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, "");
  target.value = value;
  formValue.phone = value;
}

function scrollToElement(element: Element) {
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function onSubmit() {
  loading.value = true;

  const additionalGuests = formValue.additionalGuestList
    .map((g) => ({ fullName: g.fullName.trim() }))
    .filter((g) => g.fullName.length > 0);

  await $fetch("/api/guests", {
    method: "POST",
    body: {
      ...formValue,
      additionalGuests,
    },
  })
    .then(()=>   visible.value = true)
    .catch(console.error)
    .finally(()=>{
      loading.value = false;

      if (form.value !== null) {
        form.value.reset();
        Object.assign(formValue, DEFAULT_FORM_VALUE);
      }
    });

}
</script>

<template>
  <v-dialog v-model:visible="visible">
    <div class="application-dialog">
      <div class="caveat text-l">
        Спасибо большое за ответ!
      </div>

      <div class="text-m">
        Данные успешно отправлены
      </div>
    </div>
  </v-dialog>
  <div class="application-form" :class="{'application-form_loading': loading}">
		<span
        class="application-form__title daub-line daub-line_right caveat text-l"
    >
			Анкета
		</span>

    <div class="application-form__desc text-m">
      Пожалуйста, заполните анкету ниже до&nbsp;01.05.2026,<br>
      это нам поможет лучше подготовиться к&nbsp;нашей встрече:
    </div>

    <form ref="form" class="application-form__content form" @submit.prevent="onSubmit">
      <svgo-loading v-if="loading" class="application-form__content-loader" />
      <label class="form__label text-m">
        Ваши имя и фамилия
        <div class="form__wrapper-input">
          <input
              v-model="formValue.fullName"
              class="form__input"
              name="fullName"
              type="text"
              required
          >
        </div>
      </label>
      <label class="form__label text-m">
        Номер телефона
        <div class="form__wrapper-input">
          <input
              :value="formValue.phone"
              inputmode="numeric"
              class="form__input"
              name="phone"
              type="tel"
              required
              maxlength="11"
              @input="onInput"
          >
        </div>
      </label>
      <transition-group name="list" @after-enter="scrollToElement">
        <label
            v-for="guest in formValue.additionalGuestList"
            :key="guest.id"
            class="form__label text-m"
        >
          ФИО Гостя
          <div class="form__wrapper-input">
            <input
                v-model="guest.fullName"
                class="form__input"
                :name="`additional-guest${guest.id}`"
                type="text"
                required
            >

            <button
                class="application-form__content-btn application-form__content-btn_remove btn"
                type="button"
                @click="removeAdditionalGuest(guest.id)"
            >
              <svgo-minus class="application-form__content-btn-icon"/>
            </button>
          </div>
        </label>
      </transition-group>
      <div class="application-form__content-add" :disabled="disabledAdd">
				<span class="application-form__content-add-text caveat">
					Добавить<br>
					гостя
				</span>
        <button
            class="application-form__content-btn application-form__content-btn_add btn"
            type="button"
            :disabled="disabledAdd"
            @click="addAdditionalGuest"
        >
          <svgo-plus class="application-form__content-btn-icon"/>
        </button>
      </div>

      <fieldset class="application-form__block" required="true">
        <legend class="application-form__block-legend text-m">
          Планируете ли присутствовать на нашей свадьбе?
        </legend>
        <radio-btn
            v-model="formValue.presence"
            :value="true"
            label="Да, с удовольствием!"
            name="presence"
        />
        <radio-btn
            v-model="formValue.presence"
            :value="false"
            label="К сожалению, не смогу"
            name="presence"
        />
      </fieldset>

      <fieldset class="application-form__block">
        <legend class="application-form__block-legend text-m">
          Что предпочитаете из алкоголя?
        </legend>
        <checkbox-btn
            v-for="(alcLabel, alcKey) in AlcoholTypeLabels"
            :key="alcKey"
            :value="alcKey"
            :label="alcLabel"
            name="aclohol"
            @update:model-value="($event) => setAlcohol($event, alcKey)"
        />
      </fieldset>

      <label class="form__label text-m">
        Есть ли у вас аллергия на продукты? <br>Укажите на какие
        <div class="form__wrapper-input">
          <input
              v-model="formValue.allergia"
              class="form__input"
              name="allergia"
              type="text"
          >
        </div>
      </label>

      <fieldset class="application-form__block">
        <legend class="application-form__block-legend text-m">
          Планируете ли вы остаться на ночь в одном из домов? (количество мест
          ограничено)
        </legend>
        <checkbox-btn
            :model-value="formValue.night"
            name="night"
            value="true"
            label="Да, хочу остаться"
            @update:model-value="($event) => (formValue.night = $event)"
        />
        <checkbox-btn
            :model-value="!formValue.night"
            name="night"
            value="false"
            label="Нет, спасибо"
            @update:model-value="($event) => (formValue.night = $event)"
        />
      </fieldset>

      <button type="submit" class="application-form__submit btn text-m">
        Отправить
      </button>
    </form>
  </div>
</template>

<style lang="scss">
.application-dialog {
  @include flex-list-column(16px, center);

  & {
    padding: 20px 5px;
    text-align: center;
  }

}

.application-form,
.application-form__content {
  @include flex-list-column(32px, center);
}

.application-form__block {
  @include flex-list-column(8px);

  & {
    width: 100%;
    border: none;
  }
}

.application-form {
  transition: opacity 0.2s ease-in-out;
}

.application-form_loading {
  opacity: 0.6;
  pointer-events: none;
}

.application-form__block-legend {
  margin-bottom: 8px;
}

.application-form__content {
  position: relative;
  width: 100%;
  max-width: 700px;
  padding: 5px;
}

.application-form {
  @include min-tablet {
    padding-top: 60px;
  }

  & {
    padding-top: 30px;
    background-image: url('flower-5.png');
    background-repeat: no-repeat;
    background-position: 25% 0;
    background-size: 120px;
  }
}

.application-form__desc {
  margin: 0 auto;
  text-align: center;
}

.application-form__content-add-btn {
  @include flex-center(8px);
}

.application-form__content-add-text {
  grid-column: 2;
  text-align: center;
  font-size: 26px;
}

.application-form__content-add {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 100%;
    height: 3px;
    transform: translateY(-50%);
    background: #b2be3f;
    z-index: -1;
    border-radius: 16px;
    transition: background-color 0.2s ease-in-out;
  }

  &[disabled='true']::before {
    cursor: not-allowed;
    background: gray;
  }
}

.application-form__content-btn {
  border-radius: 50%;
  padding: 0 4px;
  height: 24px;
  width: 24px;
  transition: background-color 0.2s ease-in-out;
}

.application-form__content-btn_add {
  grid-column: 3;
  justify-self: flex-end;
}

.application-form__content-btn_add,
.application-form__submit {
  background: #b2be3f;

  &:hover:not(:disabled) {
    background: #9faa39;
  }

  &:active:not(:disabled) {
    background: #8c9833;
  }

  &:disabled {
    cursor: not-allowed;
    background: gray;
  }
}

.application-form__content-btn_remove {
  background: red;

  &:hover {
    background-color: red;
  }

  &:active {
    background-color: red;
  }
}

.application-form__content-btn-icon {
  width: 100%;
  height: 100%;
  color: white;
}

.application-form__submit {
  border-radius: 16px;
  padding: 8px;
  color: white;
}

.application-form__content-loader {
  --application-form__content-loader: calc(50% - 18px);
  position: sticky;
  width: 36px;
  height: 36px;
  top: var(--application-form__content-loader);
  left: var(--application-form__content-loader);
  color: #8a9b3c;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  height: 0;
  margin-top: -32px;
  overflow: hidden;
}
</style>
