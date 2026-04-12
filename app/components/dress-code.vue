<script lang="ts" setup>
import pink from "/pink.webp";
import green from "/green.webp";
import brown from "/brown.webp";
import yellow from "/yellow.webp";
import pinkLight from "/pink-light.webp";
import greenLight from "/green-light.webp";
import yellowLight from "/yellow-light.webp";

const colors: string[] = [
  yellowLight,
  yellow,
  pink,
  pinkLight,
  greenLight,
  green,
  brown,
];

</script>

<template>
  <div class="dress-code">
    <div class="dress-code__container container">
      <span class="dress-code__title daub-line daub-line_right caveat text-l">
      дресс-код
    </span>
      <div class="dress-code__text text-m">
        Мы очень старались сделать&nbsp;праздник&nbsp;красивым<br>
        И будем рады, если&nbsp;в&nbsp;своих&nbsp;нарядах<br>
        Вы поддержите цветовую гамму&nbsp;нашей&nbsp;свадьбы:
      </div>

      <div class="dress-code__colors">
        <nuxt-img
            v-for="(color, ind) in colors"
            :key="ind"
            :src="color"
            class="dress-code__colors-item"
            loading="lazy"
            placeholder
        />
      </div>

      <nuxt-img
          src="dresscode-girls.webp"
          placeholder
          loading="lazy"
          class="dress-code__img dress-code__img_girls img"
      />

      <div class="text-m">
        Будем признательны, если в белом будет только невеста.
      </div>

      <nuxt-img
          src="dresscode-mens.webp"
          placeholder
          loading="lazy"
          class="dress-code__img dress-code__img_boys img"/>

    </div>

  </div>
</template>

<style lang="scss">
.dress-code {
  @include min-tablet {
    padding-top: 60px;
    background-position: 15% 0, 85% 0;
  }

  & {
    padding-top: 30px;
    background-image: url('/flower-stem.webp'), url("/flower-stem-3.webp");
    background-repeat: no-repeat;
    background-position: 15% 0, 100% 0;
    background-size: 80px;
    text-align: center;
  }
}

.dress-code__container {
  @include flex-list-column(30px, null, center);

}

.dress-code__title {
  margin: 0 auto;
  text-align: center;
}

.dress-code__text {
  text-align: center;

  @include min-tablet {
    padding: 20px 0;
  }
}

.dress-code__colors {
  @include flex-list-wrap(16px, center, center);

  & {
    max-width: 680px;
    margin: 0 auto;
  }
}

.dress-code__colors-item {
  flex: 0 1 128px;
  aspect-ratio: 1/ 1;
  max-width: 128px;
  border-radius: 50%;

  @include min-tablet {
    flex: 0 1 150px;
    max-width: 150px;
  }
}

.dress-code__img {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-position: 0 0,100% 0,100% 100%, 0 100%;
  background-repeat: no-repeat;
  background-size: 80px;
}

.dress-code__img_girls {
  background-image: url("/flower-stem.webp"),url("/flower-stem-1.webp"), url("/flower-6.webp"), url("/flower-2.webp");
}

.dress-code__img_boys {
  background-image: url("/flower-4.webp"),url("/flower-stem-2.webp"), url("/flower-7.webp"), url("/flower-3.webp");
}

</style>
