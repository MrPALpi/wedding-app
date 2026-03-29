<script lang="ts" setup>
interface photoBlock {
  src: string;
  // title: string;
}

defineProps<{
  firstPhoto: photoBlock;
  secondPhoto: photoBlock;
  loading?: HTMLImageElement["loading"];
}>();
</script>

<template>
  <div class="photo-block">
    <div class="photo-block__container photo-block__container_wife">
      <nuxt-img
          :src="firstPhoto.src"
          width="350"
          class="photo-block__img img"
          :loading="loading"
      />
<!--      <div class="photo-block__text caveat">{{ firstPhoto.title }}</div>-->
    </div>
    <div class="photo-block__container photo-block__container_husband">
      <nuxt-img
          :src="secondPhoto.src"
          width="350"
          class="photo-block__img img"
          :loading="loading"
      />
<!--      <div class="photo-block__text caveat">{{ secondPhoto.title }}</div>-->
    </div>
  </div>
</template>

<style lang="scss">
.photo-block {
  @include flex-list;

  & {
    padding: 0 20px;
  }

  @include min-tablet {
    padding: initial;
  }
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

.photo-block__text {
  font-size: 32px;
  font-weight: 500;
  padding: 10px 20% 0;
}
</style>
