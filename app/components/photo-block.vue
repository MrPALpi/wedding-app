<script lang="ts" setup>
interface photoBlock {
  src: string;
  fetchpriority?: "low" | "high" | "auto";
  width: number;
  height: number;
  placeholder?: boolean;
  loading?: string;
}

const props = defineProps<{
  animate?: boolean;
  firstPhoto: photoBlock;
  secondPhoto: photoBlock;
}>();

const loadFirst = shallowRef<boolean>(false);
const loadSecond = shallowRef<boolean>(false);

const loadClass = computed<string | null>(() => {
  if (!props.animate || (loadFirst.value && loadSecond.value)) return "photo-block__img_visible";

  return null;
});
</script>

<template>
  <div class="photo-block">
    <div class="photo-block__content">
      <div class="photo-block__container photo-block__container_wife">
        <nuxt-img
          :src="firstPhoto.src"
          :width="firstPhoto.width"
          :height="firstPhoto.height"
          class="photo-block__img img"
          :class="loadClass"
          format="webp"
          :fetchpriority="firstPhoto.fetchpriority"
          :placeholder="firstPhoto.placeholder"
          :loading="firstPhoto.loading"
          @load="loadFirst = true"
        />
      </div>
      <div class="photo-block__container photo-block__container_husband">
        <nuxt-img
          :src="secondPhoto.src"
          :width="secondPhoto.width"
          :height="secondPhoto.height"
          class="photo-block__img img"
          :class="loadClass"
          format="webp"
          :fetchpriority="secondPhoto.fetchpriority"
          :placeholder="secondPhoto.placeholder"
          :loading="secondPhoto.loading"
          @load="loadSecond = true"
        />
      </div>
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

  @include min-tablet {
    padding: 20px;
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

  .photo-block__img {
    transition-delay: 0.3s;
  }
}

.photo-block__img {
  width: 100%;
  height: auto;
  max-width: 300px;
  opacity: 0;
  transform: translateY(-30px) rotate(0);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.photo-block__img_visible {
  opacity: 1;
  transform: initial;
}

.photo-block__text {
  font-size: 32px;
  font-weight: 500;
  padding: 10px 20% 0;
}
</style>
