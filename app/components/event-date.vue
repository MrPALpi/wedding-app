<template>
  <div class="event-date">
    <nuxt-img class="event-date__icon" src="flower.png" alt=""/>
    <div class="event-date__title">
      Воскресенье | 19 июля
    </div>
    <div class="event-date__list">
      <div
          v-for="i in [12, 13, 14, 15, 16, 18, 19]" :key="i"
          class="event-date__item"
          :class="{'event-date__item_active': i === 19}"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss">
.event-date {
  @include flex-list-column(50px);

  @include min-tablet {
    padding: 50px 0 60px;
  }

  & {
    position: relative;
    padding: 50px 0 30px;
    overflow-x: hidden;
    z-index: 1;
  }
}

.event-date__icon {
  position: absolute;
  left: 0;
  top: 0;
  --event-date-icon: clamp(70px, 15vw, 120px);
  width: var(--event-date-icon);
  height: var(--event-date-icon);
  z-index: -1;
}

.event-date__title {
  font-size: 26px;
  text-align: center;
}

.event-date__list {
  @include flex-center(4px);

  @include min-mobile {
    gap: 8px;
  }
}

.event-date__item {
  @include flex-center-vert;

  & {
    border-radius: 10px;
    flex-shrink: 0;
    background-position: center center;
    border: 2px solid #de5d83;
    width: 35px;
    height: 35px;
    font-size: 25px;
    padding-left: 2px;
    font-family: Caveat;
  }

  @include min-mobile {
    padding-left: 6px;
    width: 45px;
    height: 45px;
  }

  @include min-tablet {
    padding-left: 8px;
    gap: 16px;
    font-size: 45px;
    width: 70px;
    height: 70px;
  }
}

.event-date__item_active {
  position: relative;

  &::before {
    display: block;
    position: absolute;
    content: url("~/assets/icons/heart.svg");
    height: 250%;
    width: 250%;
    left: 50%;
    top: -120%;
    transform: translateX(-50%);
    z-index: -1;
  }
}
</style>
