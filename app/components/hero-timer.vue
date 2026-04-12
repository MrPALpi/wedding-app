<script lang="ts" setup>
const targetDate  = new Date("2026-07-19").getTime();
const timeLeft = shallowRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const isExpired = shallowRef<boolean>(false);
let timer: number | null = null;

function intervalDispose() {
  if (timer !== null) window.clearInterval(timer);
}

function updateTimer() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    isExpired.value = true;
    intervalDispose();

    return;
  }

  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

onMounted(() => {
  updateTimer();
  timer = window.setInterval(updateTimer, 1000);
});

onUnmounted(intervalDispose);

</script>

<template>
  <div class="hero-timer screen">
    <div class="hero-timer__bg" />
    <div  class="hero-timer__content">
      <template v-if="!isExpired">
        <div class="hero-timer__title text-l text-center">
          До начала свадьбы осталось:
        </div>
        <div class="hero-timer__date">
          <div class="hero-timer__date-column">
            <div class="hero-timer__date-time">
              {{ timeLeft.days }}
            </div>
            <div class="hero-timer__date-title">
              дней
            </div>
          </div>
          <div class="hero-timer__date-column">
            <div class="hero-timer__date-time">
              {{ timeLeft.hours }}
            </div>
            <div class="hero-timer__date-title">
              часов
            </div>
          </div>
          <div class="hero-timer__date-column">
            <div class="hero-timer__date-time">
              {{ timeLeft.minutes }}
            </div>
            <div class="hero-timer__date-title">
              минут
            </div>
          </div>
          <div class="hero-timer__date-column">
            <div class="hero-timer__date-time">
              {{ timeLeft.seconds }}
            </div>
            <div class="hero-timer__date-title">
              секунд
            </div>
          </div>
        </div>
      </template>
      <div v-else class="hero-timer__title text-l text-center">
        Время исткело!
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.hero-timer {
  @include flex-center;

  & {
    position: relative;
  }
}

.hero-timer__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("/hero.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(5px) brightness(75%);
}

.hero-timer__content {
  position: sticky;
  bottom: 0;
  color: white;
}

.hero-timer__date {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 20px;
}

.hero-timer__date-column {
  @include flex-list-column(8px, center);

  &:not(:last-child) {
    border-right: 1px solid white;
  }
}

.hero-timer__date-time {
  font-size: 32px;

  @include min-tablet {
    font-size: 64px;
  }
}
</style>
