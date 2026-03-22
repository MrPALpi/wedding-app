<script lang="ts" setup>
import { useScrollLock } from "@vueuse/core";

const visible = defineModel<boolean>("visible", { required: true });

const isLocked = useScrollLock(()=>document?.body ?? null);

function close(): void {
  visible.value = false;
}

watch(visible, () => {
  isLocked.value = !!visible.value;
});
</script>

<template>
  <teleport to="body">
    <transition name="v-dialog">
      <div v-if="visible" class="v-dialog">
        <div class="v-dialog__overlay" @click="close" />
        <div class="v-dialog__panel">
          <svgo-cross class="v-dialog__panel-close" @click="close" />
          <slot/>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
.v-dialog {
  @include flex-center;

  & {
    position: fixed;
    inset: 0;
    z-index: 10;
    padding: 5px;
    overflow: hidden;
  }

  @include min-tablet {
    padding: 16px;
  }
}

.v-dialog__overlay {
  position: absolute;
  inset: 0;
  background: #0000007F;
  transition: opacity 0.2s ease-in-out;
}

.v-dialog__panel {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 10px;
  border-radius: 16px;
  background: white;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;

  @include min-tablet {
    padding: 16px;
  }
}

.v-dialog__panel-close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}

.v-dialog-enter-active,
.v-dialog-leave-active {
  transition: 0.2s;
}

.v-dialog-enter-from,
.v-dialog-leave-to {
  .v-dialog__overlay {
    opacity: 0;
  }

  .v-dialog__panel {
    transform: scale(1.5);
    opacity: 0;
  }
}

</style>
