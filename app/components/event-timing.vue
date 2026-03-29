<script lang="ts" setup>
const dateList = [
  {
    time: "15:00",
    title: "Сбор гостей",
  },
  {
    time: "16:00",
    title: "Церемония",
  },
  {
    time: "17:00",
    title: "Банкет",
  },
];

</script>
<template>
  <div class="event-timing">
    <div class="event-timing__container">
      <div
          v-for="(item, ind) in dateList"
          :key="ind"
          :style="`--event-time: '${item.time}'`"
          class="event-timing__item"
          :class="`event-timing__item_${ind}`"
      >
        <div class="event-timing__content">
          <div class="event-timing__time">
            {{ item.time }}
          </div>
          <div class="event-timing__title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.event-timing {
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 20px 30px;
  --event-timing-size: clamp(55px, 10vw, 90px);
  background-image: url('/flower-5.png'), url("/flower-stem-2.png"), url("/flower-1.png");
  background-repeat: no-repeat;
  background-position: 10% 0, right 30%, center 70%;
  background-size: var(--event-timing-size);
  overflow: hidden;

  @include min-mobile {
    padding: 20px 45px;

  }

  @include min-tablet {
    padding: 30px 45px;
    max-width: 80%;
  }
}

.event-timing__container,
.event-timing__item {
  @include flex-list-column;
}

.event-timing__container {
  gap: 32px;
}

.event-timing__item {
  gap: 16px;
}

.event-timing__item_1 {
  align-items: flex-start;
}

.event-timing__item_2 {
  align-items: flex-end;
}

.event-timing__item_3 {
  align-items: center;
}

.event-timing__content {
  text-align: center;
}

.event-timing__time {
  position: relative;
  z-index: 1;
  font-size: 24px;

  &::before {
    display: block;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 50%;
    font-size: 50px;
    transform: translateX(-50%);
    content: var(--event-time);
    color: #B2BE3FB3;
  }

  @include min-mobile {
    font-size: 30px;

    &::before {
      font-size: 60px;
      bottom: 5px;
    }
  }

  @include min-tablet {
    font-size: 40px;

    &::before {
      font-size: 80px;
    }
  }
}

.event-timing__title {
  //margin-top: 16px;
}
</style>
