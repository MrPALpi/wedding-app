<script  lang="ts" setup>
import { useScrollLock } from "@vueuse/core";

const props = defineProps<{
  visible: boolean;
}>();

const isLocked = useScrollLock(()=>document?.body ?? null);

watch(()=>props.visible, (visibleVal) => {
  isLocked.value = visibleVal;
}, { flush: "post", immediate: true });
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="v-loader">
      <div class="v-loader__spinner"/>
    </div>
  </transition>
</template>

<style lang="scss">
@use "~/assets/styles/animations" as *;

.v-loader {
  @include flex-center();

  & {
    position: fixed;
    inset: 0;
    z-index: 10;
    background-color: #e9d9e9;
    border-radius: inherit;
  }

  &__spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    border-top-color: var(--olive);
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
