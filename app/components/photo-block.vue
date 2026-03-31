<script lang="ts" setup>
interface photoBlock {
  src: string;
}

defineProps<{
  firstPhoto: photoBlock;
  secondPhoto: photoBlock;
}>();
</script>

<template>
  <div class="photo-block">
    <div class="photo-block__content container">
      <transition name="photo-block__container" appear>
      <div class="photo-block__container photo-block__container_wife">
          <nuxt-img
              :src="firstPhoto.src"
              width="300"
              height="auto"
              class="photo-block__img img"
              format="webp"
              fetchpriority="high"
          />
      </div>
      </transition>
      <transition name="photo-block__container" appear>
      <div class="photo-block__container photo-block__container_husband">
          <nuxt-img
              :src="secondPhoto.src"
              width="300"
              height="auto"
              class="photo-block__img img"
              format="webp"
              fetchpriority="high"
          />
      </div>
      </transition>
    </div>

  </div>
</template>

<style lang="scss">
.photo-block {
    padding: 20px;
    overflow: hidden;

  @include min-tablet {
    padding: 20px 0;
  }
}

.photo-block__content {
  @include flex-center-horiz;
}

.photo-block__container {
  position: relative;
  flex: 0 1 300px;
  min-width: 0;
}

.photo-block__container_wife {
  z-index: 1;
  transform: rotate(355deg);

  .photo-block__text {
    color: #fea8c3;
  }
}

.photo-block__container_husband {
  margin: 60px 0 0 -20px;
  transform: rotate(5deg);

  @include min-mobile {
    margin-top: 120px;
  }

  .photo-block__text {
    color: #A7CFEA;
    text-align: right;
  }
}

.photo-block__img {
  width: 100%;
  max-width: 300px;
}

.photo-block__container-enter-active {
  &.photo-block__container_husband {
    transition-delay: 0.3s;
  }

  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.photo-block__container-enter-from {
  opacity: 0;
  transform: translateY(-30px) rotate(0);
}

.photo-block__text {
  font-size: 32px;
  font-weight: 500;
  padding: 10px 20% 0;
}
</style>
