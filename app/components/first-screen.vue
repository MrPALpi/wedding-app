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
    <div class="first-screen__container container">
      <photo-block
          class="first-screen__photo"
          :first-photo="{src: 'danira-polaroid.png', }"
          :second-photo="{src: 'sasha-polaroid.png', }"
      />
      <transition name="first-screen__names" appear>
        <div class="first-screen__names">
          <svgo-heart class="first-screen__heart"/>
          <span class="first-screen__names-item caveat">
            Александр
          </span>
          <span class="first-screen__names-item caveat">
            +
          </span>
          <span class="first-screen__names-item caveat">
             Данира
          </span>
        </div>
      </transition>

      <transition name="first-screen__bottom" appear>
        <div class="first-screen__bottom caveat">
          Узнаёте<br> этих малышей?
        </div>
      </transition>

      <div class="first-screen__flower-container">
        <nuxt-img class="first-screen__flower img" src="/flower.png" width="" alt=""/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "~/assets/styles/animations" as *;

.first-screen {
  position: relative;
  padding-top: 20px;
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
  @include flex-list-column(16px, center);

  & {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 100%;
    max-width: 90%;
  }

  @include min-laptop {
    width: initial;
  }
}

.first-screen__names-enter-active {
  transition: transform 0.3s ease-in-out 0.6s, scale 0.3s ease-in-out 0.6s, opacity 0.3s ease-in-out 0.6s;
}

.first-screen__names-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(1.1);
}

.first-screen__names-item {
  color: var(--olive);
  font-size: clamp(62px, 8vw, 100px);
  font-weight: 700;
  line-height: 50%;
}

.first-screen__heart {
  position: absolute;
  left: calc(50% - 25px);
  top: -65px;
  font-size: 50px;
  color: #ffa9c3;
  animation: pulse 0.7s infinite ease-in-out;

  @include min-laptop {
    left: calc(50% - 50px);
    top: -125px;
    font-size: 100px;
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

.first-screen__bottom-enter-active {
  transition: transform 0.3s ease-in-out 0.8s, opacity 0.3s ease-in-out 0.8s;
}

.first-screen__bottom-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.first-screen__flower-container {
  --size-flower-container: clamp(250px, 15vw, 400px);
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
