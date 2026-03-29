<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();

const TURNOVER_COUNT = 8;

const rotate = computed<string>(() => {
  const scroll = y.value;

  if (scroll === 0) return "0deg";

  const percent = y.value / document.body.scrollHeight * 100;

  return `${(percent * TURNOVER_COUNT).toFixed(2)}deg`;
});
</script>

<template>
  <div class="first-screen screen">
    <transition name="fade" appear>
      <div class="first-screen__container container">
        <photo-block
            class="first-screen__photo"
            :first-photo="{src: 'danira-polaroid.png', }"
            :second-photo="{src: 'sasha-polaroid.png', }"
        />
        <div class="first-screen__names caveat">
          <svgo-heart class="first-screen__heart"/>
          Александр <br>
          + Данира
        </div>
        <div class="first-screen__bottom caveat">
          Узнаёте<br> этих малышей?
        </div>
        <div class="first-screen__flower-container">
          <nuxt-img class="first-screen__flower img" src="/flower.png" width="" alt=""/>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use "~/assets/styles/animations" as *;

.first-screen {
  position: relative;
  padding-top: 20px;

  &::before {
    position: absolute;
    content: url("~/assets/icons/curve-line.svg");
    left: 0;
    bottom: 0;
    width: 35%;
    max-width: 350px;
    min-width: 150px;
    aspect-ratio: 1 / 1;
    transform: translateX(-15px) rotate(-25deg);
    z-index: -1;
  }
}

.first-screen__photo {
  flex: 100%;

  @include min-mobile {
    flex: initial;
  }
}

.first-screen__container {
  @include flex-list;

  & {
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.first-screen__names {
  position: relative;
  z-index: 2;
  color: var(--olive);
  font-size: clamp(62px, 8vw, 100px);
  font-weight: 700;
}

.first-screen__heart {
  position: absolute;
  left: calc(50% - 50px);
  top: -80px;
  font-size: 80px;
  color: #ffa9c3;
  animation: pulse 0.7s infinite ease-in-out;

  @include min-tablet {
    font-size: 100px;
    top: -100px;
  }
}

.first-screen__bottom {
  position: relative;
  z-index: 2;
  margin-top: auto;
  flex: 100%;
  text-align: center;
  font-size: clamp(32px, 10vw, 54px);
}

.first-screen__flower-container {
  --size-flower-container: clamp(150px, 15vw, 400px);
  position: absolute;
  z-index: 1;
  pointer-events: none;
  bottom: 0;
  right: 0;
  padding: 10px;
  width: var(--size-flower-container);
  height: var(--size-flower-container);
  overflow: hidden;
}

.first-screen__flower {
  width: 100%;
  will-change: transform;
  transform: translateX(50%) rotate(v-bind(rotate));
}
</style>
