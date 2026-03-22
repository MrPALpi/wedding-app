<script lang="ts" setup>
const colorsWoman: string[] = [
  "#fbe5b3",
  "#b5b575",
  "#e6b8ba",
  "#767a57",
];

const colorsMan: string[] = [
  "#8f7c51",
  "#dac3a3",
  "#f3e7cf",
  "#91714a",
];
</script>

<template>
  <div class="dress-code">
    <span class="dress-code__title daub-line daub-line_right caveat text-l">
      дресс-код
    </span>
    <div class="dress-code__text text-m">
      Мы очень старались сделать&nbsp;праздник&nbsp;красивым<br>
      И будем рады, если&nbsp;в&nbsp;своих&nbsp;нарядах<br>
      Вы поддержите цветовую гамму&nbsp;нашей&nbsp;свадьбы:
    </div>

    <div class="dress-code__colors">
      <div
          v-for="(color, ind) in colorsWoman"
          :key="ind"
          :style="`--dress-code-color: ${color}`"
          class="dress-code__colors-item"
      />
    </div>

    <nuxt-img src="dresscode-girls.png"  class="dress-code__img img"/>

    <div class="text-m">
      Будем признательны, если в белом будет только невеста.
    </div>

    <div class="dress-code__colors">
      <div
          v-for="(color, ind) in colorsMan"
          :key="ind"
          :style="`--dress-code-color: ${color}`"
          class="dress-code__colors-item"
      />
    </div>

    <nuxt-img src="dresscode-mens.png"  class="dress-code__img img"/>

  </div>
</template>

<style lang="scss">
.dress-code {
  @include flex-list-column(30px, null, center);

  @include min-tablet {
    padding-top: 60px;
  }

  & {
    text-align: center;
    padding-top: 30px;
  }
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
  @include flex-list(16px, null, center);
}

.dress-code__colors-item {
  flex: 1 1 150px;
  aspect-ratio: 1/ 1;
  max-width: 150px;
  border-radius: 50%;
  background: var(--dress-code-color);
}

.dress-code__img {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
</style>
